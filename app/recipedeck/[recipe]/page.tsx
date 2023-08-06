import SingleRecipe from '../../components/SingleRecipe'

type Params = {
    params: {
        recipe: string
    }
}

function recipe({ params: {recipe}}: Params) {
  return (
    <SingleRecipe recipeID={recipe}/>
  )
}

export default recipe