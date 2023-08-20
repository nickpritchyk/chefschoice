import SignupForm from '../components/SignupForm'
import { nerve } from '../fonts'


function page() {
  return (
    <div className='flex w-full h-full justify-center items-center bg-[url("./assets/cookingbg.png")] bg-cover flex-col'>
        <SignupForm></SignupForm>
    </div>
  )
}

export default page