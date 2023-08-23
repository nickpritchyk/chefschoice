'use client';

import Link from 'next/link';
import StarIcon from '@mui/icons-material/Star';

function Recipes({ recipes }) {

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center justify-items-center p-8"> 
        {recipes.map((res) => 

            <div key={res.recipeid} className="w-[21rem] xl:w-[22rem] p-6 gap-8 hover:scale-[1.01]">
                <div className="w-full h-full bg-gray-300 hover:shadow-xl shadow-lg border-[0.5px] border-primary">
                    <div className="h-[15rem]">
                        <Link href={{ pathname: `/recipedeck/${res.recipeid}`, query: { name: res.name}} } className="w-full h-full">
                            <img className="object-cover h-full w-full" src={res.imgurl} alt='img' />
                        </Link>
                    </div>
                    <div className="h-[7rem] relative gap-4 bg-[rgb(255,140,52)] opacity-70 w-full">
                        <h1 className="text-lg font-extrabold tracking-tight p-2">{res.name}</h1>
                        <Link href={{ pathname: `/userprofile/${res.author}`, query: { name: res.userid}} }>
                            <h2 className="absolute top-6 text-lg text-white font-extrabold tracking-tight p-2"> by {res.author || ''}</h2>
                        </Link>
                        <div className="bottom-2 absolute flex gap-4 items-center w-full p-2">
                            <Link className="font-extrabold" href={{ pathname: `/recipedeck/${res.recipeid}`, query: { name: res.name}} }>
                                View More
                            </Link>
                            {res.date && 
                            <p className="absolute right-8 flex gap-4 text-black">
                                {(JSON.stringify(res.date)).slice(1, 11)}
                            </p>
                            }
                        </div>
                    </div>
                </div>
            </div>

        )}
        </div>
    )
}

export default Recipes