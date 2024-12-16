import PropTypes from "prop-types"
import { useState } from "react"
import useAuthStore from "../store/auth.store"
import toast from "react-hot-toast"
import { motion } from "framer-motion"

const AccountDetailes = () => {

    const [showPassword, setShowPassword] = useState(true)
    const [loading, setLoading] = useState(false)

    // updateProfile
    const { user, updateProfile } = useAuthStore()
    const initialData = {
        username: user.username,
        email: user.email,
        newPassword: user.password,
        profilePic: user.profilePic,

    }
    const [update, setUpdate] = useState(initialData || {
        username: "",
        email: "",
        newPassword: "",
        confirmPassword: "",
        profilePic: "",
        currentPassword: ""
    })

    const handleImage = (file) => {

        if (file.type.startsWith("image/")) {
            const reader = new FileReader()
            reader.onloadend = (e) => {
                setUpdate({ ...update, profilePic: e.target.result })

            }

            reader.readAsDataURL(file)
        }

    }

    const handleUpdateProfile = async () => {
        setLoading(true)

        if (update.newPassword !== update.confirmPassword) {
            toast.error("new password and confirm password not matched")
        }

        if (update.email && update.newPassword && update.username && update.newPassword) {

            await updateProfile({
                profilePic: update.profilePic,
                username: update.username,
                email: update.email,
                currentPassword: update.currentPassword,
                newPassword: update.newPassword
            })
        } else {
            toast.error('Fill all the field')
        }

        setLoading(false)

    }

    return (
        <div className=" p-10 sm:p-0 text-xs sm:text-base sm:mr-[250px]">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
            >

                <div className=" sm:flex bg-white shadow-xl rounded p-4 sm:space-x-10"> {/* i will modifie from div to form */}

                    <div className=" relative pb-4 sm:pb-0 border-b sm:border-none">
                        <div className=" relative">
                            <img className=" sm:w-[300px] w-[150px] sm:h-[200px] h-[150px] mx-auto sm:mx-0 object-cover rounded-full" src={update.profilePic} alt={update.username} />
                            <div>
                                <label htmlFor="image"><svg className=" absolute sm:right-[80px] right-[122px] sm:top-[180px] top-[135px] fill-teal-500 bg-teal-100 rounded-full p-1 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="0 0 24 24"><path d="M19 7V5h-2V3h2V1h2v2h2v2h-2v2zm-8 10.5q1.875 0 3.188-1.312T15.5 13t-1.312-3.187T11 8.5T7.813 9.813T6.5 13t1.313 3.188T11 17.5m0-2q-1.05 0-1.775-.725T8.5 13t.725-1.775T11 10.5t1.775.725T13.5 13t-.725 1.775T11 15.5M3 21q-.825 0-1.412-.587T1 19V7q0-.825.588-1.412T3 5h3.15L8 3h7v4h2v2h4v10q0 .825-.587 1.413T19 21z"></path></svg></label>
                            </div>
                        </div>
                        <input onChange={(e) => handleImage(e.target.files[0])} className=" hidden" type="file" id="image" />
                    </div>

                    <div className=" sm:space-y-7 space-y-3 pt-4 w-full  rounded">
                        <div className=" sm:flex space-y-2 sm:justify-between ">
                            <div>
                                <div className=" mb-2"> <label className=" font-bold text-slate-500" htmlFor="username">Username <span>*</span></label></div>
                                <input onChange={(e) => setUpdate({ ...update, username: e.target.value })} className=" p-2 rounded bg-slate-200 outline-none w-full " type="text" value={update.username} placeholder=" New Username" />
                            </div>
                            <div>
                                <div className=" mb-2"> <label className=" font-bold text-slate-500" htmlFor="username">E-mail <span>*</span></label></div>
                                <input onChange={(e) => setUpdate({ ...update, email: e.target.value })} className=" p-2 rounded bg-slate-200 outline-none w-full" type="email" value={update.email} placeholder=" New Email" />
                            </div>
                        </div>

                        <div>
                            <div className=" mb-2"> <label className=" font-bold text-slate-500" htmlFor="username">Current Password <span>*</span></label></div>
                            <div className=" relative">
                                <input onChange={(e) => setUpdate({ ...update, currentPassword: e.target.value })} value={update.currentPassword} className=" p-2 rounded bg-slate-200 outline-none w-full" type={`${showPassword ? "password" : "text"}`} placeholder=" Current Password" />
                                {
                                    showPassword ?
                                        <svg onClick={() => setShowPassword(false)} className=" absolute top-0 bg-slate-200 cursor-pointer right-0 px-2 hover:bg-slate-300 h-full" xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="0 0 24 24"><g fill="none" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="m3 3l18 18M10.5 10.677a2 2 0 0 0 2.823 2.823"></path><path d="M7.362 7.561C5.68 8.74 4.279 10.42 3 12c1.889 2.991 5.282 6 9 6c1.55 0 3.043-.523 4.395-1.35M12 6c4.008 0 6.701 3.158 9 6a15.66 15.66 0 0 1-1.078 1.5"></path></g></svg>
                                        :
                                        <svg onClick={() => setShowPassword(true)} className=" absolute top-0 bg-slate-200 cursor-pointer right-0 px-2 hover:bg-slate-300 h-full" xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="0 0 24 24"><g fill="none" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M12 14a2 2 0 1 0 0-4a2 2 0 0 0 0 4Z"></path><path d="M21 12c-1.889 2.991-5.282 6-9 6s-7.111-3.009-9-6c2.299-2.842 4.992-6 9-6s6.701 3.158 9 6Z"></path></g></svg>
                                }
                            </div>
                        </div>
                        <div className=" sm:flex space-y-2 sm:space-y-0 sm:justify-between">
                            <div>
                                <div className=" mb-2"> <label className=" font-bold text-slate-500" htmlFor="username">New Password <span>*</span></label></div>
                                <div className=" relative">
                                    <input onChange={(e) => setUpdate({ ...update, newPassword: e.target.value })} value={update.newPassword} className=" p-2 rounded bg-slate-200 outline-none w-full" type={`${showPassword ? "password" : "text"}`} placeholder=" New Password" />
                                    {
                                        showPassword ?
                                            <svg onClick={() => setShowPassword(false)} className=" absolute top-0 bg-slate-200 cursor-pointer right-0 px-2 hover:bg-slate-300 h-full" xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="0 0 24 24"><g fill="none" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="m3 3l18 18M10.5 10.677a2 2 0 0 0 2.823 2.823"></path><path d="M7.362 7.561C5.68 8.74 4.279 10.42 3 12c1.889 2.991 5.282 6 9 6c1.55 0 3.043-.523 4.395-1.35M12 6c4.008 0 6.701 3.158 9 6a15.66 15.66 0 0 1-1.078 1.5"></path></g></svg>
                                            :
                                            <svg onClick={() => setShowPassword(true)} className=" absolute top-0 bg-slate-200 cursor-pointer right-0 px-2 hover:bg-slate-300 h-full" xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="0 0 24 24"><g fill="none" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M12 14a2 2 0 1 0 0-4a2 2 0 0 0 0 4Z"></path><path d="M21 12c-1.889 2.991-5.282 6-9 6s-7.111-3.009-9-6c2.299-2.842 4.992-6 9-6s6.701 3.158 9 6Z"></path></g></svg>
                                    }
                                </div>
                            </div>
                            <div>
                                <div className=" mb-2"> <label className=" font-bold text-slate-500" htmlFor="username">Confirm new Password <span>*</span></label></div>
                                <div className=" relative">
                                    <input onChange={(e) => setUpdate({ ...update, confirmPassword: e.target.value })} value={update.confirmPassword} className=" p-2 rounded bg-slate-200 outline-none w-full" type={`${showPassword ? "password" : "text"}`} placeholder=" New Confirm Password" />
                                    {
                                        showPassword ?
                                            <svg onClick={() => setShowPassword(false)} className=" absolute top-0 bg-slate-200 cursor-pointer right-0 px-2 hover:bg-slate-300 h-full" xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="0 0 24 24"><g fill="none" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="m3 3l18 18M10.5 10.677a2 2 0 0 0 2.823 2.823"></path><path d="M7.362 7.561C5.68 8.74 4.279 10.42 3 12c1.889 2.991 5.282 6 9 6c1.55 0 3.043-.523 4.395-1.35M12 6c4.008 0 6.701 3.158 9 6a15.66 15.66 0 0 1-1.078 1.5"></path></g></svg>
                                            :
                                            <svg onClick={() => setShowPassword(true)} className=" absolute top-0 bg-slate-200 cursor-pointer right-0 px-2 hover:bg-slate-300 h-full" xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="0 0 24 24"><g fill="none" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M12 14a2 2 0 1 0 0-4a2 2 0 0 0 0 4Z"></path><path d="M21 12c-1.889 2.991-5.282 6-9 6s-7.111-3.009-9-6c2.299-2.842 4.992-6 9-6s6.701 3.158 9 6Z"></path></g></svg>
                                    }
                                </div>
                            </div>
                        </div>

                        <button onClick={handleUpdateProfile} className=" p-2 rounded bg-yellow-500 hover:bg-yellow-600 w-full font-semibold ">{loading ? "LOADING..." : 'SAVE CHANGES'}</button>
                    </div>
                </div>
            </motion.div>
        </div>

    )
}

AccountDetailes.propTypes = {
    select: PropTypes.string
}

export default AccountDetailes