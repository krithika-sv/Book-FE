import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { getALLbooksAPI } from '../../service/allAPI';
import { useContext } from 'react';
import { searchContext } from '../../contextshare/ShareContext';


function Books() {

  const [allBooks, setAllBooks] = useState([]);
  const [token, setToken] = useState("");

  const [tempAllBooks, setTempAllBooks] = useState([])

  const [catogorylist, setCategoryList] = useState([])

  const { searchKey, setSearchKey } = useContext(searchContext)


  console.log("catogorylist", catogorylist)

  const getAllBooks = async () => {
    try {
      const result = await getALLbooksAPI(searchKey);
      console.log(result);

      if (result?.status === 200) {
        setAllBooks(result?.data);
        setTempAllBooks(result?.data)

        const temp = result?.data.map((item) => item.category)

        setCategoryList([...new Set(temp)])
      } else {
        console.log('Server Error');
      }
    } catch (error) {
      console.log('Something went wrong');
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, [searchKey])

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
  }, [])

  // handleFilter
  const handleFilter = (category) => {
    console.log(category);
    if (category !== "all") {
      setAllBooks(tempAllBooks.filter((book) => book.category === category));
    } else {
      getAllBooks();
    }
  };

  return (


    <>
      <Header />

      {token ? <> <div className='flex flex-col justify-center items-center my-3'>
        <h1 className='text-3xl font-bold my-5' >All Books</h1>
        <div className='flex my-5'>
          <input type='text' value={searchKey} onChange={(e) => setSearchKey(e.target.value)} placeholder='Search Books by title' className='p-2 border border-gray-200 w-100' type="text" />
          <button className='p-2 bg-blue-800 text-white'>
            Search
          </button>
        </div>
      </div>

        <div className='grid grid-cols-4 p-5 px-40 mb-10'>
          <div className='col-span-1'>
            <h1>Filter</h1>
            <div className='flex pt-3'>
              <input type="radio" name='filter' id='all' onChange={() => handleFilter("all")} />
              <label className='ms-3' htmlFor="all">All</label>

            </div>
            {
              catogorylist.map((category, index) => (
                <div key={index} className='flex pt-3'>
                  <input type="radio" name='filter' id='category' onChange={() => handleFilter(category)} />
                  <label className='ms-3' htmlFor="category">{category}</label>

                </div>
              ))
            }

          </div>
          <div className='col-span-3'>
            <div className='grid grid-cols-4 w-full'>

              {
                allBooks?.length > 0 ? (
                  allBooks?.map((item, index) => (
                    <div key={index} className="shadow rounded p-3 m-4">
                      <img
                        width="100%"
                        style={{ height: '250px' }}
                        src={item?.imageURL}
                        alt=""
                      />
                      <div className="flex flex-col mt-4 items-center">
                        <h2 className="font-bold text-blue-500">{item?.author}</h2>
                        <h2 className="font-bold">{item?.bookTitle}</h2>
                        <p className="font-bold text-red-500">${item?.discountPrice}</p>
                        <Link
                          to={`/view/${item?._id}/book`}
                          className="bg-blue-800 p-3 text-white mt-2"
                        >
                          View Book
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center my-5 font-bold">Books Not Found!!!</div>
                )
              }



              {/* <div className='text-center font-bold my-5'>
                Book Not Found!.....
              </div> */}

            </div>

          </div>

        </div></> : <>
        <div className='w-full h-screen flex justify-center items-center flex-col'>
          <img className='w-70' src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" alt="Login Ocon" />
          <p className='text-lg font-bold my-15 '>Please <Link to={"/login"} className='text-blue-600 underline'>Login</Link>  to explore more</p>
        </div></>}


      <Footer />

    </>)
}

export default Books  