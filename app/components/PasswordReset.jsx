'use client';

import { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from "@chimera-ui/components";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


function PasswordReset() {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [securityQuestion, setSecurityQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [openReset, setOpenReset] = useState(false)
    const [err, setErr] = useState()
    const [newPassword, setNewPassword] = useState('')
    const [newPassword1, setNewPassword1] = useState('')

    async function handleReset(e) {
        e.preventDefault()
        if(newPassword != newPassword1) {
            setErr('Passwords dont match')
            return
        }
        const res = await fetch('/api/passwordreset/newpassword', {
            method: 'POST',
            body: JSON.stringify({
                username,
                newPassword
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            })
    
            if(!res.ok) {
                throw new error("ERROR on password reset!")
            } else {
                toast('Password reset', { hideProgressBar: true, autoClose: 3000, type: 'success' })
                router.push('/auth/signIn')
            }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const res = await fetch('/api/passwordreset', {
        method: 'POST',
        body: JSON.stringify({
            username,
            securityQuestion,
            answer
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        })

        if(res.status == 401) {
            setErr('Incorrect information')
        } else {
            setOpenReset(true)
        }
    }

  return (
    <div className="w-[85%] sm:w-auto h-auto p-12 bg-white shadow-lg rounded-md">
        <div className="w-full max-w-xs flex flex-col justify-center items-center">
            <h1 className="text-2xl mb-4"> Reset Password </h1>
            {!openReset && 
            <form className="mb-6 flex flex-col items-center">
                <label className="block text-gray-700 text-lg font-bold mb-4" type="username">
                    Enter your username
                </label>
                <input className="border-2 rounded h-[2rem] text-lg w-[13rem] py-2 px-3 text-gray-700 leading-tight" id="username" type="text" placeholder="Username" onChange={(e) => setUsername((e.target.value).toLowerCase())} required></input>
                <div className="w-[13rem] mt-8 flex flex-col items-center">
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
                    <input maxLength='45' className="border-2 rounded h-[2rem] text-lg w-[13rem] py-2 px-3 text-gray-700 leading-tight mt-6" placeholder="Enter answer" onChange={(e) => setAnswer(e.target.value)} required></input>
                  }
              </div>
                {answer &&
                <Button onClick={handleSubmit} className="text-white font-bold px-4 rounded mt-6">
                    Next
                </Button>
                }
                {err && <p className="mt-4 text-sm text-red-400">{err}</p> }
            </form>
            }
            {openReset &&
                <div className="flex flex-col justify-center items-center gap-4"> 
                    <label className="block text-gray-700 text-lg font-bold mb-4" type="password">
                        Enter a new password
                    </label>
                    <input maxLength={45} className="border-2 rounded h-[2rem] text-lg w-[13rem] py-2 px-3 text-gray-700 leading-tight" id="password" type="password" placeholder="New password" onChange={(e) => setNewPassword(e.target.value)} required></input>
                    <input maxLength={45} className="border-2 rounded h-[2rem] text-lg w-[13rem] py-2 px-3 text-gray-700 leading-tight" id="password" type="password" placeholder="New password" onChange={(e) => setNewPassword1(e.target.value)} required></input>
                    {newPassword && 
                    <Button onClick={handleReset} className="text-white font-bold px-4 rounded mt-6">
                        Next
                    </Button>
                    }
                    {err && <p className="mt-4 text-sm text-red-400">{err}</p> }
                </div>
            }
        </div>
    </div>
  )
}

export default PasswordReset