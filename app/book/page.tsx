'use client';

import React from 'react'
import ButtonGroup from '../components/ButtonGroup'
import AddRecipe from '../components/AddRecipe'
import { useStoreContext } from '../Context/store'
import stockimg from '../assets/pastastock.jpeg'
import Image from 'next/image'
import { Button } from '@chimera-ui/components';
import Link from 'next/link';


function page() {
  const { bookSection } = useStoreContext();

  return (
    <div className='flex items-center flex-col h-full relative'>
      <div className='relative flex w-full h-full'>
        <Image className='w-full min-w-fit' src={stockimg} alt='pasta background image'/>
        <div className='absolute flex flex-col justify-center items-center w-full h-full gap-6 sm:flex-row'>
          <Link href='/addrecipe'>
            <Button> Post a recipe </Button> 
          </Link>
          <p className='font-extrabold text-xl text-white'> or </p>
          <Link href=''>
            <Button> Search recipes </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default page