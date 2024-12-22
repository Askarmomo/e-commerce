import { useState } from "react"
import { Link } from "react-router-dom"
import useAuthStore from "../store/auth.store"
import useProductStore from "../store/product.store"
import Loading from "./Loading"


const NavBar = () => {

    const { user, logout, loading } = useAuthStore()
    const { cart, products } = useProductStore()

    const admin = user.role === "admin"
    const [option, setOption] = useState(true)

    const [search, setSearch] = useState()

    const filteredProduct = products.filter((product) => product.name.includes(search))



    return (
        <div className=" sticky top-0 right-0 left-0 z-50 w-full">
            {
                loading

                    ?
                    <Loading />
                    :
                    < div>
                        <div className=" bg-white flex items-center sm:sticky top-0 left-0 right-0 sm:justify-center sm:space-x-14 justify-between border-b-slate-400 border-b p-4">

                            <button onClick={() => setOption(false)} className=" sm:hidden p-2 hover:bg-slate-200  cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 14 14"><path fill="none" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" d="M13.5 2H.5m13 5H.5m13 5H.5"></path></svg>
                            </button>



                            <Link to={'/'} className=" ml-10">
                                <div className=" flex items-center space-x-2 cursor-pointer">
                                    <svg className=" fill-teal-700 stroke-teal-700 sm:h-[58px] h-[40px] sm:w-[58px] w-[40px]  " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinecap="round" strokeWidth="1.5"><path d="M9.5 21.5v-3c0-.935 0-1.402.201-1.75a1.5 1.5 0 0 1 .549-.549C10.598 16 11.065 16 12 16s1.402 0 1.75.201a1.5 1.5 0 0 1 .549.549c.201.348.201.815.201 1.75v3m6.5.5H9m-6 0h2.5M19 22v-7M5 22v-7"></path><path strokeLinejoin="round" d="M12 2H7.472c-1.203 0-1.804 0-2.287.299c-.484.298-.753.836-1.29 1.912L2.49 7.76c-.324.82-.608 1.786-.062 2.479A2 2 0 0 0 6 9a2 2 0 1 0 4 0a2 2 0 1 0 4 0a2 2 0 1 0 4 0a2 2 0 0 0 3.571 1.238c.546-.693.262-1.659-.062-2.479l-1.404-3.548c-.537-1.076-.806-1.614-1.29-1.912C18.332 2 17.731 2 16.528 2H16"></path></g></svg>
                                    <h1 className=" animate-pulse sm:text-3xl text-xl font-bold bg-gradient-to-tr from-teal-700 to-teal-300 bg-clip-text text-transparent">Momo Books</h1>
                                </div>

                            </Link>

                            <div>
                                <div className=" hidden sm:flex items-center ">
                                    <input onChange={(e) => setSearch(e.target.value)} value={search} className=" outline-none p-2 sm:w-[700px] bg-slate-200 rounded-l-lg" type="text" placeholder=" Search Your Favutrite books" />
                                    <svg className=" fill-slate-700 bg-slate-300 hover:bg-slate-400 h-[40px] w-[40px] p-1 cursor-pointer rounded-r-lg" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 256 256"><path d="m229.66 218.34l-50.07-50.06a88.11 88.11 0 1 0-11.31 11.31l50.06 50.07a8 8 0 0 0 11.32-11.32M40 112a72 72 0 1 1 72 72a72.08 72.08 0 0 1-72-72"></path></svg>
                                </div>
                                {search &&
                                    < div className=" fixed w-[700px] bg-slate-100 rounded">
                                        {
                                            filteredProduct.map((product) => (

                                                < Link to={`/book/${product.name}`} onClick={() => setSearch("")} key={product._id} >
                                                    <div data-aos="flip-down" className=" flex sticky top-0 justify-between items-center border-b-slate-300 border">
                                                        <div className="p-2 flex items-center space-x-2">
                                                            <img className=" h-10 w-10 object-cover" src={product.image} alt="" />
                                                            <span className=" capitalize">{product.name}</span>
                                                        </div>
                                                        <span className=" text-[14px] text-slate-700 pr-10"> {product.category}</span>
                                                    </div>
                                                </Link>
                                            ))
                                        }
                                    </div>
                                }
                            </div>

                            <Link to={'/cart'} className={`${user ? '' : 'hidden'}`}>
                                <div className=" flex items-center space-x-1 cursor-pointer">
                                    <div className=" relative">
                                        <svg className=" fill-slate-500 mr-2 mt-1" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 256 256"><path d="M228.61 60.16A6 6 0 0 0 224 58H61l-6.37-35.07a6 6 0 0 0-5.9-4.93H24a6 6 0 0 0 0 12h19.72l25.81 141.94a21.93 21.93 0 0 0 6.24 11.77a26 26 0 1 0 38.12 6.29h52.22A26 26 0 1 0 188 178H91.17a10 10 0 0 1-9.84-8.21L77.73 150H196.1a22 22 0 0 0 21.65-18.06l12.15-66.87a6 6 0 0 0-1.29-4.91M106 204a14 14 0 1 1-14-14a14 14 0 0 1 14 14m96 0a14 14 0 1 1-14-14a14 14 0 0 1 14 14m3.94-74.21a10 10 0 0 1-9.84 8.21H75.55L63.19 70h153.62Z"></path></svg>
                                        <span className=" absolute top-0 right-0 p-1 max-w-xs font-semibold  bg-teal-600 text-xs text-white rounded">{cart.length}</span>
                                    </div>
                                </div>
                            </Link>

                            {
                                user ? < div className=" hidden sm:block" >
                                    <div className="dropdown dropdown-end">
                                        <div tabIndex={0} role="button"><img className=" w-10 h-10 rounded-full border-teal-300 border-2 object-cover" src={user.profilePic} alt={user.username} /> </div>
                                        <ul tabIndex={0} className="dropdown-content menu bg-white rounded-box z-[1] w-52 p-2 shadow">
                                            <li className=" font-bold text-[17px] p-1 pl-4 capitalize">{user.username}</li>
                                            <li className=" font-semibold">
                                                <Link to={'/profile'} className=" flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="#888888" d="M5.85 17.1q1.275-.975 2.85-1.537T12 15t3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4T6.337 6.338T4 12q0 1.475.488 2.775T5.85 17.1M12 13q-1.475 0-2.488-1.012T8.5 9.5t1.013-2.488T12 6t2.488 1.013T15.5 9.5t-1.012 2.488T12 13m0 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q1.325 0 2.5-.387t2.15-1.113q-.975-.725-2.15-1.112T12 17t-2.5.388T7.35 18.5q.975.725 2.15 1.113T12 20m0-9q.65 0 1.075-.425T13.5 9.5t-.425-1.075T12 8t-1.075.425T10.5 9.5t.425 1.075T12 11m0 7.5"></path></svg>
                                                    <span> Profiile</span>
                                                </Link>
                                            </li>
                                            {
                                                admin &&
                                                <Link to={'/admin'}>
                                                    <li className=" font-semibold">
                                                        <div className=" flex items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="#888888" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm5-2v-6H5v6zm2 0h7v-6h-7zm-7-8h14V5H5z"></path></svg>
                                                            <span> Admin Dashboard</span>
                                                        </div>
                                                    </li>
                                                </Link>
                                            }
                                            <li className=" font-semibold ">
                                                <a onClick={logout} className=" hover:bg-rose-200 flex items-center">
                                                    <svg className=" stroke-red-500" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 512 512"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M320 176v-40a40 40 0 0 0-40-40H88a40 40 0 0 0-40 40v240a40 40 0 0 0 40 40h192a40 40 0 0 0 40-40v-40m64-160l80 80l-80 80m-193-80h273"></path></svg>
                                                    <span>Logout</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                    :
                                    <Link to={'/login'}>
                                        <div className=" font-semibold font-poppins">SingUp</div>
                                    </Link>
                            }

                        </div >

                        {
                            !option &&
                            <div className=" sm:hidden fixed bottom-0 bg-white z-30 top-0 right-0 left-0 ">

                                <div className=" py-2 pl-4 border-b">
                                    <svg onClick={() => setOption(true)} className=" fill-red-500 ease-in-out duration-150 hover:bg-slate-200 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24"><path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4"></path></svg>
                                </div>
                                <Link to={'/'} onClick={() => setOption(true)}>
                                    <div className=" flex space-x-4 border-b-2 p-5 hover:bg-slate-300 ease-in-out duration-150 font-bold text-xl cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="#888888" d="M4 21v-9.375L2.2 13L1 11.4L12 3l11 8.4l-1.2 1.575l-1.8-1.35V21zm4-6q-.425 0-.712-.288T7 14t.288-.712T8 13t.713.288T9 14t-.288.713T8 15m4 0q-.425 0-.712-.288T11 14t.288-.712T12 13t.713.288T13 14t-.288.713T12 15m4 0q-.425 0-.712-.288T15 14t.288-.712T16 13t.713.288T17 14t-.288.713T16 15"></path></svg>
                                        <span> Home</span>
                                    </div>
                                </Link>
                                <Link to={'/profile'} onClick={() => setOption(true)} >
                                    <div className="  flex space-x-4 border-b-2 p-5 hover:bg-slate-300 ease-in-out duration-150 font-bold text-xl cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="#888888" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6m0 14c-2.03 0-4.43-.82-6.14-2.88a9.95 9.95 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20"></path></svg>
                                        <span> Profile</span>
                                    </div>
                                </Link>
                                <div onClick={() => { logout(); setOption(true) }} >
                                    <div className=" flex space-x-4 border-b-2 p-5 hover:bg-red-300 ease-in-out duration-150 font-bold text-xl cursor-pointer">

                                        <svg className=" stroke-red-500" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 4.001H5v14a2 2 0 0 0 2 2h8m1-5l3-3m0 0l-3-3m3 3H9"></path></svg>
                                        <span className=""> Logout</span>
                                    </div>
                                </div>

                            </div>
                        }
                    </div >
            }
        </div >
    )
}

export default NavBar