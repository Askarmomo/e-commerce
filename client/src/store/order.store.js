import toast from "react-hot-toast"
import { create } from "zustand"


const useOrderStore = create((set) => ({

    orders: [],
    userOrders: [],
    ordersCount: {},

    getAllOrders: async () => {

        try {
            const res = await fetch("/api/orders/allOrders")
            const data = await res.json()
            set({ orders: data })

        } catch (error) {
            console.log(error.message);

        }

    },
    getUserOrder: async () => {

        try {
            const res = await fetch("/api/orders/userorders")
            const data = await res.json()
            set({ userOrders: data })

        } catch (error) {
            console.log(error.message);

        }

    },
    updateOrders: async (order, orderStatus) => {

        try {
            const res = await fetch(`/api/orders/update-order/${order._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderStatus })
            })

            set((prevState) => {
                const newOrder = prevState.orders.map((item) => (item._id === order._id ? { ...item, status: orderStatus } : item))
                return { orders: newOrder }
            })

            const data = await res.json()
            toast.success(data)
        } catch (error) {
            console.log(error.message);

        }

    },
    getOrderByStatus: async () => {
        try {
            const res = await fetch('/api/orders//orders-by-status')
            const data = await res.json()
            set({ ordersCount: data })
        } catch (error) {
            console.log(error);

        }
    },
    deleteOrder: async (order) => {
        try {
            const res = await fetch(`/api/orders/delete/${order._id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await res.json()

            set((prevState) => {
                const filteredOrder = prevState.orders.filter((item) => item._id !== order._id)
                return { orders: filteredOrder }
            })

            if (!data.error) {
                toast.success(data.message)
            }
        } catch (error) {
            console.log(error);

        }
    }


}))

export default useOrderStore