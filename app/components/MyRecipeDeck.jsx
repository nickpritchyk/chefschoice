'use client';

import Link from "next/link";
import StarIcon from '@mui/icons-material/Star';
import { useRouter } from 'next/navigation'

export default function MyRecipeDeck({ recipes }) {
    const router = useRouter()

    async function handleDelete(id) {
        router.refresh()
        const deleteRes = fetch('/api/deleterecipe', {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                id: id
            })
        })
        .then((res) => {
            if(!res.ok) {
                throw new error('delete failed')
            } return res.json()
        })
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center justify-items-center p-8"> 
        {recipes.map((res, key) => 
            
            <div key={res.id} className="w-[21rem] xl:w-[22rem] p-6 gap-8 hover:scale-[1.01]">
                <div className="w-full h-full bg-gray-300 hover:shadow-xl shadow-lg border-[0.5px] border-primary">
                    <Link href={{ pathname: `/myrecipes/${res.id}`, query: { name: res.name}} } className="w-full">
                        <img className="h-[15rem] w-full" src={res.imgurl} alt='img' />
                    </Link>
                    <div className="h-[7rem] relative gap-4 bg-white opacity-70 w-full">
                        <h5 className="absolute text-lg font-extrabold tracking-tight p-2">{res.name}</h5>
                        <div className="bottom-2 absolute flex gap-4 items-center w-full p-2">
                            <Link href={{ pathname: `/updaterecipe/${res.id}`, query: { id: res.id } }}> Edit </Link>
                            <button className="" onClick={() => {handleDelete(res.id)}}> Delete </button>
                            <Link className="font-extrabold" href={{ pathname: `/myrecipes/${res.id}`, query: { name: res.name}} }>
                                View
                            </Link>
                            <i className="absolute right-8 flex gap-4">
                                <p> 4/5 </p>
                                <StarIcon style={{color: '#F99648'}}/>
                            </i>
                        </div>
                    </div>
                </div>
            </div>

        )}
        </div>
    )
}