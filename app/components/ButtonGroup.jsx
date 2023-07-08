'use client';

import React from 'react'
import Link from 'next/link'
import { Button } from '@chimera-ui/components'

function ButtonGroup() {
  return (
    <div className='flex w-full justify-center items-center flex-col space-y-4 border-b-2 py-2 sm:w-full sm:space-x-12 sm:flex-row sm:space-y-0'>
        <Button>
            <Link href='/book/create-recipe'> Add Recipe </Link>
        </Button>
        <Button>
            <Link href='/book/'> Filter Recipes </Link>
        </Button>
    </div>
  )
}

export default ButtonGroup