import { useParams } from "react-router-dom"
import CartItem from "../components/HomeCart"
import { motion } from "framer-motion"
import { useEffect } from "react"
import useProductStore from "../store/product.store"



const Category = () => {

    const { getProductByCategory, categoryProducts } = useProductStore()


    const { category } = useParams()
    useEffect(() => {

        const categoryFunc = async () => {

            await getProductByCategory(category)
        }
        categoryFunc()
    }, [getProductByCategory])

    return (
        <div className=" sm:pr-[190px]">
            <div className=" mb-10 mx-4 sm:mx-8">

                <div>
                    <h1 className=" font-bold text-3xl uppercase sm:mt-10 mt-24 mb-5 text-slate-600 underline">{category}</h1>

                    <motion.div

                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <div className=" grid sm:grid-cols-4 grid-cols-2 gap-2">
                            {
                                categoryProducts.map((product) => (

                                    category === product.category && <CartItem key={product._id} product={product} />
                                ))
                            }
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Category