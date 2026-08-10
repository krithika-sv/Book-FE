import React, { use, useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa';
import { RiImageEditLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { updateUserProfileAPI } from '../../service/allAPI'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../service/axiosInstance';


function EditUserProfile() {

    const [offCanvas, setOffCanvas] = useState(false)

    const [existingProfileImage, setexistingProfileImage] = useState("")

    const [userId, setuserId] = useState("")
    const [userData, setUserData] = useState({
        username: "",
        password: "",
        cPassword: "",
        profileImage: "",
        bio: ""
    });
    console.log("existingProfileImage", existingProfileImage)

    const navigate = useNavigate()

    const [isPasswordMatch, setPasswordMatch] = useState(false)
    console.log(userData);

    const [preview, setPreview] = useState("")


    const checkPasswordMatch = (data) => {

        setUserData({ ...userData, cPassword: data }),
            userData.password == data ? setPasswordMatch(true) : setPasswordMatch(false)

    }

    // handleReset
    const handleReset = () => {
        if (sessionStorage.getItem("user")) {
            const data = JSON.parse(sessionStorage.getItem("user"));
            setUserData({
                ...userData,
                username: data.username,
                bio: data.bio,
                password: "",
                cPassword: "",
            });
            setexistingProfileImage(data?.profileImage);
            setPreview("");
            setPasswordMatch(true);
        }
    };

    // file upload
    const handleFileUpload = (e) => {
        // console.log(e.target.files[0]);
        const imageFile = e.target.files[0];
        if (imageFile.type.startsWith("image/")) {
            setUserData({ ...userData, profileImage: imageFile });

            //convert file name to preview url to display
            const imageURL = URL.createObjectURL(imageFile);
            console.log(imageURL);
            setPreview(imageURL);
        }
    };


    // handle update user data
    const handleUpdate = async () => {
        const { username, password, cPassword, bio, profileImage } = userData;
        if (!username || !password || !cPassword || !bio) {
            toast.info("Please Fill the form Completely!!!");
        } else if (isPasswordMatch) {
            // toast.success("Ready for API");
            const reqBody = new FormData();
            for (let key in userData) {
                if (key !== profileImage) {
                    reqBody.append(key, userData[key]);
                } else {
                    reqBody.append("profileImage", profileImage);
                }
            }

            const result = await updateUserProfileAPI(userId, reqBody);
            console.log(result);

            if (result.status === 200) {
                toast.success("Profile Updated Successfully");
                setTimeout(() => {
                    sessionStorage.clear();
                    navigate("/login");
                }, 2500);
            } else {
                toast.error("Something Went Wrong");
            }


        }
    };


    useEffect(() => {


        if (sessionStorage.getItem("user")) {
            const data = JSON.parse(sessionStorage.getItem("user"));
            console.log(data);
            setUserData({
                ...userData,
                username: data.username,

                // password: data.password,
                // cPassword: data.password,
                bio: data.bio
            });
            setuserId(data?._id)
            setexistingProfileImage(data?.profileImage)
        }
    }, []);




    return (
        <>
            <button className='flex p-3 items-center border border-black text-black  rounded-xl gap-3 hover:text-white hover:bg-black'
                onClick={() => {setOffCanvas(true),handleReset()}}
            >
                Edit <FaEdit />
            </button>


            {offCanvas && (

                <div className="bg-gray-500/75 fixed inset-0">
                    <div className="flex justify-center items-center w-100 top-0 left-0">
                        <div className="bg-white rounded-2xl w-250">
                            <div className="bg-black text-white flex justify-between items-center p-3">
                                <h3>Update User Profile</h3>
                                <button onClick={() => setOffCanvas(false)} className="">
                                    X
                                </button>
                            </div>
                            {/* body */}
                            <div className="flex justify-center items-center flex-col my-5">
                                <label htmlFor="userProfile">

                                    <input onChange={(e) => handleFileUpload(e)} type="file" hidden id="userProfile" name="userProfile" />
                                    {/* <img
                                        style={{ width: "100px", height: "100px", borderRadius: "50%" }}

                                        src={preview == "" ? "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png" : preview}
                                        // src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
                                        alt=""
                                    /> */}
                                    <input
                                        onChange={(e) => handleFileUpload(e)}
                                        type="file"
                                        hidden
                                        id="userProfile"
                                        name="userProfile"
                                    />

                                    {
                                        existingProfileImage == "" ? (
                                            <>
                                                <img
                                                    style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                                                    src={
                                                        preview == ""
                                                            ? "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
                                                            : preview
                                                    }
                                                    alt=""
                                                />
                                                <div
                                                    className="bg-black text-white px-3 py-2 rounded fixed"
                                                    style={{ marginLeft: "60px", marginTop: "-30px" }}
                                                >
                                                    <RiImageEditLine />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <img
                                                    style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                                                    src={
                                                        preview
                                                            ? preview
                                                            : `${axiosInstance.defaults.baseURL}/uploads/${existingProfileImage}`
                                                    }
                                                    alt=""
                                                />
                                                <div
                                                    className="bg-black text-white px-3 py-2 rounded fixed"
                                                    style={{ marginLeft: "60px", marginTop: "-30px" }}
                                                >
                                                    <RiImageEditLine />
                                                </div>
                                            </>
                                        )
                                    }

                                    <div
                                        className="bg-black text-white px-3 py-2 rounded fixed"
                                        style={{ marginLeft: "60px", marginTop: "-30px" }}
                                    >
                                        <RiImageEditLine />
                                    </div>
                                </label>

                                <div className='mt-3 text-amber-500 text-sm'>
                                    accept only images
                                </div>
                                <div className="mt-10 mb-3 w-full px-5">
                                    <input
                                        type="text"
                                        placeholder="UserName"
                                        value={userData?.username}
                                        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                                        className="w-full border border-gray-300 rounded p-2"
                                    />
                                </div>

                                <div className="mt-2 mb-3 w-full px-5">
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        value={userData?.password}
                                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                                        className="w-full border border-gray-300 rounded p-2"
                                    />
                                </div>

                                <div className="mt-2 mb-3 w-full px-5">
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={userData?.cPassword}
                                        onChange={(e) => checkPasswordMatch(e.target.value)}
                                        className="w-full border border-gray-300 rounded p-2"
                                    />

                                    {!isPasswordMatch && <p className='mt-3 text-amber-500 text-sm'>The password doesn't match</p>}
                                </div>

                                <div className="mt-2 mb-3 w-full px-5">
                                    <input
                                        type="text"
                                        placeholder="Bio"
                                        value={userData?.bio}
                                        onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                                        className="w-full border border-gray-300 rounded p-2"
                                    />
                                </div>

                                <div className="flex justify-end w-full px-5 mt-5 gap-5">
                                    <button className="bg-yellow-600 text-white py-2 px-3" onClick={handleReset}>Reset</button>
                                    <button className="bg-green-600 text-white py-2 px-3" onClick={handleUpdate}>Update</button>
                                </div>

                            </div>
                        </div>
                    </div>





                </div>

            )}


        </>
    )
}

export default EditUserProfile