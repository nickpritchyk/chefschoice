import PasswordReset from '../components/PasswordReset'

function passwordreset() {

    return (
        <div className='flex w-full h-full justify-center items-center bg-[url("./assets/cookingbg.png")] bg-cover flex-col'>
            <div className='text-5xl flex mb-6'>
                <PasswordReset />
            </div>
        </div>
    )
}

export default passwordreset