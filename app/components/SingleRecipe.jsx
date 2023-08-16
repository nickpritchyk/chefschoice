'use client';

import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Comments from '../components/Comments'
import StarIcon from '@mui/icons-material/Star';

export default function SingleRecipe({ singleRecipe, comments, recipeid, singleRecipeComments }) {
    const [commentsOpen, setCommentsOpen] = useState(false)

    function isCommentsOpen() {
        setCommentsOpen((prev) => !prev)
    }

    return (
        <div className='w-[90vw] sm:w-[75vw] md:w-[65vw] lg:w-[45vw] h-fit p-16 flex m-8 shadow-md hover:shadow-lg'>
            {singleRecipe && 
                <div className='w-full relative flex flex-col gap-12'>
                    <button className='mr-auto flex gap-2'>
                        Favorite
                        <StarIcon style={{color: '#F99648'}}/>
                    </button>
                    <section className='w-full flex flex-col gap-8'>
                        <h1 className='text-3xl font-bold'> {singleRecipe.name} </h1>
                        <h2 className='text-2xl font-bold border-b-2 border-primary pb-2'> by {singleRecipe.author} </h2>
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
                        <Comments recipeid={recipeid} singleRecipeComments={singleRecipeComments}/>
                    }
                </div>
            }
        </div>
    )
}