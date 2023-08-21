'use client';

import { useState, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Comments from '../components/Comments'
import StarIcon from '@mui/icons-material/Star';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SingleRecipe({ singleRecipe, comments, recipeid, singleRecipeComments }) {
    const [commentsOpen, setCommentsOpen] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)
    const router = useRouter()
    const session = useSession()


    useEffect(() => {
        if(session.data) {
            fetch('/api/favorite/isfavorited', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    recipesid: recipeid,
                    usersid: session?.data?.userid
                })
            }).then(res => res.json())
                .then(res => {
                    if(res.isFavorited) {
                        setIsFavorite(true)
                    } else {
                        return res
                    }
                })
        }
    }, [])


    async function handleFavorite(e, recipesid) {
        e.preventDefault()
        await fetch('/api/favorite', {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              },
              body: JSON.stringify({
                recipesid: recipesid,
                usersid: session.data?.userid
              })
        }).then(res => {
            if(!res.ok) {
                throw new error('ERROR favorite post')
            } else {
                setIsFavorite(true)
                router.refresh()
                return res.json()
            }
         })
    }

    async function handleDeleteFavorite(e, recipesid) {
        e.preventDefault()
        await fetch('/api/favorite/delete', {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              },
              body: JSON.stringify({
                recipesid: recipesid,
                usersid: session.data?.userid
              })
        }).then(res => {
            if(!res.ok) {
                alert('ERROR deleting favorite')
            } else {
                setIsFavorite(false)
                router.refresh()
                return res.json()
            }
         })
    }

    function isCommentsOpen() {
        setCommentsOpen((prev) => !prev)
    }

    return (
        <div className='w-[90vw] sm:w-[75vw] md:w-[65vw] lg:w-[45vw] h-fit p-16 flex m-8 shadow-md hover:shadow-lg'>
            {singleRecipe && 
                <div className='w-full relative flex flex-col gap-8'>
                    {(session.data) && 
                        <div>
                        {!isFavorite ?
                            <button onClick={(e) => handleFavorite(e, singleRecipe.recipeid)} className='mr-auto flex bg-primary p-2 text-white rounded-md'>
                                Favorite
                                <StarIcon style={{color: 'white'}}/>
                            </button>
                            :
                            <button onClick={(e) => handleDeleteFavorite(e, singleRecipe.recipeid)} className='mr-auto flex bg-primary p-2 text-white rounded-md'>
                                Remove Favorite
                            </button>
                        }
                        </div>
                    }
                    <section className='w-full flex flex-col gap-8'>
                        <h1 className='text-3xl font-bold'> {singleRecipe.name} </h1>
                        <Link href={{ pathname: `/userprofile/${singleRecipe.author}`, query: { name: singleRecipe.userid}} }>
                            <h2 className='text-2xl font-bold border-b-2 border-primary pb-2 text-primary'> by {singleRecipe.author} </h2>
                        </Link>
                        <img src={singleRecipe.imgurl}></img>
                        <p className='font-semibold'> {singleRecipe.description} </p>
                        <label className='font-extrabold text-xl'> Ingredients </label>
                        <section className='w-fit rounded-md flex flex-col gap-4'>
                            {((singleRecipe.ingredients).slice(1, -1)).split(',').map((ing, idx) => 
                                <p key={idx}>{(ing).slice(1, -1)}</p>
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