import { pool } from '../db.js';
import expressPromiseRouter from 'express-promise-router';

const router = expressPromiseRouter();

router.get('/employees', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM employee');
    res.json(rows);
});

router.get('/employee/:id', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [req.params.id]);

    if (rows.length <= 0) {
        throw new Error('Employee not found');
    }

    res.json(rows[0]);
});

router.post('/employees', async (req, res) => {
    const { name, salary } = req.body;
    const [rows] = await pool.query('INSERT INTO employee (name, salary) VALUES (?, ?)', [name, salary]);
    res.send({
        id: rows.insertId,
        name,
        salary
    });
});

router.delete('/employee/:id', async (req, res) => {
    const [result] = await pool.query('DELETE FROM employee WHERE id = ?', [req.params.id]);

    if (result.affectedRows <= 0) {
        throw new Error('Employee not found');
    }

    res.sendStatus(204); // Salió todo bien pero no respondo al cliente
});

router.put('/employee/:id', async (req, res) => {
    const { id } = req.params;
    const { name, salary } = req.body;

    const [result] = await pool.query('UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?', [name, salary, id]);

    if (result.affectedRows <= 0) {
        throw new Error('Employee not found');
    }

    const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id]);
    res.json(rows[0]);
});

// Middleware de manejo de errores
router.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

export default router;
