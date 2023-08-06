'use client';

import { useStoreContext } from '../Context/store'
import { useEffect } from 'react';

export default function SingleRecipe({ recipeID }) {
    const { recipes, singleRecipe, setSingleRecipe } = useStoreContext()
    const ingredients = (singleRecipe.ingredients.slice(1, -1)).split(',')

    useEffect(() => {
        setSingleRecipe(recipes.find(({id}) => id === Number(recipeID)))
    }, [])


    return (
        <div>
            <section>
                <h1> {singleRecipe.name} </h1>
                <p> {singleRecipe.description} </p>
                <ul>
                    {ingredients}
                </ul>
            </section>
            <section>
                <h1> Comments </h1>
            </section>
        </div>
    )
}