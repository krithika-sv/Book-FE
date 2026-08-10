import React, { useEffect, useState } from 'react'
import { FaBackward, FaRegEye } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { makePaymentAPI, viewBookAPI } from '../../service/allAPI';
import axiosInstance from '../../service/axiosInstance';
import { loadStripe } from '@stripe/stripe-js/pure';




function ViewBook() {
  const [modal, setModal] = useState(false);

  const [bookData, setBookData] = useState({})

  const [images, setImages] = useState([])

  const { id } = useParams();

  const getBookData = async () => {
    try {
      const result = await viewBookAPI(id);
      if (result.status == 200) {
        setBookData(result?.data)
        setImages(result?.data?.uploadImages)
      }
      console.log(result);
    } catch (error) {
      console.log('Something Went Wrong!!!');
    }
  };

  console.log("images", images)


  const handlePayment = async () => {
    try {

      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
      console.log(stripe);

      const result = await makePaymentAPI(id);
      console.log(result);

      window.location.href = result.data.checkoutURL;

    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getBookData();
  }, []);
  return (
    <>
      <div className='m-10'>
        <div className='border p-5 shadow border-gray-200'>
          <div className='grid grid-cols-4 gap-10'>
            <div className='col-span-1'>
              <img className='w-full' src="https://m.media-amazon.com/images/I/61ZKK6Y1nFL.jpg" alt="book image" />

            </div>

            <div className='col-span-3'>

              <div className='flex justify-between'>
                <h1 className='text-2xl font-bold'>Sapiens: A Brief History of Humankind</h1>
                <button className='me-5'><FaRegEye onClick={() => setModal(true)} /></button>
              </div>

              <h2 className='text-blue-600 font-bold text-xl my-5'>Yuval Noah Harari</h2>

              <div className='grid grid-cols-3 gap-5 my-10'>
                <p className='font-bold'>Publisher : {bookData.publisher}</p>
                <p className='font-bold'>Language : English</p>
                <p className='font-bold'>No. of Pages : 498</p>
                <p className='font-bold'>Category : History</p>
                <p className='font-bold'>ISBN : 9780062316097</p>
                <p className='font-bold'>Original Price : 35</p>
                <p className='font-bold'>Seller : max@gmail.com</p>
              </div>

              <h4 className='text-lg'>
                Abstract : Explores how Homo sapiens evolved to dominate the Earth through shared myths, cooperation, and culture, reshaping civilization as we know it.
              </h4>

              <div className='flex justify-end mt-10 gap-3'>
                <Link to={"/books"} className='bg-blue-900 p-2 font-bold text-white flex items-center gap-2'>
                  <FaBackward />Back
                </Link>
                <button className='bg-green-900 p-2 font-bold text-white' onClick={handlePayment}>Buy $199</button>
              </div>

            </div>

          </div>

        </div>

      </div>
      {/* Modal */}

      {/* {console.log("images", bookData.)} */}
      {modal && (
        // <div className='relative z-10 overflow-y-hidden'>
        <div className='bg-gray-500/75 fixed inset-0'>
          <div className='flex justify-center items-center min-h-screen'>
            <div className='bg-white rounded-2xl w-250'>
              <div className='bg-black text-white flex justify-between items-center p-3'>
                <h3>Book Images</h3>
                <button onClick={() => setModal(false)} className=''>X</button>
              </div>

              <p className='text-blue-600 p-5'>
                Camera click of the book in the hand of seller
              </p>

              <div className='md:flex flex-wrap my-4 overflow-y-hidden'>
                {
                  images.length > 0 && images.map((item, index) => (
                    <img
                      height={"250px"}
                      width={"250px"}
                      src={item ? `${axiosInstance.defaults.baseURL}/uploads/${item}` : "}https://bookstore-server-dec25.onrender.com/uploads/Image-1777696499098-md-img1.jpg"}
                      alt=""
                      className='mx-2 md:mb-0 mb-2'
                    />
                  ))
                }

                {images.length == 0 && <p className='font-bold text-red-700 ms-5'>
                  User uploaded book images are unavailable...
                </p>}
              </div>
            </div>
          </div>
        </div>
        // </div>
      )}
    </>
  )
}

export default ViewBook 