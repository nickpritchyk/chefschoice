'use client';

import React, { useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import { TextField } from '@mui/material'


export default function Searchbar({ recipes }) {
  const [searchInput, setSearchInput] = useState('')

  return (
    <div className='w-[50%] h-fit mt-24'>
        <h1 className='text-[52px] text-white'> Discover Recipes </h1>
        <Autocomplete onInputChange={(e) => setSearchInput(e.target.value)} style={{backgroundColor: 'white'}} options={['emptyArr']} renderInput={(params) => <TextField {...params} label="Find recipes.." variant="filled" />} />
    </div>
  )
}
