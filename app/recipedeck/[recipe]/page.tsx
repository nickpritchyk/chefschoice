import SingleRecipe from '../../components/SingleRecipe'

type Params = {
    params: {
        recipe: string
    }
}

function recipe({ params: {recipe}}: Params) {
  return (
    <div className='flex justify-center h-fit w-full'>
      <SingleRecipe recipeID={recipe}/>
    </div>
  )
}

export default recipe