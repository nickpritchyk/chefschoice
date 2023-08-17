'use client';

import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Comments from '../components/Comments'

export default function MySingleRecipe({ singleRecipe, singleRecipeComments }) {
    const [commentsOpen, setCommentsOpen] = useState(false)
    const router = useRouter()

    function isCommentsOpen() {
        setCommentsOpen((prev) => !prev)
    }

    async function handleDelete(id, imgkey) {
        const deleteRes = fetch('/api/deleterecipe', {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                recipeid: id,
                imgkey: imgkey
            })
        })
        .then((res) => {
            if(!res.ok) {
                throw new error('delete failed')
            } else {
                router.push('/myrecipes')
                router.refresh()
                return res.json()
            }
        })
    }

    return (
        <div className='w-[90vw] sm:w-[75vw] md:w-[65vw] lg:w-[45vw] h-fit p-16 flex m-8 shadow-md hover:shadow-lg'>
            {singleRecipe && 
                <div className='w-full relative flex flex-col gap-12'>
                    <div className='flex gap-6 w-full border-b-[1px] border-black p-2'>
                        <Link style={{color: 'white', backgroundColor: '#F99648', borderRadius: '6px', padding: '6px', border: '0.2px solid black'}} href={{ pathname: `/updaterecipe/${singleRecipe.recipeid}`, query: { id:  singleRecipe.recipeid} }}> Edit </Link>
                        <button className="text-white rounded-md p-[6px] bg-primary border-black border-[0.2px]" onClick={() => {handleDelete(singleRecipe.recipeid, singleRecipe.imgkey)}}> Delete </button>
                    </div>
                    <section className='w-full flex flex-col gap-8'>
                        <h1 className='text-3xl font-bold'> {singleRecipe.name} </h1>
                        <img src={singleRecipe.imgurl}></img>
                        <p className='font-semibold'> {singleRecipe.description} </p>
                        <label className='font-extrabold text-xl'> Ingredients </label>
                        <section className='w-fit rounded-md flex flex-col gap-4'>
                            {((singleRecipe.ingredients).slice(1, -1)).split(',').map((ing) => 
                                <p>{(ing).slice(1, -1)}</p>
                            )}
                        </section>
                        <h2 className='font-extrabold text-xl'> Instructions </h2>
                        <section style={{fontSize: '18px'}} dangerouslySetInnerHTML={{__html: singleRecipe.instructions}}></section>
                    </section>
                    <div className='flex flex-row gap-2'>
                        <h1 className='text-xl font-bold'> Comments </h1>
                        <ExpandMoreIcon onClick={() => {isCommentsOpen()}} style={{fontSize: '32px', cursor: 'pointer'}}/>
                    </div>
                    {commentsOpen && 
                        <Comments recipeid={singleRecipe.recipeid} singleRecipeComments={singleRecipeComments} />

                    }
                </div>
            }
        </div>
    )
}