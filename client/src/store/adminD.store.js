import { create } from "zustand";



const useAdminDasboardStore = create((set) => ({

    totalUsers: 0,
    totalProduct: 0,
    totalOrder: 0,
    data: [],

    getUserCount: async () => {

        try {
            const res = await fetch('/api/auth/user-count')
            const data = await res.json()
            set({ totalUsers: data })
        } catch (error) {
            console.log(error);
        }

    },
    getOrderCount: async () => {

        try {
            const res = await fetch('/api/orders/order-count')
            const data = await res.json()
            set({ totalOrder: data })
        } catch (error) {
            console.log(error);

        }

    },
    getProductCount: async () => {
        try {
            const res = await fetch('/api/products/product-count')
            const data = await res.json()
            set({ totalProduct: data })
        } catch (error) {
            console.log(error);

        }
    },
    getSalesData: async () => {
        try {
            const res = await fetch('/api/orders/sales-data')
            const data = await res.json()
            set({ data: data })
        } catch (error) {
            console.log(error);

        }
    }

}))

export default useAdminDasboardStore;