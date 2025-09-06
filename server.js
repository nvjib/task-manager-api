require("dotenv").config()

const express = require("express")
const supabase = require("./db")

const app = express()
app.use(express.json())

// get all tasks
app.get("/tasks", async (req, res) => {
    const { data, error } = await supabase.from("tasks").select("*")

    if (error) {
        return res.status(500).json({ error: error.message })
    }

    if (!data || data.length === 0) {
        return res.status(404).json({ error: "Tasks not found" })
    }

    return res.status(200).json(data)
})

// get a specific task
app.get("/tasks/:id", async (req, res) => {
    const { id } = req.params

    const { data, error } = await supabase.from("tasks").select().eq("id", id)

    if (error) {
        return res.status(500).json({ error: error.message })
    }

    if (!data || data.length === 0) {
        return res.status(404).json({ error: "Task not found" })
    }

    return res.status(200).json(data[0])
})

// create a new task
app.post("/tasks", async (req, res) => {
    const { title, completed } = req.body

    if (!title || typeof completed !== "boolean") {
        return res.status(400).json({ error: "Missing Required Fields" })
    }

    const { data, error } = await supabase
        .from("tasks")
        .insert([{ title: title.trim(), completed }])
        .select()
        .single()

    if (error) {
        return res.status(500).json({ error: error.message })
    }

    return res.status(201).json(data)
})


app.listen(3000, () => console.log("Server is running on: http://localhost:3000"))

