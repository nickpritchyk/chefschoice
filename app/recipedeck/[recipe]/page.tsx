type Params = {
    params: {
        recipe: string
    }
}

function recipe({ params: {recipe}}: Params) {
  return (
    <div>
        <h1></h1>
    </div>
  )
}

export default recipe