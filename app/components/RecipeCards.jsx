


const getRecipes = async (e) => {
        const res = await fetch('/api/main')
        // The return value is *not* serialized
        // You can return Date, Map, Set, etc.
       
        // Recommendation: handle errors
        if (!res.ok) {
          // This will activate the closest `error.js` Error Boundary
          throw new Error('Failed to fetch data')
        }
       
        return res
}

async function recipecards() {
    const data = await getRecipes()
    console.log(data)
    return (
        <div> recipecards </div>
    )
}

export default recipecards