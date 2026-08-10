import React, { useEffect, useState } from 'react'
import { FaDatabase } from 'react-icons/fa'
import { FaChartSimple, FaGear } from 'react-icons/fa6'
import { Link } from 'react-router-dom'


function AdminSideBar() {

    const [username, setusername] = useState("")
    useEffect(() => {

        if (sessionStorage.getItem("user")) {
            const data = JSON.parse(sessionStorage.getItem("user"))
            console.log("data1", data)
            setusername(data.username)
        }
    }, [])

    return (
        <div className='bg-blue-100 md:min-h-screen h-fit py-10'>
            {/* image */}
            <div className="flex justify-center">
                <img style={{ width: '100px', height: '100px', borderRadius: '50%' }} className='border border-gray-300 z-52' src={"https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"} alt="user" />
            </div>
            {/* name */}
            <h3 className="text-xl font-bold my-5 text-center">{username}</h3>
            {/* links */}
            <div className="mt-10 flex flex-col justify-center items-center">
                <div className="mt-3">
                    <Link to={'/admindashboard'} className='flex items-center '> <FaChartSimple className='me-2' /> Dashboard</Link>
                </div>
                <div className="mt-3">
                    <Link to={'/adminresources'} className='flex items-center '> <FaDatabase className='me-2' /> Collections</Link>
                </div>
                <div className="mt-3">
                    <Link to={'/adminsettings'} className='flex items-center '> <FaGear className='me-2' /> Settings</Link>
                </div>
            </div>
        </div>
    )
}

export default AdminSideBar