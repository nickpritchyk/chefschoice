'use client';

import React from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import { TextField } from '@mui/material'


export default function 
() {
  return (
    <div className='w-[50%]'>
        <Autocomplete  style={{backgroundColor: 'white'}} options={['beef']} renderInput={(params) => <TextField {...params} label="recipeSearch" />} />
    </div>
  )
}
