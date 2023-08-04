'use client';

const getRecipes = async () => {
    const data = await fetch('http://localhost:3000/api/addrecipe', {cache: "no-store"})
      if (!data.ok) {
        throw new Error('Failed to fetch data')
    }
    return data.json()
}

const handleLike = async (recipeID) => {
    const data = await fetch('/api/like', {
        method: 'POST',
        body: JSON.stringify({
            recipeID: recipeID
        })
    })
}

async function recipedeck() {
    const recipe = await getRecipes()


    return (
        <div className="grid grid-cols-4 gap-4 justify-items-center m-12"> 
        {recipe.map(res => 
            
            <div className="relative w-full h-fit mb-12 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <p className="text-white">
                    { res.users.username }
                </p>
                <img className="object-fill" src={res.imgurl} alt='img' />
                <div className="p-5 left-0">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white bottom">{res.name}</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{res.description}</p>
                    <div className="flex-row justify-evenly flex">
                        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            View more
                        </a>
                        <button className="p-2 border-2 border-white text-white" onClick={() => handleLike(res.id)}> Like </button>
                    </div>
                </div>
            </div>

        )}
        </div>
    )
}

export default recipedeck