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

    if (!title.trim() || typeof completed !== "boolean") {
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

// update a task
app.put("/tasks/:id", async (req, res) => {
    const { title, completed } = req.body
    const { id } = req.params

    if (!id) {
        return res.status(400).json({ error: "Missing task ID" })
    }

    if (!title.trim() || typeof completed !== "boolean") {
        return res.status(400).json({ error: "Missing Required Fields" })
    }

    const { data, error } = await supabase
        .from("tasks")
        .select()
        .eq("id", id)
        .single()

    if (error) {
        return res.status(500).json({ error: error.message })
    }

    if (!data) {
        return res.status(404).json({ error: "Task not found" })
    }

    const { error: updateError } = await supabase
        .from("tasks")
        .update({ title, completed })
        .eq("id", id)
        .single()

    if (updateError) {
        return res.status(500).json({ error: updateError.message })
    }

    return res.status(200).json({ message: "Task updated sucessfully"  })
})

// delete a task
app.delete("/tasks/:id", async (req, res) => {
    // extract id from URL
    const { id } = req.params

    // id validation
    if (!id) {
        return res.status(400).json({ error: "Missing task ID" })
    }

    // validate id exists in the database
    const { data, error } = await supabase
        .from("tasks")
        .select()
        .eq("id", id) 
        .single()

    if (error) {
        return res.status(500).json({ error: error.message })
    }

    if (!data) {
        return res.status(404).json({ error: "Task not found" })
    }

    // delete task
    const { error: deleteError } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id)
        

    if (deleteError) {
        return res.status(500).json({ error: deleteError })
    }

    return res.status(200).json({ message: "Task deleted successfully" })
})

app.listen(3000, () => console.log("Server is running on: http://localhost:3000"))

