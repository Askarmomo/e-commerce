
import { useParams } from "react-router-dom"
import useProductStore from "../store/product.store";
import Book from "../components/Book";


const BookPage = () => {

    const { products } = useProductStore()
    const { name } = useParams()
    console.log(products);

    return (
        <div className=" sm:px-10 px-5 sm:max-w-7xl sm:mr-[80px]">
            {
                products.map((product) => (
                    name === product.name &&
                    <Book key={product._id} product={product} />
                ))
            }

           
        </div >
    )
}

export default BookPage