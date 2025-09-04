const request = require("supertest")
const app = require("../server")

describe("GET /tasks", () => {
    it("should return a list of tasks", async () => {
        const res = await request(app).get("/tasks")

        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
    })
})
