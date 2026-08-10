

import React, { useEffect, useState } from 'react'
import AdminHeader from '../Components/AdminHeader'
import AdminSidebar from '../Components/AdminSideBar'
import { approveBookAPI, getAdminBooksAPI, getAllUsers } from '../../service/allAPI'
import { toast } from 'react-toastify'

function AdminResources() {
  const [tabvalue, setTabvalue] = useState(0)

  const [bookData, setBookdata] = useState([])
  const [userData, setUserData] = useState([])

  const getbooks = async () => {
    const response = await getAdminBooksAPI()
    console.log("book", response)
    if (response.status == 200) {
      setBookdata(response.data)
    }
    else {
      toast.warning("Something went wrong")
    }
  }
  const getUsers = async () => {
    const response = await getAllUsers()
    console.log("user", response)
    if (response.status == 200) {
      setUserData(response.data)
    }
    else {
      toast.warning("Something went wrong")
    }
  }



  useEffect(() => {
    getbooks()
    getUsers()
  }, [])

  const approveBook = async (id) => {
    const response = await approveBookAPI(id)
    console.log("book", response)
    try {
      if (response.status == 200) {
        toast.success("Book approved successfully")
        getbooks()
      } else {
        toast.warning("something went wrong")
      }
    }

    catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <AdminHeader />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        {/* Sidebar */}
        <div className="col-span-1">
          <AdminSidebar />
        </div>

        {/* Main Content */}
        <div className="col-span-1 md:col-span-4">
          <div className="p-4 md:p-10">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-10">
              All Resources
            </h1>

            {/* Tabs */}
            <div className="flex justify-center items-center my-8 font-medium text-sm md:text-lg overflow-x-auto">
              <p onClick={() => setTabvalue(0)} className={tabvalue == 0 ? "px-4 py-3 border-gray-200 border-l border-t border-r rounded cursor-pointer whitespace-nowrap" : "px-4 py-3 border-gray-200 border-b rounded cursor-pointer whitespace-nowrap"}>
                Books
              </p>
              <p onClick={() => setTabvalue(1)} className={tabvalue == 1 ? "px-4 py-3 border-gray-200 border-l border-t border-r rounded cursor-pointer whitespace-nowrap" : "px-4 py-3 border-gray-200 border-b rounded cursor-pointer whitespace-nowrap"}>
                Users
              </p>
            </div>

            {/* Book Contents */}
            {tabvalue == 0 && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-5">
              {/* Duplicate according to books */}

              {bookData.length > 0 ?

                bookData.map((item, index) => (
                  <div key={index} className="shadow rounded p-3">
                    <img
                      className="w-full h-72 object-cover"
                      src={item.imageURL}
                      alt="book"
                    />

                    <div className="flex flex-col justify-center items-center mt-4">
                      <h2 className="text-blue-700 font-bold text-xl">
                        {item.author}
                      </h2>

                      <h3 className="text-lg text-center">
                        {item.bookTitle}
                      </h3>

                      <p className="font-bold text-red-500">
                        $ {item.discountPrice}
                      </p>

                      {item.status == "Pending" ? <button onClick={() => approveBook(item._id)} className="bg-green-600 text-white p-2 mt-3 w-full rounded">
                        APPROVE
                      </button> :
                        <img
                          className="w-24 mt-3"
                          src="https://static.vecteezy.com/system/resources/previews/016/774/415/large_2x/green-check-mark-icon-on-transparent-background-free-png.png"
                          alt="check mark icon"
                        />}



                    </div>
                  </div>
                ))


                : <div className="flex items-center justify-center text-center text-lg md:text-xl font-bold p-4">
                  Sorry!!! No books added yet..
                </div>}



            </div>}


            {/* User Contents */}
            {tabvalue == 1 && <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 my-8">
              {/* Duplicate according to users */}

              {userData.length > 0 ?

                userData.map((item, index) => (
                  <div className="rounded bg-gray-200 p-4">
                    <p className="text-red-500 font-bold text-md">
                      ID : {item._id}
                    </p>

                    <div className="flex mt-3 items-center">
                      <img
                        className="w-20 h-20 rounded-full object-cover"
                        src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
                        alt="user"
                      />

                      <div className="flex flex-col ml-3 w-full">
                        <h4 className="text-blue-500 font-bold text-md">
                          {item.username}
                        </h4>

                        <p className="text-xs break-all">
                          {item.email}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
                : <div className="flex items-center justify-center text-center text-lg md:text-xl font-bold p-4">
                  Sorry!!! Currently no users are registered...
                </div>}



            </div>}

          </div>
        </div>
      </div>
    </>
  )
}

export default AdminResources