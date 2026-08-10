import React, { useEffect, useState } from 'react'
import { getPurchaseHistoryDataAPI } from '../../service/allAPI';

function PurchaseHistory() {

  const [purchasedData, setPurchasedData] = useState([])

  console.log("purchasedData", purchasedData)

  const getPurchaseHistoryData = async () => {

    const response = await getPurchaseHistoryDataAPI()
    if (response.status == 200) {
      setPurchasedData(response?.data)
      console.log("purchase data", response?.data)

    }
    else {
      console.log("Something went wrong")
    }

  }

  useEffect(() => {
    getPurchaseHistoryData();
  }, []);


  return (
    <>
      <div className="m-20 my-15 shadow rounded">
        {/* {console.log("purchasedData.length(", purchasedData?.length())} */}
        {purchasedData.length > 0 ?

          purchasedData.map((item, index) => (
            <div className="m-5 rounded mt-4 py-15 bg-gray-100">
              <div className="grid items-center grid-cols-[3fr_1fr]">
                <div className="px-4">
                  <h1 className='text-2xl'>{item.bookTitle}</h1>
                  <h2 className='text-xl'>{item.author}</h2>
                  <h3 className='text-lg'>{item.discountPrice
                  }</h3>
                  <p><span>ABSTRACT : </span>
                    {item.abstract}
                  </p>
                  <div className="flex mt-5">
                    <img
                      width="120px"
                      height="120px"
                      src="https://static.vecteezy.com/system/resources/previews/023/629/698/non_2x/web-button-icon-purchase-button-free-png.png"
                      alt=""
                    />

                  </div>
                </div>
                <div className="px-4 mt-4">
                  <img
                    src={item.imageURL}
                    alt=""
                    className="w-full"
                  />
                  <button className="bg-red-600 text-white p-2 rounded float-end mt-3">
                    Delete
                  </button>
                </div>

              </div>

            </div>
          ))

          :
          <div className='font-bold text-xl p-5'>
            You haven't purchased any books!!!......
          </div>}


      </div>

    </>
  )
}

export default PurchaseHistory