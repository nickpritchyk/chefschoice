'use client';

import React from 'react'
import Link from 'next/link'
import { Button } from '@chimera-ui/components'
import { useStoreContext } from '../Context/store'

function ButtonGroup() {
  const { bookSection, setBookSection } = useStoreContext();

  return (
    <div className='flex w-full sm:ml-24 items-center flex-col space-y-4 py-2 sm:w-full sm:space-x-12 sm:flex-row sm:space-y-0'>
        <Button onClick={() => {setBookSection((prev) => !prev)} }>
            Add Recipe
        </Button>
        <Button>
            <Link href='/book/'> Delete Recipe </Link>
        </Button>
    </div>
  )
}

export default ButtonGroup