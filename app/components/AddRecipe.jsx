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
import { useRouter } from 'next/navigation';

function AddRecipe() {
  const router = useRouter()
  const session = useSession();
  const [userid, setUserid] = useState()
  const [author, setAuthor] = useState()

  useEffect(() => {
    setUserid(session.data?.userid)
    setAuthor(session.data?.user.name)
  })

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

  const { setSuccessIcon} = useStoreContext()


  async function deleteThing(e) {
    e.preventDefault()
    await fetch('/api/deleteFileUpload', {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        fileKey: imgURL.fileKey
      })
    }).then(res => {
      if(!res.ok) {
        throw new error('ERROR, image delete failed')
      } else {
        setImgURL('')
        router.refresh()
      }
    })
  }

  const handleSuccess = () => {
    setSuccessIcon(true)
    router.push('/myrecipes')
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
    if(title && ingredientsArr && instructions && description && cookTime && userid && author && imgURL) {
      setIsLoading(true)
    const ingredientsJSON = JSON.stringify(ingredientsArr)
    await fetch('/api/addrecipe', {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        ingredientsJSON,
        cookTime,
        instructions,
        imgURL: imgURL.fileUrl,
        imgkey: imgURL.fileKey,
        author,
        userid
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
    }).then(res =>
      res.json()).then((data) => {setMsg(data.message)
      router.refresh()
      setIsLoading(false)
      handleSuccess()
      })
    } else {
      alert('Please fill out all input fields and add an image.')
    }}
    
  return (
    <div className="flex flex-col w-full items-center h-full">
      <h1 className='text-2xl font-bold mt-4'> Add Recipe </h1>
      <form className='bg-white h-max w-[75%] sm:w-[35%] flex m-12 flex-col space-y-6 rounded-lg'>
        <label className='font-extrabold'> Recipe Title </label>
        <input className='border-[0.5px] border-black p-1 shadow-sm' placeholder='Title' onChange={(e) => setTitle(e.target.value)} maxLength="45" required></input>
        <label className='font-extrabold'> Description </label>
        <input className='border-[0.5px] border-black p-1 shadow-sm' placeholder='Describe your dish in short' onChange={(e) => setDescription(e.target.value)} maxLength="45" required></input>
        <label className='font-extrabold'> Cook Time (in minutes) </label>
        <input className='border-[0.5px] border-black p-1 shadow-sm' placeholder='ex. 60' type='number' onChange={(e) => setCookTime(e.target.value)} onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()} required></input>
        <label className='font-extrabold'> Ingredients </label>
        <div className='flex relative items-center'>
          <input className='border-[0.5px] border-black p-1 shadow-sm w-full' placeholder='ex. 1lb chicken' value={ingredients} onChange={(e) => setIngredients(e.target.value)}></input>
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
        {/* <ReactQuill className='flex flex-col' type='button' placeholder='Instructions' value={instructions} onChange={setInstructions} required></ReactQuill>  */}
        <label className='font-extrabold'> Image </label>
        <p className='text-xs text-gray-700'> Add the wrong image to the dropzone? Simply choose another file. </p>
        <div className='flex flex-col'>
          {!deleteImg &&
            <UploadDropzone className='bg-red-400' endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response
                console.log('file upload thing: ', res)
                setImgURL(res[0])
                toast('Upload Successfull', { hideProgressBar: true, autoClose: 2000, type: 'success' })
              }}
              onUploadError={(error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          }
          {imgURL && 
            <div className='flex flex-col justify-center items-center p-4'>
              <p className='text-md text-gray-700'> Upload the wrong image? </p>
              <button onClick={deleteThing}  type='button' className=' m-auto h-fit hover:underline text-blue-400 hover:scale-[1.02] px-2'> Remove upload </button>
              {imgURL.fileUrl && 
                <div className='items-center gap-2 flex flex-col justify-center mt-8'>
                  <p> Recipe Picture </p>
                  <img className='mb-8 border-[1px] border-black h-full w-[20rem]' src={imgURL.fileUrl}></img> 
                </div>
              }
            </div>
          }
        </div>
      </form>
      <div className='flex mx-auto h-full'>
        {!isLoading &&
          <Button type='submit' className='h-[2rem] mb-28' onClick={sendRecipe}> Submit Recipe </Button>
        }{isLoading && 
          <Bounce className='h-[2rem]' />
        }
        </div>
    </div>

    
  )
}

export default AddRecipe