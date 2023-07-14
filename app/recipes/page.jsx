
const getRecipes = async () => {
    const data = await fetch('http://localhost:3000/api/main')
      if (!data.ok) {
        throw new Error('Failed to fetch data')
    }
    return data.json()
}

async function recipecards() {
    const recipe = await getRecipes()

    return (
        <div className="flex h-full w-full flex-col m-4"> 
        {recipe.map(res => 
             <h2> {res.name} </h2>
        )}
        </div>
    )
}

export default recipecards