'use client';

import { Button } from '@chimera-ui/components'
import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import StarIcon from '@mui/icons-material/Star';
import Rating from '@mui/material/Rating';
import EditModal from '../components/EditModal'

function Comments({ recipeid, singleRecipeComments }) {
    const router = useRouter()
    const session = useSession();

    const [authorid, setAuthorId] = useState(session.data?.userid)
    const [author, setAuthor] = useState(session.data?.user.name)
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(0)
    const [editIsOpen, setEditIsOpen] = useState(false)

    console.log(comment, rating)

    async function handleCommentSubmit(e) {
        e.preventDefault()
        await fetch('/api/comment', {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                comment: comment,
                rating: rating,
                author: author,
                authorid: authorid,
                recipeid: recipeid
            })
        }).then((res) => {
            if(!res.ok) {
                throw new error('Comment submit failed, error.')
            } else {
                router.refresh()
                setComment('')
                setRating('')
                return res.json()
            }
        }) 
    }

    async function handleDelete(e, commentid) {
        e.preventDefault()
        await fetch('/api/comment/delete', {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                commentid: commentid
            })
        }).then((res) => {
            if(!res.ok) {
                throw new error('Comment delete failed, error.')
            } else {
                router.refresh()
                return res.json()
            }
        }) 
    }

    async function handleEdit(e, commentid) {
        e.preventDefault()
        await fetch('api/comment/edit', {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                rating: rating,
                commentid: commentid
            })
        }).then((res) => {
            if(!res.ok) {
                throw new error('Comment edit failed, error.')
            } else {
                setComment('')
                setRating('')
                router.refresh()
                return res.json()
            }
        }) 
    }


  return (
        <section className='w-fit h-fit flex flex-col gap-4'>
            <div className='w-full h-fit flex flex-col gap-6'>
                {(!singleRecipeComments.length == 0) ?
                    singleRecipeComments.map((res, key) => 
                        <div key={res.id} className='gap-2 flex flex-col bg-[#F0F0F0] rounded-md p-3 w-fit hover:shadow-md'>
                            <h1 className='font-extrabold text-lg'>{res.author}</h1>
                            {!(res.rating == null) &&
                                <p> <StarIcon style={{fontSize: '17px', color: '#F99648'}}/> {res.rating} </p>
                            }
                            <p>{res.comment}</p> 
                            {(authorid == res.authorid) &&
                                <div className='flex gap-4 mt-2'>
                                    <button onClick={(e) => handleDelete(e, res.id)}> Delete </button>
                                    <button onClick={() => setEditIsOpen(prev => !prev)}> Edit </button>
                                    {editIsOpen && 
                                        <EditModal commentid={res.id} currComment={res.comment} currRating={res.rating} setEditIsOpen={setEditIsOpen} editIsOpen={editIsOpen} />
                                    }
                                </div>
                            }
                        </div>
                ):
                        <p> No comments </p>
                }
            </div>
            {(session.data) &&
                <div className='flex flex-col gap-4 mt-6'>
                    <h2 className='font-extrabold'> Leave a comment </h2>
                    <label> Rating </label>
                    <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={(event, newValue) => {
                            setRating(newValue);
                        }}
                    />
                    <textarea onChange={(e) => {setComment(e.target.value)}} value={comment} className='w-[14rem] sm:w-[20rem] md:w-[24rem] lg:w-[24rem] xl:w-[31rem] rounded-md resize-none p-2 border-[1px] overflow-scroll' type='text' autocapitalize='sentences' autoCorrect='true' placeholder='Your comment'></textarea>
                    <Button type='submit' onClick={handleCommentSubmit} className='h-8'> Submit </Button>
                </div>
            }
            {!session.data &&
                <span className='italic mt-4'> Sign in to comment </span>
            }
        </section>
  )
}

export default Comments