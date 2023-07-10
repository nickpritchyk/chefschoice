'use client';

import React from 'react'
import ButtonGroup from '../components/ButtonGroup'
import AddRecipe from '../components/AddRecipe'
import { useStoreContext } from '../Context/store'


function page() {
  const { bookSection } = useStoreContext();

  return (
    <div className='flex h-full w-full items-center flex-col top-0'>
        <ButtonGroup></ButtonGroup>
        {bookSection && 
          <AddRecipe></AddRecipe>
        }
    </div>
  )
}

export default page