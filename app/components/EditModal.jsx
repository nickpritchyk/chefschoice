'use client';

import { useEffect, useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close'
import Rating from '@mui/material/Rating';
import { Button } from '@chimera-ui/components'
import { useRouter } from 'next/navigation'

function EditModal({setEditIsOpen, currRating, currComment, commentid}) {
    const router = useRouter()
    const [newRating, setNewRating] = useState(currRating)
    const [newComment, setNewComment] = useState(currComment)


    async function handleCommentSubmit() {
        await fetch('/api/comment/edit', {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                commentid: commentid,
                comment: newComment,
                rating: newRating
            })
        }).then((res) => {
            if(!res.ok) {
                throw new error('Comment edit post failed, error.')
            } else {
                router.refresh()
                setNewComment('')
                setNewRating('')
                setEditIsOpen(prev => !prev)
                return res.json()
            }
        }) 
    }

    function handleOutsideClick(e) {
        if(refOne.current && !refOne.current.contains(e.target)) {
            setEditIsOpen(prev => !prev)
        } else {
            return
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick, true)
    }, [])

    const refOne = useRef(null)

  return (
    <div className='w-screen h-screen backdrop-blur-sm fixed inset-0 flex justify-center items-center z-10'>
        <div className='relative flex flex-col gap-4 bg-white p-8 rounded-md shadow-sm border-[0.5px] border-primary' ref={refOne}>
            <CloseIcon className='absolute right-8' onClick={() => setEditIsOpen(prev => !prev)} />
            <label className='font-extrabold text-xl'> Edit </label>
            <Rating
                name="simple-controlled"
                defaultValue={currRating}
                onChange={(event, newValue) => {
                    setNewRating(newValue);
                }}
            />
            <textarea onChange={(e) => {setNewComment(e.target.value)}} defaultValue={currComment} className='w-[14rem] sm:w-[20rem] md:w-[24rem] lg:w-[24rem] xl:w-[31rem] rounded-md resize-none p-2 border-[1px] border-primary overflow-scroll' placeholder='Your comment'></textarea>
            <Button type='submit' onClick={handleCommentSubmit} className='h-8'> Submit </Button>
        </div>
    </div>
  )
}

export default EditModal