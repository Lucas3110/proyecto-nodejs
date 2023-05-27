import express from "express";
import employeesRoutes from "./routes/employees.routes.js";


const app = express()

app.use(express.json())

app.use('/api/', employeesRoutes)

app.listen(3000)
console.log('Server running on port 3000')