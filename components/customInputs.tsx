import React from 'react'


function LoginInput({ placeholder, type, label }: string | any) {
    return (
        <>
            <div className='relative dark:bg-black bg-indigo-500'>
                <label className='dark:bg-black bg-indigo-500 text-white absolute text-lg text-bold inline-block pl-2 pr-2 ml-2 mb-2' style={{ zIndex: 1, top: -15 }} htmlFor={placeholder}>{label}</label>
                <div className='dark:bg-black bg-indigo-500 w-full h-2 absolute left-0 bottom-0' style={{ zIndex: -1 }}></div>
                <input autoComplete='new-password' type={type} name={placeholder} placeholder={placeholder} className="rounded-md p-3 text-lg dark:bg-black bg-indigo-500 text-white border-2 border-white transition-all duration-200 outline-none focus:-translate-y-1.5" />
            </div>
        </>
    )
}
function PasswordInput({ placeholder }: string | any) {
    const [passwordType, setPasswordType] = React.useState("password");
    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }
    return (
        <>
            <div className='relative dark:bg-black bg-indigo-500 flex flex-col'>
                <label className='dark:bg-black bg-indigo-500 text-white absolute text-lg text-bold inline-block pl-2 pr-2 ml-2 mb-2' style={{ zIndex: 1, top: -15 }} htmlFor={placeholder}>{placeholder}</label>
                <div className='dark:bg-black bg-indigo-500 w-full h-2 absolute left-0 bottom-0' style={{ zIndex: -1 }}></div>
                <input autoComplete='new-password' type={passwordType} name={placeholder} placeholder={placeholder} className="rounded-md p-3 text-lg dark:bg-black bg-indigo-500 text-white border-2 border-white transition-all duration-200 outline-none focus:-translate-y-1.5" />
                <button type="button" className="text-white dark:bg-black bg-indigo-500 border-2 border-white rounded-md max-w-max p-2 m-2 hover:bg-white hover:text-black transition-all duration-150 ease-in" onClick={togglePassword}>
                    {passwordType == "text" ? "Hide" : "Show"} password
                </button>
            </div>
        </>
    )
}
export {
    LoginInput,
    PasswordInput
}