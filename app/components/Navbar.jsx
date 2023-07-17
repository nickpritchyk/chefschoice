'use client';

import React, { useState } from 'react'
import Link from 'next/link'
import CloseIcon from '@mui/icons-material/Close'
import TableRowsIcon from '@mui/icons-material/TableRows'
import { nerve } from '../fonts'
import { useSession, signIn, signOut } from 'next-auth/react';


function Navbar() {

  const session = useSession()

  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className='w-full h-20 shadow-md fixed top-0 bg-white z-20'>
        <nav className='flex h-full items-center ml-8 text-xl'>
          <Link className='left-3 text-4xl text-[#F99648]' href='/'> <h1 className={nerve.className}> ChefsChoice </h1></Link>
          <ul className='hidden lg:flex gap-x-8 absolute right-16'>
            <Link className='navlinks' href='/'> Favorites </Link>
            <Link className='navlinks' href='/book'> Recipe Book </Link>
            <Link className='navlinks' href='/about'> About </Link>
            {session?.data 
              ? <button type='button' onClick={() => signOut()}> {session.data?.user.name} </button>
              : <button type='button' onClick={() => signIn()}> Sign in </button>
            }
          </ul>
          <TableRowsIcon className='lg:invisible fixed right-4 mx-8 hover:animate-pulse hover:text-gray-600 cursor-pointer' onClick={() => setIsOpen((prev) => (!prev))}> x </TableRowsIcon>
        </nav>
        {isOpen &&
          <nav className='lg:hidden h-64 shadow-xl'>
            <ul className='bg-white shadow-md flex flex-col h-full justify-evenly pl-4 text-2xl'>
              <CloseIcon className='gap-y-8 right-0 left-0 hover:animate-pulse hover:text-gray-600 cursor-pointer' onClick={() => setIsOpen((prev) => (!prev))}> x </CloseIcon>
              <Link className='navlinks' href='/'> Favorites </Link>
              <Link className='navlinks' href='/book'> Recipe Book </Link>
              <Link className='navlinks' href='/about'> About </Link>
            </ul>
          </nav>
        }
    </div>
  )
}

export default Navbar