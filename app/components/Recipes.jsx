'use client';

import Link from 'next/link';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import StarIcon from '@mui/icons-material/Star';


function Recipes({ recipes }) {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center justify-items-center p-8"> 
        {recipes.map((res, key) => 
            
            <div key={res.id} className="w-[21rem] xl:w-[22rem] p-6 gap-8 hover:scale-[1.01]">
                <div className="w-full h-full bg-gray-300 rounded-md hover:shadow-xl shadow-lg">
                    <Link href={{ pathname: `/recipedeck/${res.id}`, query: { name: res.name}} } className="w-full">
                        <img className="h-[15rem] w-full" src={res.imgurl} alt='img' />
                    </Link>
                    <div className="h-[7rem] relative gap-4 bg-[rgb(255,140,52)] opacity-70 w-full">
                        <h5 className="absolute text-lg font-extrabold tracking-tight p-2">{res.name}</h5>
                        <div className="bottom-2 absolute flex gap-4 items-center w-full p-2">
                            <button className="p-2 rounded-md" onClick={() => handleComment(res.id)}> <AddCommentOutlinedIcon style={{fontSize: '26px'}} /> </button>
                            <Link className="font-extrabold" href={{ pathname: `/recipedeck/${res.id}`, query: { name: res.name}} }>
                                View More
                            </Link>
                            <i className="absolute right-8 flex gap-4">
                                <p> 4/5 </p>
                                <StarIcon />
                            </i>
                        </div>
                    </div>
                </div>
            </div>

        )}
        </div>
    )
}

export default Recipes