'use client';
import React, { useState, use } from 'react'
import { Button } from '@chimera-ui/components'
import { FoodBank } from '@mui/icons-material';
import { Bounce } from "react-activity";
import "react-activity/dist/library.css";
import { useStoreContext } from '../Context/store'
import { toast } from "react-toastify";


function AddRecipe() {
  const [title, setTitle] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [instructions, setInstructions] = useState('')
  const [msg, setMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { successIcon, setSuccessIcon, setBookSection } = useStoreContext();

  const handleSuccess = () => {
    setSuccessIcon(true)
    setBookSection(false)
    toast('Success!', { hideProgressBar: true, autoClose: 2000, type: 'success' })
  }

  const sendRecipe = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    await fetch('/api/main', {
      method: 'POST',
      body: JSON.stringify({
        title,
        ingredients,
        instructions,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
    }).then(res =>
      res.json()).then((data) => {setMsg(data.message)
      setIsLoading(false)
      handleSuccess()
      })
    }
  

  return (
    <div className="flex flex-col w-full items-center mt-4 bg-[url('./assets/food.png')]">
      <h1 className='text-2xl font-bold'> Add Recipe </h1>
      <form className='bg-white h-max flex m-12 flex-col space-y-6 border-[1.5px] border-black md:p-24 rounded-lg'>
        <label> Recipe Title</label>
        <input className='border-[1px] border-black rounded-md p-1 shadow-xl' placeholder='Title' onChange={(e) => setTitle(e.target.value)}></input>
        <label> Ingredients </label>
        <input className='border-[1px] border-black rounded-md p-1 shadow-xl' placeholder='Ingredients' onChange={(e) => setIngredients(e.target.value)}></input>
        <label> Instructions </label>
        <input className='border-[1px] border-black rounded-md p-1 shadow-xl' placeholder='Instructions' onChange={(e) => setInstructions(e.target.value)}></input>
        <Button className='mx-auto' onClick={sendRecipe}> Submit Recipe </Button>
        {isLoading && 
        <div className='m-auto'>
          <Bounce />
        </div>
        }
      </form>
    </div>
  )
}

export default AddRecipe