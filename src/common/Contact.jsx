import React, { useRef } from 'react'
import { FaLocationPin } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaTelegramPlane } from "react-icons/fa";
import Header from '../User/components/Header';
import Footer from '../User/components/Footer';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';



function Contact() {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        const { name, email, title } = form.current
        // form.current.name.value

        if (!name.value || !email.value || !title.value) {
            toast("Fill form completely")
        } else {
            emailjs
                .sendForm(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, form.current, {
                    publicKey: import.meta.env.VITE_PUBLIC_KEY,
                })
                .then(
                    () => {
                        console.log('SUCCESS!');
                        toast.success("Successfull")
                        name.value = ""
                        email.value = ""
                        title.value = ""
                    },
                    (error) => {
                        console.log('FAILED...', error.text);
                        toast.error("Something went wrong")
                    },
                );
        };
    }


    return (

        <>
            <Header />
            <div className='p-5 mb-12'>
                <div className='text-center font-bold text-2xl my-10'>Contact</div>
                <p className='px-10 text-justify'>Have questions, feedback, or need help finding the perfect book? We’d love to hear from you! Why Contact Us? Order‑related support, book availability inquiries, return/replacement queries, bulk/institutional purchase requests, author or partnership inquiries. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hic veniam id eveniet recusandae pariatur, facilis fuga? Iusto, asperiores modi cum praesentium et, libero nisi eaque harum sed deleniti odio eveniet. Maiores delectus iusto voluptatibus officia eveniet sunt quibusdam mollitia, error fugit laborum dolorum deserunt! Quaerat magni ad, veritatis dolor iusto, aliquam nisi consequatur officiis perferendis unde, maiores quos praesentium voluptatibus. Magni dolores impedit, officia doloribus repellat fuga quos ad natus recusandae sed numquam fugiat, sapiente minima, nam vero incidunt libero earum. Minima praesentium laborum tenetur corporis quod dolorum maxime pariatur.</p>

                {/* contact */}

                <form ref={form} onSubmit={sendEmail}>
                    <div className='flex flex-col md:flex-row mb-32 md:mb-2 gap-8 py-8 text-center justify-center items-center w-full'>
                        <div className='flex flex-row gap-5'>
                            <FaLocationPin />
                            <p className='text-sm sm:text-base md:text-base lg:text-base'>123 Main Street, Apt 4B, Anytown, CA 91234</p>
                        </div>
                        <div className='flex flex-row gap-5'>
                            <FaPhoneAlt />
                            <p className='text-sm sm:text-base md:text-base lg:text-base'>+098765432123</p>
                        </div>

                        <div className='flex flex-row gap-5'>
                            <IoMdMail />

                            <p cclassName='text-sm sm:text-base md:text-base lg:text-base'>contact@bookstore.com</p>
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row gap-16 md:p-48 text-center justify-center items-center w-full h-96 '>
                        <div className='bg-gray-200 text-black p-6  w-full'>
                            <h3 className='text text-xl p-2 font-medium'>Send us message!</h3>
                            <div className='flex flex-col gap-8 py-2 justify-center items-center w-full'>
                                <input className='bg-white p-2 w-full' type="text" name='name' placeholder='Name' />
                                <input className='bg-white p-2 w-full' type="text" name='email' placeholder='E mail' />
                                <input className='bg-white p-2 w-full' type="text" name='title' placeholder='Message' />
                                <button className='bg-black text-white w-full p-2 text-center flex justify-center items-center gap-4 ' type='submit'>Submit <FaTelegramPlane />
                                </button></div>
                        </div>
                        <div className='p-2 h-64 md:h-96  w-full'>
                            <iframe className='w-full h-full' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.032971758479!2d75.7811670750489!3d11.258984788920664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65900d568d853%3A0x86dc9f15ee869de3!2sLuminar%20Technolab%20-%20Software%20training%20institute%20in%20Calicut!5e0!3m2!1sen!2sin!4v1783346551597!5m2!1sen!2sin" width="600" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="strict-origin-when-cross-origin"></iframe></div>
                    </div></form >
            </div>

            <Footer />
        </>
    )
}

export default Contact 