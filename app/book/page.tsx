'use client';

import React from 'react'
import Button from '@mui/material/Button'
import Link from 'next/link'

function page() {
  return (
    <div className='h-full w-full'>
        <h1> Recipe Book </h1>
        <Button variant="outlined">
          <Link href='/book/create-recipe'> Add Recipe </Link>
        </Button>
    </div>
  )
}

export default page