import Recipes from '../components/Recipes'

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

export const revalidate = 0;

async function recipedeck() {
    const recipes = await prisma.recipebook.findMany()

    return (
        <Recipes recipes={recipes}/>
    )
}

export default recipedeck