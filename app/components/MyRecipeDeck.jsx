'use client';

import Link from "next/link";
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';

export default function MyRecipeDeck({ recipes }) {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-12"> 
        {recipes.map((res, key) => 
            
            <div key={res.id} className="flex w-96 sm:w-82 md:w-64 lg:w-82 h-fit mb-12 border border-gray-200 rounded-lg shadow-lg bg-white hover:scale-[1.01]">
                <img className="object-fill" src={res.imgurl} alt='img' />
                <div className="p-5 left-0">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight bottom">{res.name}</h5>
                    <div className="flex-row flex gap-2 mt-4 justify-center">
                        <Link href={{ pathname: `/myrecipes/${res.id}`, query: { name: res.name} }} className="items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-[#F99648] hover:bg-[#ecb97a] focus:ring-4 focus:outline-none">
                            View more
                        </Link>
                    </div>
                </div>
            </div>

        )}
        </div>
    )
}