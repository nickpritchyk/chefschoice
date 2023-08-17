'use client';

import Link from "next/link"
import StarIcon from '@mui/icons-material/Star';


function Favorites({ recipes }) {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center justify-items-center p-8'>
            <h1 className="absolute text-3xl border-b-primary border-2 border-x-0 border-t-0"> Favorites </h1>
            {recipes.length > 0 ?
            
                recipes.map((res) => 
                    
                    <div key={res.recipeid} className="w-[21rem] xl:w-[22rem] p-6 gap-8 hover:scale-[1.01] mt-12">
                        <div className="w-full h-full bg-gray-300 hover:shadow-xl shadow-lg border-[0.5px] border-primary">
                            <Link href={{ pathname: `/recipedeck/${res.recipebook.recipeid}`, query: { name: res.recipebook.name}} } className="w-full">
                                <img className="h-[15rem] w-full" src={res.recipebook.imgurl} alt='img' />
                            </Link>
                            <div className="h-[7rem] relative gap-4 bg-white opacity-70 w-full">
                                <h5 className="absolute text-lg font-extrabold tracking-tight p-2">{res.recipebook.name}</h5>
                                <div className="bottom-2 absolute flex gap-4 items-center w-full p-2">
                                    <Link className="font-extrabold" href={{ pathname: `/recipedeck/${res.recipebook.recipeid}`, query: { name: res.recipebook.name}} }>
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
                )
                :
                <p className="absolute mt-32 text-2xl"> You have no favorites </p>
            }
        </div>
    )
}

export default Favorites