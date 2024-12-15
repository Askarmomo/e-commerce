import { useEffect } from "react"
import { Link } from "react-router-dom"


const SucessPage = () => {

    useEffect(() => {

        const sessionId = new URLSearchParams(window.location.search).get("session_id")
        const handleSubmit = async (sessionId,) => {

            try {

                const res = await fetch('/api/orders/checkout-success', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ sessionId })
                })
                await res.json()

            } catch (error) {
                console.log(error);

            }
        }

        handleSubmit(sessionId)
    }, [])


    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-4xl font-bold text-green-600">Payment Successful!</h1>
            <p className="mt-4 text-lg text-gray-700">
                Thank you for your purchase. Your payment was completed successfully.
            </p>
            <Link to={'/'}>
                <button className="mt-6 px-6 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md" >
                    Back to Home
                </button>
            </Link>
        </div>
    )
}

export default SucessPage