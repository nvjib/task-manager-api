const request = require("supertest")
const app = require("../server")
const supabase = require("../db")

describe("GET /tasks", () => {
    it("should return a list of tasks", async () => {
        const res = await request(app).get("/tasks")

        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
    })
})

describe("GET /tasks/:id", () => {
    let taskID;

    beforeEach(async () => {
        const { data, error } = await supabase
            .from("tasks")
            .insert({ title: "Test Task", completed: false })
            .select()
            .single()

        if (error) throw new Error(error.message)

        taskID = data.id
    })

    afterEach(async () => {
        if (!taskID) return

        await supabase.from("tasks").delete().eq("id", taskID)
        taskID = null
    })

    it("should get task by ID", async () => {
        const res = await request(app).get(`/tasks/${taskID}`)

        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body.id).toBe(taskID)
        expect(res.body.title).toBe("Test Task")
        expect(res.body.completed).toBe(false)
        
    })

    it("should return 404 for invalid ID", async () => {
        const res = await request(app).get("/tasks/999999")

        expect(res.status).toBe(404)
    })
})
