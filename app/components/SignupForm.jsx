'use client';

import { useState } from "react";

function SignupForm() {
  const [username, SetUsername] = useState('')
  const [password, SetPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
    }).then((res) => {
          setIsLoading(false)
        }  
      )
      }

  return (
      <div className="w-auto h-auto p-12 bg-white shadow-lg rounded-md">
        <div className="w-full max-w-xs">
          <form className="px-8 pt-6 pb-8 mb-4">
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
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={handleSubmit}>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}

export default SignupForm