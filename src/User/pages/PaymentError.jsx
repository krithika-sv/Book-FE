import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { FaBackward } from 'react-icons/fa6'
import Footer from '../components/Footer'


function PaymentError() {
    return (
        <>
            <Header />
            <div className="container min-h-screen flex justify-center items-center">
                <div className="md:grid grid-cols-2 px-20 justify-center items-center my-10">
                    <div>
                        <h1 className="text-red-500 md:text-4xl font-bold">
                            Sorry!!! Payment is Declined...
                        </h1>
                        <p className="text-2xl my-10">
                            We apologize for the inconvenience caused and appreciate your visit to Bookstore...
                        </p>
                        <Link
                            to={"/books"}
                            className="flex items-center bg-red-700 w-60 p-2 text-white font-bold"
                        >
                            <FaBackward className="me-2" /> Explore More Books...
                        </Link>
                    </div>

                    <div className="flex justify-center items-center">
                        <img
                            src="https://i0.wp.com/nrifuture.com/wp-content/uploads/2022/05/comp_3.gif?fit=800%2C600&ssl=1"
                            alt="cancel"
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default PaymentError