import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import Collections from "./Pages/Collections";
import Login from "./Pages/Login";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";
import Favourites from "./Pages/Favourites";
import About from "./Pages/About";
import Orders from "./Pages/Orders";
import PlaceOrder from "./Pages/PlaceOrder";
import Product from "./Pages/Product";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
// eslint-disable-next-line no-unused-vars
import { ToastContainer, toast } from 'react-toastify';
import ResetPassword from "./Pages/ResetPassword";
import Profile from "./Pages/Profile";
import OurPolicy from "./components/OurPolicy"

export default function App() {
    return (
        // dark:bg-slate-900 dark:text-slate-100 transition-all duration-300
        <div className="m-0 p-0 bg-[--color2] dark:bg-slate-900 dark:text-slate-100 transition-all duration-300">
            <ToastContainer />
            <Routes>
                <Route path="/Login" element={<Login />} />
                <Route path="/ResetPassword" element={<ResetPassword />} />
                <Route path="*" element={
                    <>
                        <Navbar />
                        <SearchBar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/Collections" element={<Collections />} />
                            <Route path="/Contact" element={<Contact/>}/>
                            <Route path="/Cart" element={<Cart/>}/>
                            <Route path="/Favourites" element={<Favourites />} />
                            <Route path="/Profile" element={<Profile />} />
                            <Route path="/About" element={<About/>}/>
                            <Route path="/Orders" element={<Orders/>}/>
                            <Route path="/PlaceOrder" element={<PlaceOrder/>}/>
                            <Route path="/Product/:productId" element={<Product/>}/>    
                            <Route path="/OurPolicy" element={<OurPolicy/>}/>                    
                        </Routes>
                        <Footer />
                    </>
                } />
            </Routes>
        </div>
    );
}