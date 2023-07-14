'use client';

import React from 'react'
import ButtonGroup from '../components/ButtonGroup'
import AddRecipe from '../components/AddRecipe'
import { useStoreContext } from '../Context/store'


function page() {
  const { bookSection } = useStoreContext();
  console.log(bookSection)

  return (
    <div className='flex items-center flex-col mt-8'>
        <ButtonGroup></ButtonGroup>
        {bookSection &&
          <AddRecipe></AddRecipe>
        }
    </div>
  )
}

export default page