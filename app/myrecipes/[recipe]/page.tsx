import MySingleRecipe from '../../components/MySingleRecipe'

type Params = {
    params: {
        recipe: string
    }
}

function recipe({ params: {recipe}}: Params) {
  return (
    <div className='flex justify-center h-fit w-full'>
      <MySingleRecipe recipeID={recipe}/>
    </div>
  )
}

export default recipe