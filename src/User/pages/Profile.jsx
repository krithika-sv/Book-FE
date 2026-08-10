import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaEdit } from 'react-icons/fa';
import UploadBook from '../components/UploadBook';
import BookStatus from '../components/BookStatus';
import PurchaseHistory from '../components/PurchaseHistory';
import EditUserProfile from '../components/EditUserProfile';
import Footer from '../components/Footer';
import axiosInstance from '../../service/axiosInstance';


function Profile() {

  const [tab, getTabValue] = useState(1)
  const [username, setUsername] = useState("")
  const [bio, setBio] = useState("")
  const [dp, setDp] = useState("")

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("user"))
    console.log(data)
    setUsername(data?.username)
    setBio(data?.bio)
    setDp(data?.profileImage)
  }, [])

  return (
    <>
      <Header />
      <div style={{ height: "200px", backgroundColor: "black" }}></div>

      <div
        className="flex items-center justify-center"
        style={{
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          marginTop: "-100px",
          marginLeft: "70px",
          backgroundColor: "white",
        }}
      >
        <img
          style={{ borderRadius: "50%", width: "200px", height: "200px" }}
          src={
            dp === ""
              ? "https://i.pinimg.com/736x/16/18/20/1618201e616f4a40928c403f222d7562.jpg"
              : dp.startsWith("https://lh3.googleusercontent.com/")?dp: `${axiosInstance.defaults.baseURL}/uploads/${dp}`
          }
          alt="profile image"
        />

      </div>

      <div className='flex justify-between px-5 mt-5 '>
        <h1 className='flex items-center gap-3 ps-20'>{username}<RiVerifiedBadgeFill className='text-blue-500' />
        </h1>
        <EditUserProfile />

      </div>

      <p className='text-xl font-bold px-20 mt-5'>{bio}</p>
      <p className='text-justify px-20 mt-5'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut similique totam odio quidem sit earum laborum in harum at ducimus, officia molestiae voluptas aut exercitationem atque quasi aliquid. Qui, eum.</p>



      {/* tab structure */}
      <div className='flex gap-5 items-center justify-center mt-5'>
        <p
          onClick={() => getTabValue(1)}
          className={
            tab == 0
              ? 'p-4 border-gray-200 border-l border-t border-r rounded cursor-pointer'
              : 'p-4 border-gray-200 border-b rounded cursor-pointer'
          }
        >
          Upload Book
        </p>
        <p
          onClick={() => getTabValue(2)}
          className={
            tab == 2
              ? 'p-4 border-gray-200 border-l border-t border-r rounded cursor-pointer'
              : 'p-4 border-gray-200 border-b rounded cursor-pointer'
          }
        >
          Upload Book status
        </p>
        <p
          onClick={() => getTabValue(3)}
          className={
            tab == 3
              ? 'p-4 border-gray-200 border-l border-t border-r rounded cursor-pointer'
              : 'p-4 border-gray-200 border-b rounded cursor-pointer'
          }
        >
          Purchase History
        </p>
      </div>


      {tab === 1 ? <div><UploadBook /></div> : tab === 2 ? <div><BookStatus /></div> : <div><PurchaseHistory /></div>}
      <Footer />
    </>
  )
}

export default Profile 