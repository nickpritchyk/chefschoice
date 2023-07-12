'use client';

import React from 'react'
import ButtonGroup from '../components/ButtonGroup'
import AddRecipe from '../components/AddRecipe'
import { useStoreContext } from '../Context/store'


function page() {
  const { bookSection } = useStoreContext();

  return (
    <div className='flex items-center flex-col'>
        <ButtonGroup></ButtonGroup>
        {bookSection && 
          <AddRecipe></AddRecipe>
        }
    </div>
  )
}

export default page