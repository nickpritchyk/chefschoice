'use client';

import React from 'react'
import Link from 'next/link'
import { Button } from '@chimera-ui/components'
import { useStoreContext } from '../Context/store'
import { useSession, signIn } from 'next-auth/react';

function ButtonGroup() {
  const { setBookSection } = useStoreContext();
  const session = useSession()
  
  function handleClick() {
    if(!session?.data) {
      signIn()
    } else {
      setBookSection((prev) => !prev)
    }
  }

  return (
    <div className='flex w-full sm:ml-24 items-center flex-col space-y-4 py-2 sm:w-full sm:space-x-12 sm:flex-row sm:space-y-0'>
        <Button onClick={() => {handleClick()}}>
            Add Recipe
        </Button>
        <Button>
            <Link href='/updaterecipe'> Edit Recipe </Link>
        </Button>
    </div>
  )
}

export default ButtonGroup