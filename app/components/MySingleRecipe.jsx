'use client';

import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function MySingleRecipe({ singleRecipe }) {
    const [commentsOpen, setCommentsOpen] = useState(false)
    const router = useRouter()

    function isCommentsOpen() {
        setCommentsOpen((prev) => !prev)
    }

    async function handleDelete(id) {
        const deleteRes = fetch('/api/deleterecipe', {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                recipeid: id
            })
        })
        .then((res) => {
            if(!res.ok) {
                throw new error('delete failed')
            } else {
                router.refresh()
                return res.json()
            }
        })
    }

    return (
        <div className='bg-[#FAF1E5] w-[90vw] sm:w-[75vw] md:w-[65vw] lg:w-[45vw] h-fit p-16 flex m-8 shadow-md hover:shadow-lg'>
            {singleRecipe && 
                <div className='flex flex-col gap-12 w-full'>
                    <div className='flex gap-6 w-full border-b-[1px] border-black p-2'>
                        <Link href={{ pathname: `/updaterecipe/${singleRecipe.recipeid}`, query: { id:  singleRecipe.recipeid} }}> Edit </Link>
                        <button className="" onClick={() => {handleDelete(singleRecipe.recipeid)}}> Delete </button>
                    </div>
                    <section className='flex flex-col gap-8'>
                        <h1 className='text-3xl font-bold'> {singleRecipe.name} </h1>
                        <p className='font-semibold'> {singleRecipe.description} </p>
                        <p> {singleRecipe.ingredients} </p>
                        <h2 className=''> Instructions </h2>
                        <section dangerouslySetInnerHTML={{__html: singleRecipe.instructions}}></section>
                    </section>
                    <div className='flex flex-row gap-2'>
                        <h1 className='text-xl font-bold'> Comments </h1>
                        <ExpandMoreIcon onClick={() => {isCommentsOpen()}} style={{fontSize: '32px', cursor: 'pointer'}}/>
                    </div>
                    {commentsOpen && 
                        <section>
                            <p> Recent Comments </p>
                        </section>
                    }
                </div>
            }
        </div>
    )
}