'use client';

import { useStoreContext } from '../Context/store'
import { useState, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function MySingleRecipe({ recipeID }) {
    const [commentsOpen, setCommentsOpen] = useState(false)

    function isCommentsOpen() {
        setCommentsOpen((prev) => !prev)
    }

    const { recipes, singleRecipe, setSingleRecipe } = useStoreContext()

    useEffect(() => {
        setSingleRecipe(recipes.find(({id}) => id === Number(recipeID)))
    })


    return (
        <div className='bg-[#FAF1E5] w-[90vw] sm:w-[75vw] md:w-[65vw] lg:w-[45vw] h-fit p-16 flex m-8 shadow-md hover:shadow-lg'>
            {singleRecipe && 
                <div className='flex flex-col gap-12'>
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