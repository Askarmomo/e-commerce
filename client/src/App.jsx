import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom"
import NavBar from "./components/NavBar"
import { Toaster } from "react-hot-toast"
import 'react-tooltip/dist/react-tooltip.css'
import useAuthStore from "./store/auth.store"
import useProductStore from "./store/product.store"
import 'aos/dist/aos.css';
import AOS from 'aos';
import useOrderStore from "./store/order.store"
import { useEffect, lazy, Suspense } from "react";
import Loading from "./components/Loading"
// import Footer from "./components/Footer"

const HomePage = lazy(() => import("./pages/HomePage"))
const SingUpPage = lazy(() => import("./pages/SingUpPage"))
const LogInPage = lazy(() => import("./pages/LogInPage"))
const CartPage = lazy(() => import("./pages/CartPage"))
const ProfilePage = lazy(() => import("./pages/ProfilePage"))
const Category = lazy(() => import("./pages/Category"))
const BookPage = lazy(() => import("./pages/BookPage"))
const AdminPage = lazy(() => import("./pages/AdminPage"))
const SucessPage = lazy(() => import("./pages/SucessPage"))
const CancelPage = lazy(() => import("./pages/CancelPage"))
const Footer = lazy(() => import('./components/Footer'))



const App = () => {

  const { getProduct, getWatchList, getAllCart } = useProductStore()
  const { user, getUser, refreshToken, getAllUser, getAddress } = useAuthStore()
  const { getOrderByStatus } = useOrderStore()
  const location = useLocation()


  useEffect(() => {
    getProduct()
  }, [getProduct])

  useEffect(() => {
    if (user) {
      getOrderByStatus()
      getAllCart()
      getWatchList()
      getAddress()

    }
    refreshToken()
  }, [getOrderByStatus, getAllCart, getWatchList, getProduct, user, refreshToken, getAddress]);


  // for getuser
  useEffect(() => {
    if (user === false) {
      getUser()
    }
  }, [getUser, user])

  useEffect(() => {
    if (user !== false && user.role == "admin") {
      getAllUser()
    }
  }, [getAllUser, user])

  useEffect(() => {
    AOS.init();

  }, []);

  const hideFooterRoute = ['/profile', '/admin', '/login', '/singup']
  const hideFooterRoute2 = ['/admin']


  return (
    <div className=" sm:flex sm:justify-center min-h-screen bg-zinc-200 text-black">

      <div>
        <NavBar />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/singup" element={user ? <Navigate to={'/'} /> : <SingUpPage />} />
            <Route path="/login" element={user ? <Navigate to={'/'} /> : <LogInPage />} />
            <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to={'/'} />} />
            <Route path="/success" element={<SucessPage />} />
            <Route path="/cancel" element={<CancelPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/book/:name" element={<BookPage />} />
            <Route path="/admin" element={user.role === "admin" ? <AdminPage /> : <Navigate to={'/'} />} />
          </Routes>
          {
            !hideFooterRoute.includes(location.pathname) && <Footer />
          }
        </Suspense>
        <Toaster />
      </div>
      {
        !hideFooterRoute2.includes(location.pathname) &&
        < Link to={'https://wa.me/0751336007'}>
          <svg className=" fixed sm:bottom-16 bottom-[100px] cursor-pointer right-10" xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 256 258"><defs><linearGradient id="logosWhatsappIcon0" x1="50%" x2="50%" y1="100%" y2="0%"><stop offset="0%" stopColor="#1FAF38"></stop><stop offset="100%" stopColor="#60D669"></stop></linearGradient><linearGradient id="logosWhatsappIcon1" x1="50%" x2="50%" y1="100%" y2="0%"><stop offset="0%" stopColor="#F9F9F9"></stop><stop offset="100%" stopColor="#FFF"></stop></linearGradient></defs><path fill="url(#logosWhatsappIcon0)" d="M5.463 127.456c-.006 21.677 5.658 42.843 16.428 61.499L4.433 252.697l65.232-17.104a123 123 0 0 0 58.8 14.97h.054c67.815 0 123.018-55.183 123.047-123.01c.013-32.867-12.775-63.773-36.009-87.025c-23.23-23.25-54.125-36.061-87.043-36.076c-67.823 0-123.022 55.18-123.05 123.004"></path><path fill="url(#logosWhatsappIcon1)" d="M1.07 127.416c-.007 22.457 5.86 44.38 17.014 63.704L0 257.147l67.571-17.717c18.618 10.151 39.58 15.503 60.91 15.511h.055c70.248 0 127.434-57.168 127.464-127.423c.012-34.048-13.236-66.065-37.3-90.15C194.633 13.286 162.633.014 128.536 0C58.276 0 1.099 57.16 1.071 127.416m40.24 60.376l-2.523-4.005c-10.606-16.864-16.204-36.352-16.196-56.363C22.614 69.029 70.138 21.52 128.576 21.52c28.3.012 54.896 11.044 74.9 31.06c20.003 20.018 31.01 46.628 31.003 74.93c-.026 58.395-47.551 105.91-105.943 105.91h-.042c-19.013-.01-37.66-5.116-53.922-14.765l-3.87-2.295l-40.098 10.513z"></path><path fill="#FFF" d="M96.678 74.148c-2.386-5.303-4.897-5.41-7.166-5.503c-1.858-.08-3.982-.074-6.104-.074c-2.124 0-5.575.799-8.492 3.984c-2.92 3.188-11.148 10.892-11.148 26.561s11.413 30.813 13.004 32.94c1.593 2.123 22.033 35.307 54.405 48.073c26.904 10.609 32.379 8.499 38.218 7.967c5.84-.53 18.844-7.702 21.497-15.139c2.655-7.436 2.655-13.81 1.859-15.142c-.796-1.327-2.92-2.124-6.105-3.716s-18.844-9.298-21.763-10.361c-2.92-1.062-5.043-1.592-7.167 1.597c-2.124 3.184-8.223 10.356-10.082 12.48c-1.857 2.129-3.716 2.394-6.9.801c-3.187-1.598-13.444-4.957-25.613-15.806c-9.468-8.442-15.86-18.867-17.718-22.056c-1.858-3.184-.199-4.91 1.398-6.497c1.431-1.427 3.186-3.719 4.78-5.578c1.588-1.86 2.118-3.187 3.18-5.311c1.063-2.126.531-3.986-.264-5.579c-.798-1.593-6.987-17.343-9.819-23.64"></path></svg>
        </Link>
      }
    </div >
  )
}

export default App
