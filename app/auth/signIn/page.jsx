'use client';

import { useState } from "react";
import { nerve } from "@/app/fonts";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from '@chimera-ui/components'
import { useRouter } from "next/navigation";

function LoginPage() {
    
  const Router = useRouter();
  const [username, SetUsername] = useState('')
  const [password, SetPassword] = useState('')
  const [err, setErr] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function getSignIn(e) {
    if(username.length == 0) {
        return false
    }
    const res = await signIn('credentials', {
        username: username,
        password: password,
        redirect: false,
    })

    if(res.error) {
        return false
    }
    return res
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const res = await getSignIn()
    if(res) return Router.push('/')
    else setErr('No user found with that information.')
  }

  return (
      <div className="flex justify-center items-center w-full h-full p-12 bg-white shadow-lg rounded-md">
        <div className="w-full h-full flex items-center flex-col">
            <div className="text-5xl m-8">
                <h1 className={nerve.className}> Sign in </h1>
            </div>
            <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" type="username">
                        Username
                    </label>
                    <input className="border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight" id="username" type="text" placeholder="Enter a username" onChange={(e) => SetUsername(e.target.value)} required></input>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" type="password">
                        Password
                    </label>
                    <input className="border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight" id="password" type="password" placeholder="Enter a password" onChange={(e) => SetPassword(e.target.value)} required></input>
                </div>
                <div className="flex items-center justify-center">
                    <Button type='submit' className="font-bold py-2 px-4 rounded">
                        Sign in
                    </Button>
                </div>
                {err && <p className="text-sm mt-4 text-[red]">{err}</p>}
                <div className="flex mt-4 text-sm text-[#0000EE] flex-col items-center">
                    <Link className='hover:underline' href='/signup'>
                        Don't have an account? Sign up here.
                    </Link>
                    <Link className='mt-2 hover:underline' href='/'>
                        Forgot your password?
                    </Link>
                </div>
            </form>
        </div>
      </div>
  )
}

export default LoginPage