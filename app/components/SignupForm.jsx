'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "@chimera-ui/components";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function SignupForm() {
  const Router = useRouter();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [securityQuestion, setSecurityQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)
    const res = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        securityQuestion,
        answer
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
    })
    const data = await res.json()
    if(res.status == 406) {
      setErr(data)
    } else {
      setIsLoading(false)
      toast(data, { hideProgressBar: true, autoClose: 3000, type: 'success' })
      Router.push('/auth/signIn')
    }
  }

  return (
      <div className="w-[85%] sm:w-auto h-auto p-12 bg-white shadow-lg rounded-md">
        <div className="w-full max-w-xs">
          <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" type="username">
                Username
              </label>
              <input maxLength={45} className="border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight" id="username" type="text" placeholder="Enter a username" onChange={(e) => setUsername((e.target.value).toLowerCase())} required></input>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" type="password">
                Password
              </label>
              <input maxLength={45} className="border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight" id="password" type="password" placeholder="Enter a password" onChange={(e) => setPassword(e.target.value)} required></input>
            </div>
            <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-4" type="password">
                Answer security question
              </label>
              <div className="w-[13rem]">
                  <FormControl variant='filled' fullWidth>
                    <InputLabel> Security Question </InputLabel>
                    <Select
                      value={securityQuestion}
                      onChange={(e) => setSecurityQuestion(e.target.value)}
                    >
                      <MenuItem value={1}> What is your favorite ingredient to cook with? </MenuItem>
                      <MenuItem value={2}> What was the name of your first pet? </MenuItem>
                      <MenuItem value={3}> What city were you born in? </MenuItem>
                    </Select>
                  </FormControl>
                  {securityQuestion && 
                    <input maxlength='45' className="mt-4 border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight" placeholder="Enter answer" onChange={(e) => setAnswer(e.target.value)} required></input>
                  }
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Button className="text-white font-bold px-4 rounded" type="submit">
                Sign Up
              </Button>
              {isLoading &&
                <p> ... </p>
              }
              {err && <p className="mt-4 text-red-400">{err}</p> }
            </div>
          </form>
        </div>
      </div>
  )
}

export default SignupForm