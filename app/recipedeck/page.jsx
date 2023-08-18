import Recipes from '../components/Recipes'

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function recipedeck() {
    const recipes = await prisma.recipebook.findMany()
    console.log(recipes)

    return (
        <Recipes recipes={recipes}/>
    )
}

export default recipedeck