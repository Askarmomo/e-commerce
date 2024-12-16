import PropTypes from "prop-types"
import useAuthStore from "../store/auth.store"
import { useState } from "react"
import { motion } from "framer-motion"
const Address = () => {

    const { updateAddress, userAddress } = useAuthStore()
    console.log(userAddress);

    const [address, setAddress] = useState({
        country: "",
        city: "",
        postelCode: 0,
        address: "",
        landMark: ""
    })

    const handleUpdateAddress = async (e) => {
        document.getElementById('my_modal_3').classList.remove('modal-open')
        e.preventDefault
        await updateAddress(address)
    }

    return (
        <div className=" sm:w-[1008px] text-xs mt-[150px] sm:text-base px-3">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
            >
                <div className=" bg-white rounded shadow-xl">
                    <div className=" space-y-5  p-3 px-8">
                        <div className=" flex space-x-2">
                            <span className=" font-semibold uppercase">Country : </span>
                            <span className={`${userAddress.country ? 'text-teal-700' : 'text-red-500'}`}>{userAddress.country || 'Not Updated Yet !'}</span>
                        </div>
                        <div className=" flex space-x-2">
                            <span className=" font-semibold uppercase">City : </span>
                            <span className={`${userAddress.city ? 'text-teal-700' : 'text-red-500'}`}>{userAddress.city || 'Not Updated Yet !'}</span>
                        </div>
                        <div className=" flex space-x-2">
                            <span className=" font-semibold uppercase">Postel Code : </span>
                            <span className={`${userAddress.postelCode ? 'text-teal-700' : 'text-red-500'}`}>{userAddress.postelCode || 'Not Updated Yet !'}</span>
                        </div>
                        <div className=" flex space-x-2">
                            <span className=" font-semibold uppercase">Address : </span>
                            <span className={`${userAddress.address ? 'text-teal-700' : 'text-red-500'}`}>{userAddress.address || 'Not Updated Yet !'}</span>
                        </div>
                        <div className=" flex space-x-2">
                            <span className=" font-semibold uppercase ">Land Mark : </span>
                            <span className={`${userAddress.landMark ? 'text-teal-700' : 'text-red-500'}`}>{userAddress.landMark || 'Not Updated Yet !'}</span>
                        </div>
                    </div>
                    {/* You can open the modal using document.getElementById('ID').showModal() method */}
                    <div className=" text-end"><button onClick={() => document.getElementById('my_modal_3').showModal()} className=" uppercase font-semibold bg-yellow-500 hover:bg-yellow-600 rounded p-2 mr-5 mb-5">edit address</button></div>
                    <dialog id="my_modal_3" className="modal">
                        <div className="modal-box bg-white">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>

                            <div className=" space-y-4 ">
                                <div>
                                    <div className=" mb-1 font-semibold"> <label htmlFor="country">Country *</label></div>
                                    <input onChange={(e) => setAddress({ ...address, country: e.target.value })} value={address.country} className=" p-2 rounded w-full outline-none bg-slate-300 placeholder:text-slate-600" id="country" type="text" placeholder="Ex: Sri Lanka" />
                                </div>
                                <div>
                                    <div className=" mb-1 font-semibold"> <label htmlFor="city">City *</label></div>
                                    <input onChange={(e) => setAddress({ ...address, city: e.target.value })} value={address.city} className=" p-2 rounded w-full outline-none bg-slate-300 placeholder:text-slate-600" id="city" type="text" placeholder="Ex: Tricomale" />
                                </div>
                                <div>
                                    <div className=" mb-1 font-semibold"> <label htmlFor="postelcode">Postel Code *</label></div>
                                    <input onChange={(e) => setAddress({ ...address, postelCode: e.target.value })} value={address.postelCode} className=" p-2 rounded w-full outline-none bg-slate-300 placeholder:text-slate-600" id="postelcode" type="number" placeholder="Ex: 31100" />
                                </div>
                                <div>
                                    <div className=" mb-1 font-semibold"> <label htmlFor="address">Address *</label></div>
                                    <input onChange={(e) => setAddress({ ...address, address: e.target.value })} value={address.address} className=" p-2 rounded w-full outline-none bg-slate-300 placeholder:text-slate-600" id="address" type="text" placeholder="Ex: Naduoothu kinniya-05" />
                                </div>
                                <div >
                                    <div className=" mb-1 font-semibold"> <label htmlFor="address">LandMark *</label></div>
                                    <input onChange={(e) => setAddress({ ...address, landMark: e.target.value })} value={address.landMark} className=" p-2 rounded w-full outline-none bg-slate-300 placeholder:text-slate-600" id="address" type="text" placeholder="Ex: Near The Al-Ahla-Viddiyalayam School" />
                                </div>
                                <div>
                                    <form method="dialog">
                                        <button onClick={handleUpdateAddress} className=" p-2 rounded bg-yellow-500 hover:bg-yellow-600 uppercase w-full font-semibold">save changes</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </dialog>

                </div>
            </motion.div>
        </div>
    )
}

Address.propTypes = {
    select: PropTypes.string
}

export default Address