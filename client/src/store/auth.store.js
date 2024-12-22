import toast from 'react-hot-toast'

import { create } from 'zustand'

const useAuthStore = create((set) => ({

    user: false,
    loading: false,
    userAccountDetailes: false,
    allUsers: [],
    userAddress: {},

    singup: async (userData) => {
        set({ loading: true })
        try {
            const res = await fetch("/api/auth/singup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            })

            const data = await res.json()
            set({ user: data, isLogIn: true })
            toast.success("Account created")
            set({ loading: false })
        } catch (error) {
            console.log(error.message);

        } finally {
            set({ loading: false })

        }
    },
    login: async (email, password) => {
        set({ loading: true })
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })

            const data = await res.json()
            if (data.error) {
                toast.error(data.error)
            } else {

                set({ user: data, isLogIn: true })
                toast.success("login successfully")
            }

        } catch (error) {
            console.log(error.message);

        } finally {
            set({ loading: false })
        }
    },
    logout: async () => {
        set({ loading: true })
        try {
            const res = await fetch("/api/auth/logout")
            const data = await res.json()
            console.log(data);

            toast.success("logout successfully")
            set({ user: false })

            window.location.reload()
        } catch (error) {
            console.log(error.message);
        } finally {
            set({ loading: false })

        }
    },
    getAddress: async () => {
        set({ loading: true })
        try {
            const res = await fetch('/api/auth/address')
            const data = await res.json()
            console.log(data);
            set({ userAddress: data })

        } catch (error) {
            console.log(error);

        } finally {
            set({ loading: false })

        }
    },
    getUser: async () => {
        set({ loading: true })
        try {
            const res = await fetch("/api/auth/userprofile")
            const data = await res.json()
            console.log(data);

            if (data.error) {
                toast.error(data.error)
            } else {
                set({ user: data })
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            set({ loading: false })
        }
    },
    refreshToken: async () => {
        set({ loading: true })

        try {
            await fetch("/api/auth/refresh-token")

        } catch (error) {
            console.log(error.message);

        } finally {
            set({ loading: false })
        }

    },
    updateProfile: async (updateData) => {
        set({ loading: true })
        try {
            const res = await fetch("/api/auth/updateprofile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updateData)
            })
            const data = await res.json()
            if (data.error) {
                toast.error(data.error)
            } else {
                set({ user: data })
                toast.success('profile updated successfully')
                setTimeout(() => {
                    location.reload()
                }, 2000);
            }
        } catch (error) {
            console.log(error.message);

        } finally {
            set({ loading: true })
        }

    },
    updateAddress: async (updateAddressData) => {
        set({ loading: true })
        try {
            const res = await fetch('/api/auth/updateaddress', {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updateAddressData)
            })
            const data = await res.json()
            set({ userAddress: data })

            toast.success('address updated successfully')
        } catch (error) {
            console.log(error.message);

        } finally {
            set({ loading: false })
        }
    },
    getAllUser: async () => {
        set({ loading: true })
        try {
            const res = await fetch('/api/auth/all-users')
            const data = await res.json()
            set({ allUsers: data })

        } catch (error) {
            console.log(error.message);

        } finally {
            set({ loading: false })
        }

    },
    deleteUser: async (user) => {
        set({ loading: true })
        try {

            const res = await fetch(`/api/auth/delete-user/${user._id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })

            const data = await res.json()

            if (!data.error) {

                set({ allUsers: data })
                toast.success('user deleted successfully')
            } else {
                toast.error(data.error)
            }
        } catch (error) {
            console.log(error);

        } finally {
            set({ loading: true })
        }
    }

}))





export default useAuthStore

