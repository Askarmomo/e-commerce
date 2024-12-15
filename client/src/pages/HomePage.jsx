import CartItem from "../components/HomeCart"
import Categories from "../components/Categories"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import useProductStore from "../store/product.store"
import Slider from "../components/Slider"



const CategoriesData = [

    {
        img: "https://i.insider.com/6123e7b3493203001845811d?width=1136&format=jpeg",
        title: " Bussiness Books",
        category: "bussiness",
    },
    {
        img: "https://files.thehandbook.com/uploads/2023/01/selfhelpbooks.jpg",
        title: " Self Help Books",
        category: "selfhelp",
    },
    {
        img: "https://blog.tubikstudio.com/wp-content/uploads/2021/04/forest-tale-book-illustrations-tubikarts-1.jpg",
        title: "Story Books",
        category: "story",
    },

]



const HomePage = () => {

    const { products } = useProductStore()
    console.log(products);

    return (
        <div className=" mb-10">
            <motion.div

                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <div>
                    <Slider />
                </div>
            </motion.div>


            <div>
                <h1 className=" font-bold sm:text-4xl text-2xl text-center sm:pt-5 pb-1 bg-gradient-to-tr from-teal-800 to-teal-400 bg-clip-text text-transparent">Categories</h1>

                <div data-aos="zoom-in" className=" sm:py-10 sm:pl-20 mx-12 my-5 grid grid-cols-2 sm:grid-cols-3 sm:space-y-5 sm:gap-10 gap-5 sm:items-center sm:justify-center">
                    {

                        CategoriesData.map((Category, index) => (

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.25 }}
                                key={index}
                            >

                                <Link to={`/category/${Category.category}`} >
                                    <Categories img={Category.img} title={Category.title} />
                                </Link>

                            </motion.div>
                        ))

                    }
                </div>

            </div>

            <div>
                <h1 className=" sm:text-3xl text-2xl font-semibold text-teal-700 text-center" >Some Books</h1>
                <div data-aos="zoom-in" className=" mt-10 grid sm:grid-cols-4 grid-cols-2 gap-5 sm:gap-20 sm:px-10 px-10 sm:py-10" >
                    {
                        products.lenngth !== 0 && !products.message && products.map((product) => (

                            < CartItem key={product._id} product={product} />

                        ))
                    }
                </div>
            </div>
        </div >
    )
}

export default HomePage