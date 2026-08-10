import React, { useEffect, useState } from 'react'
import { getUserUploadBooksAPI } from '../../service/allAPI';

function BookStatus() {
  const [allBooksStatus, setAllBooksStatus] = useState([]);


  const getUserUploadBooks = async () => {
    try {
      const result = await getUserUploadBooksAPI();
      // console.log(result);
      setAllBooksStatus(result?.data)
    } catch (error) {
      console.log('Something went wrong!!!');
      console.log(error);
    }
  };

  // handleDelete
  const handleDelete = async (id) => {
    try {
      const result = await removerUserAddedBookAPI(id);
      console.log(result);
      if (result.status === 200) {
        getUserUploadBooks();
        toast.success("Book Deleted Successfully!!!");
      } else {
        toast.error("Something Went Wrong!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getUserUploadBooks();
  }, []);

  console.log("allBooksStatus", allBooksStatus)

  return (
    <>
      <div className="m-20 my-15 shadow rounded">
        {
          allBooksStatus.length > 0 ?
            allBooksStatus.map((item, index) => (
              <div key={index} className="m-5 rounded mt-4 bg-gray-100">
                <div className="grid items-center grid-cols-[3fr_1fr]">
                  <div className="px-4">
                    <h1 className='text-2xl'>{item.bookTitle}</h1>
                    <h2 className='text-xl'>{item.author}</h2>
                    <h3 className='text-lg'>{item.discountPrice}</h3>
                    <p><span>ABSTRACT : </span>
                      {item.abstract}
                    </p>
                    <div className="flex mt-5">
                      {item.status == "Pending" && <img
                        width="120px"
                        height="120px"
                        src="https://png.pngtree.com/png-clipart/20230918/original/pngtree-pending-review-stamp-check-picture-image_13053786.png"
                        alt=""
                      />}
                      {item.status == "Approved" && <img
                        width="120px"
                        height="120px"
                        src="https://png.pngtree.com/recommend-works/png-clipart/20241211/ourmid/pngtree-approved-rubber-stamp-png-image_13872953.png"
                        alt=""
                      />}
                      {item.status == "Sold" && <img
                        width="120px"
                        height="120px"
                        src="https://cdn-icons-png.flaticon.com/512/6188/6188726.png"
                        alt=""
                      />}
                    </div>
                  </div>
                  <div className="px-4 mt-4">
                    <img
                      src={item.imageURL}
                      alt=""
                      className="w-full"
                    />
                    <button onClick={() => handleDelete(item?._id)} className="bg-red-600 text-white p-2 rounded float-end mt-3">
                      Delete
                    </button>
                  </div>

                </div>

              </div>
            ))
            :
            <div className='font-bold text-xl p-5'>
              You haven't upload any books!!!......
            </div>
        }
      </div>
    </>)
}

export default BookStatus