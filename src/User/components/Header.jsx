import React, { useEffect, useState, useContext } from 'react'
import { FaFacebookSquare, FaInstagramSquare } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'
import { IoPerson } from 'react-icons/io5'
import { TiThLargeOutline, TiThMenuOutline } from 'react-icons/ti'
import { Link, useNavigate } from 'react-router-dom'
import { IoLogOut } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import axiosInstance from '../../service/axiosInstance'
import { routeContext } from '../../contextshare/RouteGaurdContext'




function Header() {

  const [toggle, setToggle] = useState(false)
  const [dropdown, setDropdown] = useState(false)
  const [token, setToken] = useState("")
  const [dp, setDp] = useState("")
  const { role, setRole, authorisedUser, setAuthorisedUser } = useContext(routeContext)
  console.log("dp", dp)

  const navigate = useNavigate()


  useEffect(() => {
    console.log("token", sessionStorage.getItem("token"))
    setToken(sessionStorage.getItem("token"))
    const data = JSON.parse(sessionStorage.getItem("user"))
    setDp(data?.profileImage)

    console.log("data", data?.profileImage)
  }, [])

  const logout = () => {
    sessionStorage.clear(), navigate("/login")
    setAuthorisedUser(false)
    setToken("")
    setDp("")
    setDropdown(false)
  }
  return (
    <>

      <div className='grid grid-cols-3 p-3'>
        {/* logo */}
        <Link to={"/"} className='ms-5 flex items-center'>
          <img width={"50px"} height={"50px"} src="https://pngimg.com/uploads/book/book_PNG2107.png" alt="" />
          <h1 className='text-3xl font-bold ms-3 md:hidden'>
            Bookstore
          </h1>
        </Link>
        <div className='md:flex justify-center items-center hidden'>
          <h1 className='text-3xl font-bold'>
            Bookstore
          </h1>

        </div>
        <div className='md:flex hidden justify-center items-center'>
          <FaFacebookSquare className='text-2xl me-2' />
          <FaInstagramSquare className='text-2xl me-2' />
          <FaSquareXTwitter className='text-2xl me-2' />
          <div className='ms-10'>
            {/* <Link to={"/login"} className='flex items-center shadow-sm rounded p-2  hover:bg-black hover:text-white'> <IoPerson className='me-1' />Login</Link> */}
            {!token ? (
              <div className='ms-10'>
                <Link
                  to={"/login"}
                  className='flex items-center shadow-sm rounded border border-black px-3 py-2 hover:bg-black hover:text-white'
                >
                  <IoPerson className='me-1' />Login
                </Link>
              </div>
            ) : (
              <div className='me-0'>
                <button onClick={() => setDropdown(!dropdown)}>
                  <img
                    width={"40px"}
                    height={"40px"}
                    style={{ borderRadius: "50%" }}
                    src={
                      dp == ""
                        ? "https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1v1IzBn2cAKKALByHBVPJ8gEiIg="
                        : `${axiosInstance.defaults.baseURL}/uploads/${dp}`
                    }
                    alt=""
                  />
                </button>
                {dropdown && (
                  <div className='absolute bg-white px-4 py-3 rounded rounded-5 shadow'>
                    {/* profile */}
                    <Link
                      to={"/profile"}
                      className='flex items-center text-gray-600 text-sm px-3 py-2 gap-2'
                    >
                      <IoSettings />
                      Profile
                    </Link>
                    {/* logout */}
                    <button onClick={logout} className='flex items-center text-gray-600 text-sm px-3 py-2 gap-2'>
                      <IoLogOut />

                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>

      <nav className='bg-black w-full text-white md:flex justify-center items-center'>

        <div className='flex justify-between items-center pb-2 text-2xl w-full mx-5 md:hidden'>
          <button >
            <TiThMenuOutline onClick={() => setToggle(!toggle)} /></button>
          {!token ? (
            <div className='ms-10'>
              <Link
                to={"/login"}
                className='flex items-center shadow-sm rounded border border-black px-3 py-2 hover:bg-black hover:text-white'
              >
                <IoPerson className='me-1' />Login
              </Link>
            </div>
          ) : (
            <div className='me-0'>
              <button onClick={() => setDropdown(!dropdown)}>
                <img
                  width={"40px"}
                  height={"40px"}
                  style={{ borderRadius: "50%" }}
                  src={
                    dp == ""
                      ? "https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1v1IzBn2cAKKALByHBVPJ8gEiIg="
                      : `${axiosInstance.defaults.baseURL}/uploads/${dp}`
                  }
                  alt=""
                />
              </button>
              {dropdown && (
                <div className='absolute bg-white px-4 py-3 rounded rounded-5 shadow'>
                  {/* profile */}
                  <Link
                    to={"/profile/:id"}
                    className='flex items-center text-gray-600 text-sm px-3 py-2 gap-2'
                  >
                    <IoSettings />
                    Profile
                  </Link>
                  {/* logout */}
                  <button className='flex items-center text-gray-600 text-sm px-3 py-2 gap-2'>
                    <IoLogOut />

                    Logout
                  </button>
                </div>
              )}
            </div>
          )}



        </div>
        <ul className={toggle ? 'flex flex-col ms-2' : 'md:flex gap-10 p-3 hidden'}>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/books"}>Books</Link>
          </li>
          <li>
            <Link to={"/contact"}>Contact</Link>
          </li>

        </ul>

      </nav>
    </>)
}

export default Header  