import { useState } from "react"
import useProductStore from "../store/product.store"
import { motion } from "framer-motion"

const AdminProducts = () => {

    const { createProduct, products, oneProduct, updateProduct, loading } = useProductStore()


    const [product, setProduct] = useState({
        name: "",
        category: "",
        stock: "",
        price: "",
        description: "",
        image: ""
    })
    const [inputValue, setInputValue] = useState('')

    const [count, setCount] = useState(0)

    const filteredProducts = products.filter((product) => product.name.includes(inputValue)) || products



    const handleIage = (e) => {
        const file = e.target.files[0]
        // console.log(file.type.startsWith("image/"));

        if (file.type.startsWith("image/")) {

            const reder = new FileReader()

            reder.onloadend = () => {
                // setImage(reder.result)
                setProduct({ ...product, image: reder.result })
            }
            reder.readAsDataURL(file)

        }
    }

    const [productUpdate, setProductUpdate] = useState({
        id: "",
        name: "",
        category: "",
        stock: "",
        price: "",
        description: "",
        image: ""
    })

    const updatefunc = async () => {
        await updateProduct(productUpdate, oneProduct._id)
    }

    const [edit, setEdit] = useState(false)

    return (
        <div className=" pr-[48px]">
            <div className="w-[1000px]" >
                {

                    <div className={` fixed top-0 left-0 right-0 bottom-0 ${edit ? '' : 'hidden'}  bg-slate-400 bg-opacity-30 z-50`}>
                        <div className=" pt-12">
                            < form id="edit" className=" max-h-[500px] mx-auto overflow-scroll z-50 space-y-2 bg-white p-4 rounded-lg max-w-[500px]">
                                <div className=" relative ">
                                    <svg onClick={() => setEdit(false)} className=" absolute right-0 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="none" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.75 12c0 5.523 4.477 10 10 10s10-4.477 10-10s-4.477-10-10-10M5.399 5.079q.207-.22.427-.428M8.697 2.73q.273-.122.553-.229M3.482 7.942q-.124.275-.232.558m12.5.5l-3 3m0 0l-3 3m3-3l3 3m-3-3l-3-3" color="#888888"></path></svg>

                                </div>
                                <div>
                                    <div className=" mb-1 font-semibold"> <label htmlFor="name">Name of the book *</label></div>
                                    <input value={productUpdate.name} onChange={(e) => { setProductUpdate({ ...updateProduct, name: e.target.value }) }} className=" p-2 rounded w-full outline-none bg-slate-200 placeholder:text-slate-600" id="name" type="text" placeholder="Ex: Rich dad poor dad" />
                                </div>
                                <div>
                                    <div className=" mb-1 font-semibold"> <label htmlFor="category">Category *</label></div>
                                    <input value={productUpdate.category} onChange={(e) => { setProductUpdate({ ...updateProduct, category: e.target.value }) }} className=" p-2 rounded w-full outline-none bg-slate-200 placeholder:text-slate-600" id="category" type="text" placeholder="Ex: Story" />
                                </div>
                                <div>
                                    <div className=" mb-1 font-semibold"> <label htmlFor="price">Stock *</label></div>
                                    <input value={productUpdate.stock} onChange={(e) => { setProductUpdate({ ...updateProduct, stock: e.target.value }) }} className=" p-2 rounded w-full outline-none bg-slate-200 placeholder:text-slate-800" id="price" type="number" placeholder="Ex: 124" />
                                </div>
                                <div>
                                    <div className=" mb-1 font-semibold"> <label htmlFor="discription">Description *</label></div>
                                    <div>
                                        <textarea value={productUpdate.description} onChange={(e) => { setCount(e.target.value.trim().length); setProductUpdate({ ...updateProduct, description: e.target.value }) }} maxLength={500} className=" p-2 rounded w-full outline-none bg-slate-200 placeholder:text-slate-600" id="description" type="number" placeholder="min: 500" />
                                        <span>{count}/500</span>
                                    </div>
                                </div>
                                <div className=" bg-slate-200 p-2 mx-auto text-center">
                                    {
                                        !productUpdate.image ?
                                            <label className=" cursor-pointer " htmlFor="image">
                                                <svg className=" mx-auto bg-slate-200 rounded" xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 24 24"><g fill="none" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M15 8h.01M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z"></path><path d="m3 16l5-5c.928-.893 2.072-.893 3 0l5 5"></path><path d="m14 14l1-1c.928-.893 2.072-.893 3 0l3 3"></path></g></svg>
                                                <span className=" pt-4 text-sm"> Upload book image</span>
                                            </label>
                                            :
                                            <img src={productUpdate.image} alt="img" />
                                    }

                                    <input onChange={handleIage} className=" hidden p-2 rounded w-full outline-none bg-slate-300 placeholder:text-slate-600" id="image" name="image" type="file" />
                                </div>
                                <div className=" pt-3"><button onClick={updatefunc} className=" p-2 rounded bg-yellow-500 hover:bg-yellow-600 uppercase w-full font-semibold">update book</button></div>
                            </form>
                        </div>
                    </div>
                }
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}

                    className="mt-10 sm:rounded-lg">


                    <div className={` border border-b`}>
                        <div className=" pt-3 pr-5 flex items-center justify-between pb-4 bg-white ">
                            {/* You can open the modal using document.getElementById('ID').showModal() method */}
                            <button onClick={() => document.getElementById('my_modal_3').showModal()} className=" text-xl font-bold text-teal-500 cursor-pointer px-4">Create Product +</button>
                            <dialog id="my_modal_3" className={`modal`}>
                                <div className="modal-box bg-white">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                    </form>
                                    <form  onSubmit={() => {createProduct(product)}} className={`space-y-4  `}>
                                        <div>
                                            <div className=" mb-1 font-semibold"> <label htmlFor="name">Name of the book *</label></div>
                                            <input value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} className=" p-2 rounded w-full outline-none bg-slate-200 placeholder:text-slate-600" id="name" type="text" placeholder="Ex: Rich dad poor dad" />
                                        </div>
                                        <div>
                                            <div className=" mb-1 font-semibold"> <label htmlFor="category">Category *</label></div>
                                            <input value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })} className=" p-2 rounded w-full outline-none bg-slate-200 placeholder:text-slate-600" id="category" type="text" placeholder="Ex: Story" />
                                        </div>
                                        <div>
                                            <div className=" mb-1 font-semibold"> <label htmlFor="stock">Stock *</label></div>
                                            <input min={1} value={product.stock} onChange={(e) => setProduct({ ...product, stock: e.target.value })} className=" p-2 rounded w-full outline-none bg-slate-200 placeholder:text-slate-600" id="stock" type="number" placeholder="Ex: 124" />
                                        </div>
                                        <div>
                                            <div className=" mb-1 font-semibold"> <label htmlFor="price">Price *</label></div>
                                            <input min={1} value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} className=" p-2 rounded w-full outline-none bg-slate-200 placeholder:text-slate-600" id="price" type="number" placeholder="Ex: 124" />
                                        </div>
                                        <div>
                                            <div className=" mb-1 font-semibold"> <label htmlFor="discription">Description *</label></div>
                                            <div>
                                                <textarea value={product.description} onChange={(e) => { setProduct({ ...product, description: e.target.value }); setCount(e.target.value.trim().length) }} maxLength={500} className=" p-2 rounded w-full outline-none bg-slate-200 placeholder:text-slate-600" id="description" type="number" placeholder="min: 500" />
                                                <span>{count}/500</span>
                                            </div>
                                        </div>
                                        <div className=" bg-slate-200 p-2 mx-auto text-center">
                                            {
                                                !product.image ?
                                                    <label className=" cursor-pointer " htmlFor="image">
                                                        <svg className=" mx-auto bg-slate-200 rounded" xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 24 24"><g fill="none" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M15 8h.01M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z"></path><path d="m3 16l5-5c.928-.893 2.072-.893 3 0l5 5"></path><path d="m14 14l1-1c.928-.893 2.072-.893 3 0l3 3"></path></g></svg>
                                                        <span className=" pt-4 text-sm"> Upload book image</span>
                                                    </label>
                                                    :
                                                    <img src={product.image} alt="img" />
                                            }

                                            <input onChange={handleIage} className=" hidden p-2 rounded w-full outline-none bg-slate-300 placeholder:text-slate-600" id="image" name="image" type="file" />
                                        </div>
                                        <div className=" pt-3"><button className=" p-2 rounded bg-yellow-500 hover:bg-yellow-600 uppercase w-full font-semibold">{loading ? 'Loading...' : 'create book'}</button></div>
                                    </form>
                                </div>
                            </dialog>

                            <div className="relative">
                                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="text" onChange={(e) => setInputValue(e.target.value)} value={inputValue} className="block outline-none p-2 ps-10 bg-slate-100 rounded-full text-sm" placeholder="Search product" />
                            </div>
                        </div>

                    </div>

                    <table className="w-full text-sm">
                        <thead className="text-xs text-gray-700 bg-white border] border-b uppercase">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Stock
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Sales
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredProducts.length > 0 ?
                                    filteredProducts.map((product) => (
                                        <tr key={product.name} className="bg-white border-b cursor-pointer">
                                            <th scope="row" className="flex items-center px-6 py-4 font-medium">
                                                <img className="w-10 h-10 rounded-full object-cover" src={product.image} alt={product.name} />
                                                <div className="ps-3">
                                                    <div className="text-base font-semibold capitalize">{product.name}</div>
                                                </div>
                                            </th>
                                            <td className="px-6 py-4">
                                                {product.category}
                                            </td>
                                            <td className="px-6 py-4">
                                                Rs. {product.price}
                                            </td>
                                            <td className="px-6 py-4">
                                                {product.stock}
                                            </td>
                                            <td className="px-6 py-4">
                                                {0}
                                            </td>
                                            <td onClick={() => setEdit(!edit)} className="px-6 py-4 text-red-600">
                                                Edit
                                            </td>
                                        </tr>

                                    ))
                                    :
                                    products.map((product) => (
                                        <tr key={product.name} className="bg-white border-b cursor-pointer">
                                            <th scope="row" className="flex items-center px-6 py-4 font-medium">
                                                <img className="w-10 h-10 rounded-full object-cover" src={product.image} alt={product.name} />
                                                <div className="ps-3">
                                                    <div className="text-base font-semibold capitalize">{product.name}</div>
                                                </div>
                                            </th>
                                            <td className="px-6 py-4">
                                                {product.category}
                                            </td>
                                            <td className="px-6 py-4">
                                                Rs. {product.price}
                                            </td>
                                            <td className="px-6 py-4">
                                                {product.stock}
                                            </td>
                                            <td className="px-6 py-4">
                                                {0}
                                            </td>
                                            <td onClick={() => setEdit(!edit)} className="px-6 py-4 text-red-600">
                                                Edit
                                            </td>
                                        </tr>

                                    ))
                            }
                        </tbody>
                    </table>
                </motion.div >

            </div>
        </div>
    )
}

export default AdminProducts