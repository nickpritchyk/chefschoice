
const getRecipes = async () => {
    const data = await fetch('http://localhost:3000/api/addrecipe', {cache: "no-store"})
    console.log(data)
      if (!data.ok) {
        throw new Error('Failed to fetch data')
    }
    return data.json()
}

async function recipedeck() {
    const recipe = await getRecipes()
    console.log(recipe)


    return (
        <div className="grid grid-cols-3 gap-4 justify-items-center m-12"> 
        {recipe.map(res => 
            
            <div className="w-[350px] h-[400px] mb-12 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <p className="text-white">
                    { res.users.username }
                </p>
                <a href="#">
                    <img className="rounded-t-lg" src={res.imgurl} alt='img' />
                </a>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{res.name}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{res.description}</p>
                    <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        View more
                    </a>
                </div>
            </div>

        )}
        </div>
    )
}

export default recipedeck