import supertest from 'supertest'
import app from '../../src/app'
import { createConsole } from '../factories/console.factory'
import { createGame } from '../factories/games.factory'
import { cleanDB } from '../helpers/deleteDB'

const server = supertest(app)

beforeEach(async () => {
    await cleanDB()
})

describe("GET /games", () => {

    it("get an empty array of games and return status 200", async () => {

        const result = await server.get('/games')

        expect(result.body).toEqual([])
        expect(result.status).toBe(200)
    })

    it("get an array with games and return status 200", async () => {

        const consol = await createConsole()
        const game = await createGame(consol.id)
        const game2 = await createGame(consol.id)

        const result = await server.get('/games')

        expect(result.body).toEqual([
            {
                id: game.id,
                title: game.title,
                consoleId: game.consoleId,
                Console: {
                    id: consol.id,
                    name: consol.name
                }
            },
            {
                id: game2.id,
                title: game2.title,
                consoleId: game2.consoleId,
                Console: {
                    id: consol.id,
                    name: consol.name
                }
            }
        ])
    })
})

describe("GET /games/:id", () => {

    it("send an id that dosen't exist and return 404", async () => {

        const result = await server.get('/games/1')

        expect(result.status).toBe(404)
    })
    it("get a game by id and return 200", async () => {

        const consol = await createConsole()
        const game = await createGame(consol.id)


        const result = await server.get(`/games/${game.id}`)

        expect(result.status).toBe(200)
        expect(result.body).toEqual(
            {
                id: game.id,
                title: game.title,
                consoleId: game.consoleId
            }
        )
    })
})