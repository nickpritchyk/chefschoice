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
  const [profileIsOpen, setProfileIsOpen] = useState(false)
  
  return (
    <div className='w-full h-20 shadow-md fixed top-0 bg-white z-10'>
        <nav className='flex h-full items-center ml-8 text-xl'>
          <Link className='left-3 text-4xl text-[#F99648]' href='/'> <h1 className={nerve.className}> ChefsChoice </h1></Link>
          <ul className='hidden lg:flex gap-x-8 absolute right-16'>
            <Link className='navlinks' href='/'> Favorites </Link>
            <Link className='navlinks' href='/book'> Recipe Book </Link>
            <Link className='navlinks' href='/recipedeck'> Recipes </Link>
            <Link className='navlinks' href='/about'> About </Link>
            {session?.data 
              ? <div className='flex flex-col'>
                  <button className='text-[rgb(255,143,58)] hover:animate-pulse' type='button' onClick={() => setProfileIsOpen(prev => !prev)}> {session.data?.user.name} </button>
                  {profileIsOpen && 
                    <div className='flex flex-col w-fit bg-white shadow-lg p-4 items-start gap-4 border-[1px] rounded-md border-[rgb(255,143,58)] absolute right-0 top-20'>
                      <CloseIcon className='hover:animate-pulse hover:text-gray-600 cursor-pointer' onClick={() => setProfileIsOpen((prev) => (!prev))}> x </CloseIcon>
                      <Link className='navlinks' href='/myrecipes'> My Recipes </Link>
                      <button className='navlinks' onClick={() => signOut()}> Sign out </button>
                    </div>
                  }   
                </div>
              : <button className='navlinks' type='button' onClick={() => signIn()}> Sign in </button>
            }
          </ul>
          <TableRowsIcon className='lg:invisible fixed right-4 mx-8 hover:animate-pulse hover:text-gray-600 cursor-pointer' onClick={() => setIsOpen((prev) => (!prev))}> x </TableRowsIcon>
        </nav>

          <nav className={isOpen ? 'bg-white flex w-full h-[50vh] shadow-md lg:invisible transition-all duration-300 ease-in-out': 'h-[50vh] w-full invisible transition-all duration-300 ease-in-out'}>
            <ul className='flex flex-col h-full w-full justify-evenly pl-4 text-2xl gap-4'>
              <CloseIcon className='gap-y-8 right-0 left-0 hover:animate-pulse hover:text-gray-600 cursor-pointer' onClick={() => setIsOpen((prev) => (!prev))}> x </CloseIcon>
              <Link className='navlinks' href='/'> Favorites </Link>
              <Link className='navlinks' href='/book'> Recipe Book </Link>
              <Link className='navlinks' href='/recipedeck'> Recipes </Link>
              <Link className='navlinks' href='/about'> About </Link>
              {session?.data 
              ? <button className='flex text-[rgb(255,143,58)]' type='button' onClick={() => setProfileIsOpen(prev => !prev)}> {session.data?.user.name} </button>
              : <button className='flex hover:text-[#F99648]' type='button' onClick={() => signIn()}> Sign in </button>
              }
            </ul>
          </nav>
        
    </div>
  )
}

export default Navbar