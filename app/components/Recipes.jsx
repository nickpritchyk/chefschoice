'use client';

import Link from 'next/link';
import { useStoreContext } from '../Context/store';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';


function Recipes() {
    const { recipes } = useStoreContext()

    return (
        <div className="grid grid-cols-4 gap-4 justify-items-center m-12"> 
        {recipes.map(res => 
            
            <div className="relative w-full h-fit mb-12 border border-gray-200 rounded-lg shadow-lg bg-white hover:scale-[1.01]">
                <img className="object-fill" src={res.imgurl} alt='img' />
                <div className="p-5 left-0">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight bottom">{res.name}</h5>
                    <p className="mb-2">
                        by { res.users.username }
                    </p>
                    <div className="flex-row flex gap-2 mt-4 justify-center">
                        <Link href={{ pathname: `/recipedeck/${res.id}`, query: { name: res.name} }} className="items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-[#F99648] hover:bg-[#ecb97a] focus:ring-4 focus:outline-none">
                            View more
                        </Link>
                        <button className="p-2 rounded-md" onClick={() => handleComment(res.id)}> <AddCommentOutlinedIcon style={{fontSize: '26px'}} /> </button>
                    </div>
                </div>
            </div>

        )}
        </div>
    )
}

export default Recipes