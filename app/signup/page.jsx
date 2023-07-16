import SignupForm from '../components/SignupForm'
import { nerve } from '../fonts'


function page() {
  return (
    <div className='flex w-full h-full justify-center items-center bg-[url("./assets/cookingbg.png")] bg-cover flex-col'>
        <div className='text-5xl absolute top-[25%]'>
          <h1 className={nerve.className}> SIGN UP </h1>
        </div>
        <SignupForm></SignupForm>
    </div>
  )
}

export default page