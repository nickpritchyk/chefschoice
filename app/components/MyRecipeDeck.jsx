'use client';

import Link from "next/link";
import StarIcon from '@mui/icons-material/Star';
import { useRouter } from 'next/navigation'
import { Button } from '@chimera-ui/components'
import AddIcon from '@mui/icons-material/Add';

export default function MyRecipeDeck({ recipes }) {
    const router = useRouter()

    async function handleDelete(id, imgkey) {
        console.log(imgkey)
        const deleteRes = await fetch('/api/deleterecipe', {
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
                router.refresh()
                return res.json()
            }
        })
    }

    return (
        <div className="flex flex-col w-full h-full">
            {recipes.length > 0 && 
                <Link href='/recipepost' className="flex place-self-center mt-10 bg-primary p-2 rounded-md">
                    <p>Add Recipe</p><AddIcon />
                </Link>
            }
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center justify-items-center p-8"> 
            {recipes.length == 0 ?
                <div className="absolute flex flex-col gap-8 items-center">
                    <h1 className="font-extrabold text-2xl mt-24"> You have no recipes. </h1>
                    <Link href={'/recipepost'}>
                        <Button> Make your first post here </Button>
                    </Link>
                </div>

                :

                recipes.map((res, key) => 
                    
                    <div key={res.recipeid} className="w-[21rem] xl:w-[22rem] p-6 gap-8 hover:scale-[1.01]">
                        <div className="w-full h-full bg-gray-300 hover:shadow-xl shadow-lg border-[0.5px] border-primary">
                            <div className="h-[15rem]">
                                <Link href={{ pathname: `/myrecipes/${res.recipeid}`, query: { name: res.name}} } className="w-full h-full">
                                    <img className="object-cover w-full h-full" src={res.imgurl} alt='img' />
                                </Link>
                            </div>
                            <div className="h-[7rem] relative gap-4 bg-white opacity-70 w-full">
                                <h5 className="absolute text-lg font-extrabold tracking-tight p-2">{res.name}</h5>
                                <div className="bottom-2 absolute flex gap-4 items-center w-full p-2">
                                    <Link href={{ pathname: `/updaterecipe/${res.recipeid}`, query: { id: res.recipeid } }}> Edit </Link>
                                    <button className="" onClick={() => {handleDelete(res.recipeid, res.imgkey)}}> Delete </button>
                                    <Link className="font-extrabold" href={{ pathname: `/myrecipes/${res.recipeid}`, query: { name: res.name}} }>
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
        </div>
    )
}