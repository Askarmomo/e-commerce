
import { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../store/auth.store'
import toast from 'react-hot-toast'


const LogInPage = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { login, loading } = useAuthStore()

    const loginFunc = async () => {
        if (email && password) {
            await login(email, password)

        } else {
            toast.error('fill all the field')
        }
    }

    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className=' pt-16 sm:pt-0 mx-5 sm:mx-0 sm:w-[1366px]'>
            <h1 className=" font-bold text-3xl text-center pt-10">LogIn</h1>

            <div className=" max-w-xl mx-auto mt-10 space-y-6 bg-white shadow-lg p-4 pt-5 rounded">

                <label className=" bg-slate-200 p-2 rounded flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className=" bg-transparent w-full outline-none " placeholder="Email" />
                </label>

                <label className=" bg-slate-200 p-2 rounded flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                    </svg>
                    <div className=" relative w-full">
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type={`${showPassword ? "text" : "password"}`} className=" bg-transparent w-full outline-none placeholder:text-slate-800" placeholder="* * * * * * * *" />
                        {
                            showPassword ?
                                <svg onClick={() => setShowPassword(false)} className=" absolute top-0 right-0 hover:stroke-slate-300 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g fill="none" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M2.55 13.406c-.272-.373-.408-.56-.502-.92a2.5 2.5 0 0 1 0-.971c.094-.361.23-.548.502-.92C4.039 8.55 7.303 5 12 5s7.961 3.55 9.45 5.594c.272.373.408.56.502.92a2.5 2.5 0 0 1 0 .971c-.094.361-.23.548-.502.92C19.961 15.45 16.697 19 12 19s-7.961-3.55-9.45-5.594"></path><path d="M12 14a2 2 0 1 0 0-4a2 2 0 0 0 0 4"></path></g></svg>
                                :
                                <svg onClick={() => setShowPassword(true)} className=" absolute top-0 right-0 hover:stroke-slate-300 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g fill="none" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M2.55 13.406c-.272-.373-.408-.56-.502-.92a2.5 2.5 0 0 1 0-.971c.094-.361.23-.548.502-.92C4.039 8.55 7.303 5 12 5s7.961 3.55 9.45 5.594c.272.373.408.56.502.92a2.5 2.5 0 0 1 0 .971c-.094.361-.23.548-.502.92C19.961 15.45 16.697 19 12 19s-7.961-3.55-9.45-5.594"></path><path d="M12 14a2 2 0 1 0 0-4a2 2 0 0 0 0 4m9-11L3 21"></path></g></svg>
                        }
                    </div>
                </label>

                <div onClick={loginFunc} className={` ${loading ? "p-1" : 'p-2'} rounded bg-teal-400 hover:bg-teal-500 font-semibold w-full text-center`}>
                    <button>
                        {loading ? <svg className=' fill-white h-5 w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="2" r="0"><animate attributeName="r" begin="0" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx="12" cy="2" r="0" transform="rotate(45 12 12)"><animate attributeName="r" begin="0.125s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx="12" cy="2" r="0" transform="rotate(90 12 12)"><animate attributeName="r" begin="0.25s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx="12" cy="2" r="0" transform="rotate(135 12 12)"><animate attributeName="r" begin="0.375s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx="12" cy="2" r="0" transform="rotate(180 12 12)"><animate attributeName="r" begin="0.5s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx="12" cy="2" r="0" transform="rotate(225 12 12)"><animate attributeName="r" begin="0.625s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx="12" cy="2" r="0" transform="rotate(270 12 12)"><animate attributeName="r" begin="0.75s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx="12" cy="2" r="0" transform="rotate(315 12 12)"><animate attributeName="r" begin="0.875s" calcMode="spline" dur="1s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle></svg> : <span>LogIn</span>}
                    </button>
                </div>

                <div className=" pt-1">
                    <p>If you have&apos;t an acount ? <Link to={'/singup'} className=" font-bold underline text-cyan-600">
                        <span>SingUp</span>
                    </Link></p>
                </div>
            </div>
        </div >
    )
}

export default LogInPage