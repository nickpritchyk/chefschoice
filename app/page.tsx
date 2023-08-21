'use client';

import { Button } from "@chimera-ui/components";
import Link from "next/link.js";


export default function Home() {

  return (
    <div className='flex flex-col h-full w-full bg-center bg-[url("assets/header1.png")] bg-cover'>
      <div className='flex flex-col text-center p-2 items-center justify-center h-full w-full gap-4'>
        <h1 className='flex text-4xl lg:text-5xl text-white w-fit border-b-4 border-primary p-2'>
          Find and post your favorite recipes
        </h1>
        <h1 className='text-5xl lg:text-6xl text-white mb-12 border-b-4 border-primary w-fit p-2'> at Chefs Choice </h1>
        <Link href='/signup'>
          <Button> Sign up here </Button>
        </Link>
        <Link href='/recipedeck'>
          <Button> Search recipes </Button>
        </Link>
      </div>
    </div>
  )
}