import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSideBar'
import { FaPeopleGroup } from 'react-icons/fa6'
import { FaBook, FaUsers } from 'react-icons/fa'
import { getCountAPI } from '../../service/allAPI'

function AdminDashboard() {

  const [count, setcount] = useState("")
  console.log("count", count)

  const getcount = async () => {
    const response = await getCountAPI()
    setcount(response.data)
    console.log("response", response.data)
  }

  useEffect(() => {
    getcount()
  }, [])
  return (
    <>
      <AdminHeader />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        {/* Sidebar */}
        <div className="col-span-1">
          <AdminSidebar />
        </div>

        {/* Main Content */}
        <div className="col-span-1 md:col-span-4 mt-6 md:mt-10 p-4 md:p-6">

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Card 1 */}
            <div>
              <div className="bg-orange-100 px-4 py-8 flex items-center justify-center rounded shadow">
                <FaBook className="text-5xl" />

                <div className="text-center ms-6">
                  <h3 className="text-lg font-medium">Books</h3>
                  <h3 className="text-2xl font-bold">{count?.bookscount}+</h3>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div>
              <div className="bg-red-100 px-4 py-8 flex items-center justify-center rounded shadow">
                <FaUsers className="text-5xl" />

                <div className="text-center ms-6">
                  <h3 className="text-lg font-medium">Users</h3>
                  <h3 className="text-2xl font-bold">{count?.userscount}+</h3>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div>
              <div className="bg-yellow-100 px-4 py-8 flex items-center justify-center rounded shadow">
                <FaPeopleGroup className="text-5xl" />

                <div className="text-center ms-6">
                  <h3 className="text-lg font-medium">Employees</h3>
                  <h3 className="text-2xl font-bold">100+</h3>
                </div>
              </div>
            </div>

          </div>

          {/* Chart Titles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

            <div className="font-bold text-lg bg-white rounded shadow p-4 text-center">
              Book Purchase Ratio
            </div>

            <div className="font-bold text-lg bg-white rounded shadow p-4 text-center">
              Growth Ratio - (Yearly)
            </div>

          </div>

        </div>
      </div>
    </>
  )
}

export default AdminDashboard