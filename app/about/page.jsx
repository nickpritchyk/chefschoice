'use client';

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailIcon from '@mui/icons-material/Mail';

function About() {
  return (
    <div className='w-full flex flex-col items-center mt-24 text-center'>
      <div className='w-[50%] flex flex-col gap-12 place-items-center shadow-xl p-12 rounded-md border-primary border-[0.5px]'>
        <h1 className='text-4xl border-b-2 p-2 border-primary'> Chefs Choice </h1>
        <h3 className='text-3xl'> made by Nicholas Pritchyk </h3>
        <div className='flex gap-6'>
          <a href='https://github.com/nickpritchyk' className='hover:scale-[1.10]'>
            <GitHubIcon style={{fontSize: '36px'}} />
          </a>
          <a href='https://www.linkedin.com/in/nick-pritchyk-843677197/' className='hover:scale-[1.10]'>
            <LinkedInIcon style={{fontSize: '36px'}} />
          </a>
        </div>
        <div className='flex flex-col gap-2'>
          <p> Questions? Contact Me </p>
          <a href = "mailto: nickpritchyk20@gmail.com" className='hover:scale-[1.10] mt-4 animate-bounce'>
              <MailIcon style={{fontSize: '36px'}} />
          </a>
        </div>
        <div className='flex flex-col gap-4 mt-4'>
          <h2 className='text-xl'>
            How was this site built?
          </h2>
          <ul className='flex gap-6 p-2 select-none'>
            <li className='bg-primary p-2 rounded-md text-white'> NextJS 13 </li>
            <li className='bg-primary p-2 rounded-md text-white'> TailwindCSS </li>
            <li className='bg-primary p-2 rounded-md text-white'> MySQL + Prisma </li>
          </ul>
        </div>
        <p className=' text-lg italic'> Front-end hosted on Vercel, back-end on Microsoft Azure </p>
      </div>
    </div>
  )
}

export default About