'use client';


import { Button } from '@chimera-ui/components'
import { useState } from 'react';
import { useSession } from 'next-auth/react';

function Comments() {
    const session = useSession();

    const [authorid, setAuthorId] = useState(session.data.userid)
    const [author, setAuthor] = useState(session.data.user.name)
    const [comment, setComment] = useState('')
    const [likes, setLikes] = useState(0)
    const [rating, setRating] = useState(1)

    async function handleCommentSubmit(e) {
        e.preventDefault()
        console.log('hey')
        await fetch('/api/comment', {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                comment: comment,
                rating: rating,
                likes: likes,
                author: author,
                authorid: authorid
            })
        }).then((res) => {
            if(!res.ok) {
                throw new error('Comment submit failed, error.')
            } return res.json()
        }) 
    }

  return (
        <section className='w-[42rem] flex flex-col gap-4'>
            <h1 className='mb-4'> Comments (0) </h1>
            <h2> Post a comment </h2>
            <textarea onChange={(e) => {setComment(e.target.value)}} className='w-full rounded-md resize-none p-2 border-[1px] overflow-scroll border-primary' placeholder='Your comment'></textarea>
            <Button type='submit' onClick={handleCommentSubmit} className='h-8'> Submit </Button>
        </section>
  )
}

export default Comments