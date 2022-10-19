import React from 'react'
import { LoginInput, PasswordInput } from '../customInputs'
import { Loader } from '../loader'


function LoginForm({ signUpButtonStatus, formStatus }: any) {
    console.log(signUpButtonStatus)
    console.log(formStatus)
    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <h1 className='text-4xl text-white'>Login</h1>
                <div className='m-4'></div>
                <LoginInput placeholder="Email" type="email" label="Email" />
                <div className='m-4'></div>
                <PasswordInput placeholder="Password" />
                <div className='m-1'></div>
                <button type="submit" className={'p-2 rounded-sm text-lg dark:hover:bg-black hover:bg-indigo-500 hover:text-white border-2 border-white transition-all duration-200 text-black bg-white'}>
                    {signUpButtonStatus ?
                        <Loader /> :
                        'Login'
                    }
                </button>
                <div className='m-1'></div>
                <p className='text-white'>Don't have an account? <a href="/auth/sign-up" className='underline'>Sign Up</a></p>
            </div>
        </>
    )
}

function SignUpForm() {
    return (
        <h1>HEY</h1>
    )
}

export {
    LoginForm,
    SignUpForm
}