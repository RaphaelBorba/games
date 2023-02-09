import prisma from '../../src/config/database';

export async function cleanDB(){

    await prisma.game.deleteMany({})
    await prisma.console.deleteMany({})
}