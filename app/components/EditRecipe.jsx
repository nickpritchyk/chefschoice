'use client';

import React, { useState, useEffect } from 'react'
import { Button } from '@chimera-ui/components'
import { Bounce } from "react-activity";
import "react-activity/dist/library.css";
import { useStoreContext } from '../Context/store'
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { toast } from "react-toastify";
import 'react-quill/dist/quill.snow.css';
import { UploadDropzone } from '../components/uploadthing';
import ReactQuill from 'react-quill';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation';


function EditRecipe({ recipes }) {
  const router = useRouter()
  const { setSuccessIcon } = useStoreContext();

  const searchParams = useSearchParams();
  const recipeID = searchParams.get('id')

  const session = useSession();
  const [userid, setUserid] = useState()
  useEffect(() => {setUserid(session.data?.userid)}, [session]);
  
  const [title, setTitle] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [ingredientsArr, setIngredientsArr] = useState([])
  const [instructions, setInstructions] = useState('')
  const [description, setDescription] = useState('')
  const [cookTime, setCookTime] = useState(0)
  const [imgURL, setImgURL] = useState('')
  const [deleteImg, setDeleteImg] = useState(false)
  const [msg, setMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [singleRecipe, setSingleRecipe] = useState([])

  useEffect(() => {
    router.refresh()
  }, [])

  useEffect(() => {
    setSingleRecipe(recipes.find(({recipeid}) => recipeid === Number(recipeID)));
  })


  useEffect(() => {
    setIngredientsArr(JSON.parse(singleRecipe?.ingredients ?? '[]'))
    setTitle(singleRecipe?.name)
    setInstructions(singleRecipe?.instructions)
    setCookTime(singleRecipe?.cooktime)
    setDescription(singleRecipe?.description)
    setImgURL(singleRecipe?.imgURL)
  }, [singleRecipe])

  const handleSuccess = () => {
    setSuccessIcon(true)
    router.push('/myrecipes')
    toast('Recipe Updated', { hideProgressBar: true, autoClose: 3000, type: 'success' })

  }

  const handleIngredientClick = () => {
    if(ingredients.length > 0) {
      setIngredientsArr((prev) => [...prev, ingredients])
      setIngredients('')
    } else {
      alert('Please enter an ingredient before submitting.')
    }
  }

  const handleDropImgUpload = () => {
    setDeleteImg((prev) => !prev)
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
    if(title && ingredientsArr && instructions && description && cookTime && userid) {
      setIsLoading(true)
    const ingredientsJSON = JSON.stringify(ingredientsArr)
    await fetch('/api/editrecipe', {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        ingredientsJSON,
        cookTime,
        instructions,
        imgURL,
        recipeID
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
    }).then(res =>
      res.json()).then((data) => {setMsg(data.message)
      setIsLoading(false)
      handleSuccess()
      })
    } else {
      alert('Please fill out all input fields.')
    }}
    
  return (
    <div className="flex flex-col w-full items-center mb-24">
      <h1 className='text-2xl font-bold mt-4'> Edit Recipe </h1>
      <form className='bg-white h-max w-[75%] sm:w-[35%] flex m-12 flex-col space-y-6 rounded-lg'>
        <label> Recipe Title </label>
        <input className='border-[0.5px] border-black p-1 shadow-sm' defaultValue={singleRecipe?.name || ''} placeholder='Title' onChange={(e) => setTitle(e.target.value)} required></input>
        <label> Description </label>
        <input className='border-[0.5px] border-black p-1 shadow-sm' defaultValue={singleRecipe?.description || ''} placeholder='Describe your dish in short' onChange={(e) => setDescription(e.target.value)} required></input>
        <label> Cook Time (in minutes) </label>
        <input className='border-[0.5px] border-black p-1 shadow-sm' defaultValue={singleRecipe?.cooktime || ''} placeholder='ex. 60' type='number' onChange={(e) => setCookTime(e.target.value)} onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()} required></input>
        <label> Ingredients </label>
        <div className='flex relative items-center'>
          <input className='border-[0.5px] border-black p-1 shadow-sm w-full' placeholder='ex. 1lb chicken' onChange={(e) => setIngredients(e.target.value)}></input>
          <button className='flex bg-[#F99648] hover:bg-[#ecb97a] rounded-md absolute right-1' type='button' onClick={handleIngredientClick}><AddIcon /></button>
        </div>
        {ingredientsArr.length > 0 &&
        <ul className='sm:text-[18px] border-y-[1px] p-4'>
          {ingredientsArr.map((res) => 
            <div className='flex'>
              <button type='button' className='hover:scale-[1.2] px-2'> <ClearIcon style={{color: '#C0C0C0', fontSize: '16px'}} onClick={() => handleDeleteIngredient(res)} /></button>
              <li className=''> {res} </li>
            </div>
          )}
        </ul>
        }
        <label> Instructions </label>
        {singleRecipe?.instructions && 
        <div>
          <ReactQuill defaultValue={singleRecipe?.instructions || ''} placeholder='Instructions' onChange={setInstructions} required></ReactQuill> 
        </div>
          }
        <label className='flex'> Image </label>
        <div className='flex flex-col'>
          {!deleteImg &&
            <UploadDropzone endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response
                setImgURL(res[0].fileUrl)
                toast('Upload Successfull', { hideProgressBar: true, autoClose: 2000, type: 'success' })
              }}
              onUploadError={(error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          }
          <button onClick={() => handleDropImgUpload()}  type='button' className=' m-auto h-fit hover:underline text-blue-400 hover:scale-[1.02] px-2'> Remove/Upload </button>
        </div>
      </form>
      {imgURL && 
        <div className='items-center gap-2'>
          <p> New Recipe Picture </p>
          <img className='mb-12 border-2 border-black h-full w-[20rem]' src={imgURL}></img> 
        </div>
        }
      <div className='flex mx-auto h-full'>
        {!isLoading &&
          <Button type='submit' className='h-[2rem]' onClick={sendRecipe}> Submit Recipe </Button>
        }{isLoading && 
          <Bounce className='h-[2rem]' />
        }
        </div>
    </div>

    
  )
}

export default EditRecipe