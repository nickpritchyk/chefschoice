'use client';
import React, { useState, use } from 'react'
import { Button } from '@chimera-ui/components'
import { NextResponse } from 'next/server';


function AddRecipe() {
  const [title, setTitle] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [instructions, setInstructions] = useState('')

  const sendRecipe = async (e) => {
    e.preventDefault();
    fetch('/api/main', {
      method: 'POST',
      body: JSON.stringify({
        title,
        ingredients,
        instructions,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
    }).then(res => {
      console.log(res)
    })
  }


  return (
    <div className='flex flex-col items-center mt-4'>
      <h1 className='text-2xl font-bold'> Add Recipe </h1>
      <form className='flex m-12 flex-col space-y-6 border-[1.5px] border-black p-16 md:p-24 rounded-lg'>
        <label> Recipe Title</label>
        <input className='border-[1px] border-black rounded-md p-1 shadow-xl' placeholder='Title' onChange={(e) => setTitle(e.target.value)}></input>
        <label> Ingredients </label>
        <input className='border-[1px] border-black rounded-md p-1 shadow-xl' placeholder='Ingredients' onChange={(e) => setIngredients(e.target.value)}></input>
        <label> Instructions </label>
        <input className='border-[1px] border-black rounded-md p-1 shadow-xl' placeholder='Instructions' onChange={(e) => setInstructions(e.target.value)}></input>
        <Button className='mx-auto' onClick={sendRecipe}> Submit Recipe </Button>
      </form>
    </div>
  )
}

export default AddRecipe