import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";




function Footer() {
    return (
        <>
            <div className='bg-black text-white'>
                <div className="flex flex-col md:flex-row p-8 gap-8">

                    <div class="basis-2/3">
                        <h2 className='font-bold '>ABOUT US</h2>
                        <p className='text-justify mt-6'>We believe books are more than just pages – they are windows into new worlds, teachers of wisdom, and companions for life. Our journey began with a passion for storytelling and a mission to make reading accessible, enjoyable, and inspiring for everyone.</p>
                    </div>
                    <div class="basis-1/3"><h2 className='font-bold '>NEWS LETTER</h2>
                        <p className='mt-6'>Stay updated with our latest trends</p>
                        <div className='flex flex-row py-5 '>
                            <input className='bg-white gray text-gray-50' type="text" placeholder='E mail' />
                            <button className='bg-[#EFB000] p-3'><FaArrowRight /></button>
                        </div>

                    </div>
                    <div class="basis-1/3"><h2 className='font-bold '>FOLLOW US</h2>
                        <p className='mt-6'>Let us be social</p>

                        <div className='flex flex-row py-8 gap-8'>
                            <FaFacebook />
                            <FaInstagram />
                            <FaXTwitter />
                            <MdOutlineEmail />
                        </div>
                    </div>
                </div>

                <p className='text-center pb-5 px-3 '>Copyright © 2026 All rights reserved | This website is made with ♥ By Luminar Technolab</p>
            </div>
        </>
    )
}

export default Footer 