'use client';

import React, { useState } from 'react'
import Link from 'next/link'
import CloseIcon from '@mui/icons-material/Close'
import TableRowsIcon from '@mui/icons-material/TableRows'
import headerlogo from '../assets/headerlogo.png'
import Image from 'next/image'

function Navbar() {

  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className='w-full h-20 shadow-md fixed top-0 bg-white z-20'>
        <nav className='flex h-full items-center ml-8 text-xl'>
          <Link className='left-3 text-3xl font-bold' href='/'> <Image src={headerlogo} width={250} height={250}></Image></Link>
          <ul className='hidden lg:flex gap-x-8 absolute right-16'>
            <Link className='hover:text-gray-600' href='/'> Recipes </Link>
            <Link className='hover:text-gray-600' href='/'> Favorites </Link>
            <Link className='hover:text-gray-600' href='/book'> Recipe Book </Link>
            <Link className='hover:text-gray-600' href='/about'> About </Link>
          </ul>
          <TableRowsIcon className='lg:invisible fixed right-4 mx-8 hover:animate-pulse hover:text-gray-600 cursor-pointer' onClick={() => setIsOpen((prev) => (!prev))}> x </TableRowsIcon>
        </nav>
        {isOpen &&
          <nav className='lg:hidden h-64 shadow-xl'>
            <ul className='bg-white shadow-md flex flex-col h-full justify-evenly pl-4 text-2xl'>
              <CloseIcon className='gap-y-8 right-0 left-0 hover:animate-pulse hover:text-gray-600 cursor-pointer' onClick={() => setIsOpen((prev) => (!prev))}> x </CloseIcon>
              <Link className='hover:text-gray-600' href='/'> Recipes </Link>
              <Link className='hover:text-gray-600' href='/'> Favorites </Link>
              <Link className='hover:text-gray-600' href='/book'> Recipe Book </Link>
              <Link className='hover:text-gray-600' href='/about'> About </Link>
            </ul>
          </nav>
        }
    </div>
  )
}

export default Navbar