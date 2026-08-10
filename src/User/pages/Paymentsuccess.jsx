import React from 'react'
import { FaBackward } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'


function Paymentsuccess() {
    return (
        <>
            <Header />
            <div className="container min-h-screen flex justify-center items-center">
                <div className="md:grid grid-cols-2 px-20 justify-center items-center my-10">
                    <div>
                        <h1 className="text-blue-500 md:text-4xl font-bold">Congratulation!!!</h1>
                        <p className="text-2xl my-10">
                            Thank you for purchasing with BookStore. Hope you have a good time with us...
                        </p>
                        <Link
                            to={"/books"}
                            className="flex items-center bg-blue-700 w-60 p-2 text-white font-bold"
                        >
                            <FaBackward className="me-2" /> Explore More Books...
                        </Link>
                    </div>

                    <div className="flex justify-center items-center">
                        <img
                            src="https://i.pinimg.com/originals/0d/e4/1a/0de41a3c5953fba1755ebd416ec109dd.gif"
                            alt="success"
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Paymentsuccess