import React, { useEffect, useState, useContext } from 'react'
import Footer from '../User/components/Footer'
import Header from '../User/components/Header'
import { IoIosSearch } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import { getHomeBooksAPI } from '../service/allAPI'
import { searchContext } from '../contextshare/ShareContext'
import { toast } from 'react-toastify'



function Home() {

  const [homeBooks, setHomeBooks] = useState([]);

  const navigate = useNavigate()


  const { searchKey, setSearchKey } = useContext(searchContext)

  console.log("searchKey", searchKey)

  const getHomeBooks = async () => {
    try {
      const result = await getHomeBooksAPI();
      console.log(result);
      if (result?.status === 200) {
        setHomeBooks(result?.data);
      }
    } catch (error) {
      console.log('Something Went Wrong!!!', error);
    }
  };

  const handleSearch = () => {
    if (!searchKey) {
      toast.info("Please Input book title for Search!!!")
    } else if (!sessionStorage.getItem("token")) {
      toast.warning("Please Login!!!")
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    } else if (searchKey && sessionStorage.getItem("token")) {
      navigate('/books')
    } else {
      toast.error("Something Went Wrong!!!")
    }
  }


  useEffect(() => {
    getHomeBooks();
  }, []);

  console.log(homeBooks);
  return (
    <>
      <Header />

      <div style={{ height: "500px" }} className='flex flex-col justify-center items-center bg-[url("https://bookstore-dec25.vercel.app/landing.png")]
       '>

        <div style={{ height: "500px", backgroundColor: "rgba(0,0,0,0.3)" }} className='w-full flex flex-col justify-center items-center'>
          <h1 className='text-6xl font-bold text-white'>Wonderful gifts</h1>
          <p className='text-white'>Gift your family and friends a book</p>
          <div className='mt-9 flex items-center'>
            <input className='bg-white p-2 rounded-3xl w-100 text-black' type="text" onChange={(e) => setSearchKey(e.target.value)} placeholder='Search a book...' />
            <IoIosSearch onClick={handleSearch} className='text-gray-500 cursor-pointer text-2xl ' style={{ marginLeft: "-35px" }} />
          </div>
        </div>
      </div>

      {/* new arrivals */}
      <section className='flex flex-col justify-center items-center my-5 p-5'>

        <h1>
          NEW ARRIVAL
        </h1>
        <h1>Explore our latest collection</h1>
        <div className='grid grid-cols-4 w-full my-10'>
          {/* cards */}


          {homeBooks.length > 0 && homeBooks.map((item) => (
            <div className='shadow rounded p-3 m-4'>
              <img src="https://m.media-amazon.com/images/I/91bYsX41DVL.jpg" alt="" />
              <div className='flex flex-col mt-4 items'>
                <h2 className='font-bold text-blue-500 '>
                  {item.author}
                </h2>
                <h2 className='font-bold'>{item.bookTitle}</h2>
                <p className='text-red-500 font-bold'>
                  {item.price}
                </p>
              </div>

            </div>
          ))}

          {homeBooks.length === 0 && <p className='font-bold my-3'>Loading</p>}


        </div>
        <div className='text-center my-10'>
          <Link to={"/books"} className={'bg-black p-3 text-white'}>Explore More...
          </Link>

        </div>

      </section>


      {/* featured authors */}
      <div className="container mx-auto flex flex-row gap-10 p-10">
        <div className='w-full' >
          <h1 className='text-xl font-bold text-center pt-3'>FEATURED AUTHORS  </h1>
          <p className='text-gray-600 italic text-center pt-1 pb-3'>Captivates with every word</p>

          <p className='text-justify'>Welcome to the Author Spotlight section of our bookstore website! This feature is designed to celebrate writers, showcase their creative journeys, and help readers discover the minds behind their favorite books.</p>
          <p className='p-2'>Our Author Features include:</p>

          <p className='py-2 text-justify'>✨ <span className='font-bold'>Author Profiles:</span> Get to know each author through detailed profiles that highlight their biography, writing style, achievements, and personal inspirations.</p>
          <p className='py-2 text-justify'>📘  <span className='font-bold'>Published Works:</span> Explore a curated list of books written by the author with quick access to book details, reviews, and purchase options.</p>
          <p className='py-2 text-justify'>🖋️  <span className='font-bold'>Interviews & Insights:</span> Exclusive interviews, behind-the-scenes stories, and writing tips that offer a deeper look into the author’s creative world.</p>

        </div>
        <div className='w-full my-auto' >
          <img src="https://i.pinimg.com/736x/7d/30/b7/7d30b71704dc26d72daed5cbf5a263d4.jpg" alt="" />
        </div>

      </div>

      <div className='pb-10'>
        <h1 className='text-xl font-bold text-center pt-3'>TESTIMONIALS    </h1>
        <p className='text-gray-600 font-bold text-center pt-1 pb-3'>See What Others Are Saying</p>
        <div className='flex align-center justify-center text-center'>
          <img className='w-40 h-40 rounded-full object-cover' src="https://i.pinimg.com/1200x/01/c4/3b/01c43bbb39cf74d24c9190d4832a080c.jpg" alt="" />

        </div>
        <p className='text-gray-600 font-normal text-center pt-1 pb-3'>Luthur King</p>
        <p className='text-justify max-w-5xl mx-auto'>This bookstore has completely changed the way I discover new books. The recommendations are always spot‑on, and the delivery is super fast. I love the clean interface and the huge collection! The user experience is amazing! Easy navigation, great deals, and beautifully organized categories. I appreciate how quickly customer support responds too.</p>

      </div>

      <Footer />
    </>

  )
}

export default Home 