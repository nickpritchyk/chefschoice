'use client';

import Link from "next/link";
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';

export default function MyRecipeDeck({ recipes }) {
    console.log(recipes)
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-12"> 
        {recipes.map((res, key) => 
            
            <div key={res.id} className="flex flex-col w-[16rem] sm:w-[21rem] h-fit shadow-lg hover:scale-[1.01]">
                <div className="w-full h-[17rem] flex relative bg-gray-300">
                    <Link href={{ pathname: `/myrecipes/${res.id}`, query: { name: res.name}} } className="w-full h-[17rem] flex relative">
                        <img className="h-full w-full" src={res.imgurl} alt='img' />
                    </Link>
                    <div className="absolute bottom-0 left-0 flex gap-6 items-center bg-[#F99648] opacity-70 w-full pl-4 pb-2">
                        <h5 className="text-xl font-bold tracking-tight">{res.name}</h5>
                        <button onClick={() => {alert('Edit')}}> Edit </button>
                        <button onClick={() => {}}> Delete </button>
                        <Link href={{ pathname: `/myrecipes/${res.id}`, query: { name: res.name}} } className="absolute right-8">
                            View
                        </Link>
                    </div>
                </div>
            </div>

        )}
        </div>
    )
}