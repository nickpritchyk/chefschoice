'use client';

import React, { useState } from 'react'
import Link from 'next/link'
import CloseIcon from '@mui/icons-material/Close'
import TableRowsIcon from '@mui/icons-material/TableRows'

function Navbar() {

  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className='w-full h-20 border-b-2 fixed top-0 bg-white z-20'>
        <nav className='flex h-full items-center ml-8 text-xl justify-between'>
          <Link className='left-3 text-3xl font-bold' href='/'> Home </Link>
          <ul className='hidden sm:flex gap-x-8 mr-16'>
            <Link className='hover:text-gray-600' href='/'> Recipes </Link>
            <Link className='hover:text-gray-600' href='/'> Favorites </Link>
            <Link className='hover:text-gray-600' href='/book'> Recipe Book </Link>
            <Link className='hover:text-gray-600' href='/'> About </Link>
          </ul>
          <TableRowsIcon className='sm:hidden right-0 mx-8 hover:animate-pulse hover:text-gray-600 cursor-pointer' onClick={() => setIsOpen((prev) => (!prev))}> x </TableRowsIcon>
        </nav>
        {isOpen &&
          <nav className='h-64 shadow-xl'>
            <ul className='bg-slate-200 flex flex-col h-full justify-evenly pl-4 text-2xl'>
              <CloseIcon className='sm:hidden gap-y-8 right-0 left-0 hover:animate-pulse hover:text-gray-600 cursor-pointer' onClick={() => setIsOpen(false)}> x </CloseIcon>
              <Link className='hover:text-gray-600' href='/'> Recipes </Link>
              <Link className='hover:text-gray-600' href='/'> Favorites </Link>
              <Link className='hover:text-gray-600' href='/book'> Recipe Book </Link>
              <Link className='hover:text-gray-600' href='/'> About </Link>
            </ul>
          </nav>
        }
    </div>
  )
}

export default Navbar