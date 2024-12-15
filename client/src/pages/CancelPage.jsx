import { Link } from "react-router-dom"


const CancelPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-red-500 mb-4">Payment Cancelled</h1>
            <p className="text-lg text-gray-700 mb-8">
                It seems you cancelled the payment. If this was a mistake, you can try again.
            </p>
            <Link to={'/'}>
                <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200" >
                    Return to Shop
                </button>
            </Link>
        </div>
    )
}

export default CancelPage;
