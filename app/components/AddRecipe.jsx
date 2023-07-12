'use client';
import React, { useState, use } from 'react'
import { Button } from '@chimera-ui/components'
import { FoodBank } from '@mui/icons-material';
import { Bounce } from "react-activity";
import "react-activity/dist/library.css";
import { useStoreContext } from '../Context/store'
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { toast } from "react-toastify";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function AddRecipe() {
  const [title, setTitle] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [ingredientsArr, setIngredientsArr] = useState([])
  const [instructions, setInstructions] = useState('')
  const [description, setDescription] = useState('')
  const [cookTime, setCookTime] = useState(0)
  const [msg, setMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { successIcon, setSuccessIcon, setBookSection } = useStoreContext();
  // console.log(instructions)

  const handleSuccess = () => {
    setSuccessIcon(true)
    setBookSection(false)
    toast('Recipe Added', { hideProgressBar: true, autoClose: 3000, type: 'success' })
  }

  const handleIngredientClick = () => {
    if(ingredients.length > 0) {
      setIngredientsArr((prev) => [...prev, ingredients])
      setIngredients('')
    } else {
      alert('Please enter an ingredient before submitting.')
    }
  }

  const handleDeleteIngredient = (deletingIngredient) => {
    if(ingredientsArr.length > 0){
      setIngredientsArr((prev) => {
        return prev.filter(res => res !== deletingIngredient)
      })
    }
  }

  const sendRecipe = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    console.log(ingredientsArr)
    const ingredientsJSON = JSON.stringify(ingredientsArr)
    await fetch('/api/main', {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        ingredientsJSON,
        cookTime,
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
    <div className="flex flex-col w-full items-center">
      <h1 className='text-2xl font-bold mt-4'> Add Recipe </h1>
      <form className='bg-white h-max w-[75%] sm:w-[35%] flex m-12 flex-col space-y-6 rounded-lg'>
        <label> Recipe Title </label>
        <input className='border-[0.5px] border-black p-1 shadow-sm' placeholder='Title' onChange={(e) => setTitle(e.target.value)}></input>
        <label> Description </label>
        <input className='border-[0.5px] border-black p-1 shadow-sm' placeholder='Describe your recipe' onChange={(e) => setDescription(e.target.value)}></input>
        <label> Cook Time (in minutes) </label>
        <input className='border-[0.5px] border-black p-1 shadow-sm' placeholder='Total time' type='number' onChange={(e) => setCookTime(e.target.value)}></input>
        <label> Ingredients </label>
        <div className='flex relative items-center'>
          <input className='border-[0.5px] border-black p-1 shadow-sm w-full' placeholder='Add one item at a time' value={ingredients} onChange={(e) => setIngredients(e.target.value)}></input>
          <button className='flex bg-blue-500 rounded-md absolute right-1' type='button' onClick={handleIngredientClick}> <AddIcon /> </button>
        </div>
        {ingredientsArr.length > 0 &&
        <ul className='sm:text-[18px] border-y-[1px] p-4'>
          {ingredientsArr.map((res) => 
            <div className='flex'>
              <button type='button' className='hover:scale-[1.2] px-2'> <ClearIcon style={{color: '#C0C0C0', fontSize: '16px'}} onClick={() => handleDeleteIngredient(res)} /> </button>
              <li className=''> {res} </li>
            </div>
          )}
        </ul>
        }
        <label> Instructions </label>
        <ReactQuill className='' type='button' placeholder='Instructions' value={instructions} onChange={setInstructions}></ReactQuill> 
        <label> Image </label>
        <AddAPhotoIcon />
        <div className='flex mx-auto h-full'>
        {!isLoading &&
          <Button className='h-[2rem]' onClick={sendRecipe}> Submit Recipe </Button>
        }{isLoading && 
          <Bounce className='h-[2rem]' />
        }
        </div>
      </form>
    </div>
  )
}

export default AddRecipe