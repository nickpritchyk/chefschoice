'use client';

import React, { useEffect, useState } from 'react'
import Recipes from './Recipes';


export default function Searchbar({ recipes }) {
  const [searchInput, setSearchInput] = useState('')
  const [filteredRecipes, setFilteredRecipes] = useState(recipes)

  useEffect(() => {
    setFilteredRecipes(recipes.filter(recipe => ((recipe.name).toLowerCase()).includes(searchInput) ))
  }, [searchInput])

  return (
    <div className='w-full h-fit mt-8 flex flex-col justify-center items-center'>
        <h1 className='text-[28px] text-primary'> Discover Recipes </h1>
        <input onChange={(e) => setSearchInput((e.target.value).toLowerCase())} className='w-[40%] h-[2.2rem] shadow-md border-black border-[0.5px] rounded-md p-2' placeholder='Enter a recipe'></input>
        <Recipes recipes={filteredRecipes}/>
    </div>
  )
}
