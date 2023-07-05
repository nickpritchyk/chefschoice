'use client';

import React from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import { TextField } from '@mui/material'


export default function 
() {
  return (
    <div className='w-[50%] h-fit mt-24'>
        <h1 className='text-[52px] text-white'> Chefs Choice </h1>
        <Autocomplete style={{backgroundColor: 'white'}} options={['emptyArr']} renderInput={(params) => <TextField {...params} label="Find recipes.." variant="filled" />} />
    </div>
  )
}
