const supertest = require('supertest')
const seasonService = require('../service/__mocks__/seasonService')
const { mockRequest, mockResponse } = require('mock-req-res')

// test season
describe("POST /season/all", () => {

    describe("given correct season", () => {
        test("should respond with expected output", async () => {
            const res = mockResponse()
            const req = mockRequest({ params: { season_number: 2 } })
            const expected =   {                                                                                                                                                                                                    
                _id: '61a61c61867aca50a213d027',
                seasonNumber: 2,
                gameweekList: [],
                date: '2021-11-30T12:43:13.849Z',
                __v: 0
            }

            const resposne  = await seasonService.getSeasonByNumber(req, res)

            expect(resposne).toEqual(expected)
        })
    })

    describe("not given correct season", () => {
        test("should return empty", async () => {
            const res = mockResponse()
            const req = mockRequest({ params: { season_number: 5 } })
            const expected = ""

            const resposne  = await seasonService.getSeasonByNumber(req, res)

            expect(resposne).toEqual(expected)
        })
    })
})