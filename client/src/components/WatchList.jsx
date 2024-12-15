import PropTypes from "prop-types"
import useProductStore from "../store/product.store"
import { dataFormat } from "../middleware/dataFormaet"
import { motion } from "framer-motion"

const WatchList = () => {

    const { watchList, addToWatchlist } = useProductStore()


    return (
        <div className=" p-4 sm:p-0 sm:w-[1008px]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
            >
                {watchList.length !== 0 ?

                    <div>
                        <div>
                            <div className="bg-white p-2 rounded sm:w-[900px]" >
                                <table className="w-full sm:text-base text-xs  sm:rounded-xl ">

                                    <tbody>
                                        {
                                            watchList.map((product) => (

                                                < tr key={product._id} className=" border">
                                                    <th scope="row" className="sm:px-6 px-1 py-2 sm:py-4 font-medium">
                                                        <div className=" flex space-x-2 items-center">
                                                            <img className=" w-12 h-12 rounded-full object-cover " src={product.image} alt="book" />
                                                            <h3 className=" w-[70px] sm:w-auto">{product.name}</h3>
                                                        </div>
                                                    </th>
                                                    <td className="sm:px-6 sm:py-4">
                                                        Rs. {product.price}
                                                    </td>
                                                    <td className="sm:px-6 sm:py-4">
                                                        {product.stock <= 0 ? "out of stock" : "in stock"}
                                                    </td>
                                                    <td className="sm:px-6 sm:py-4">
                                                        {dataFormat(product.createdAt, "YYYY/MM/DD")}
                                                    </td>
                                                    <td className="sm:px-6 sm:py-4">
                                                        <button onClick={() => addToWatchlist({ product: product })} className=" bg-red-500 text-white hover:bg-red-600 sm:p-2 p-1.5 rounded font-semibold">Remove</button>
                                                    </td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>

                                </table>
                            </div>

                        </div>
                    </div>
                    :
                    <div>
                        <h1 className=" text-4xl font-semibold mt-40 ml-72 text-slate-500">Add to watchList</h1>
                    </div>
                }
            </motion.div >
        </div>

    )
}

WatchList.propTypes = {
    select: PropTypes.string
}

export default WatchList