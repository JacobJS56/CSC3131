const supertest = require('supertest')
const seasonController = require('../controller/api/season')
const seasonService = require('../service/seasonService')

describe("POST /season/all", () => {

    describe("given correct season not used", () => {
        test("should respond with sign", async () => {
            //const response = await supertest(seasonController).get("/all")
            
            expect(true).toBe(true)
        })
    })
})