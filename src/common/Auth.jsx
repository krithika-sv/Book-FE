import React, { useContext, useState } from 'react'
import { FaRegCircleUser } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { useFormik, validateYupSchema } from 'formik';
import * as Yup from 'yup'
import { googleAuthenticationAPI, loginAPI, registerAPI } from '../service/allAPI';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { routeContext } from '../contextshare/RouteGaurdContext';



function Auth({ insideRegister }) {

  const [show, setShow] = useState(false)

  const { role, setRole, authorisedUser, setAuthorisedUser } = useContext(routeContext)


  const navigate = useNavigate()

  const formik = useFormik({

    // initialValues
    initialValues: {
      username: "",
      email: "",
      password: ""
    },

    // validation
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Must be atleast 3 characters"),
      // .required("Username Required!!!"),
      email: Yup.string()
        .email("Invalid Email!!!")
        .required("Email Required!!!"),
      password: Yup.string()
        .required("Password Required!!!")
    }),

    // onsubmit
    onSubmit: (values) => {
      console.log("values", values);
      if (insideRegister) {
        console.log(`Register API Call`);
        handleRegister(values)
      } else {
        console.log(`Login API call`);
        handleLogin(values)
      }
      formik.resetForm()
    }
  });

  // user register
  const handleRegister = async (userData) => {
    try {
      const result = await registerAPI(userData);
      if (result.status === 201) {
        toast.success("Registered successfully")
        navigate("/login")
        // alert("Registered successfully")
      } else {
        toast.error("Something went wrong")
        // alert("Something went wrong")

      }

    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (userData) => {
    try {
      const result = await loginAPI(userData);
      console.log(result);

      if (result.status === 200) {
        // alert("Login Successful");
        toast.success("Login Successful")
        console.log(result.data)
        sessionStorage.setItem("user", JSON.stringify(result.data.existingUser));
        sessionStorage.setItem("token", result.data.token);

        setAuthorisedUser(true)

        if (result.data.existingUser.role === "admin") {
          setRole("admin")
          navigate("/admindashboard");
        } else {
          setRole("user")
          navigate("/");
        }
      } else if (result.status === 409) {
        toast.warning("Invalid credentials!");
      } else if (result.status === 400) {
        toast.warning("Account does not exist! Please register!");
      } else {
        toast.error("Something went wrong");

      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle Google Login
  const handleGoogleLogin = async (credentialResponse) => {
    console.log(credentialResponse.credential);
    const { email, name, picture } = jwtDecode(credentialResponse.credential);
    console.log(email, name, picture);

    try {
      const result = await googleAuthenticationAPI({
        email,
        username: name,
        profileImage: picture,
      });
      console.log(result);
      if (result.status == 200) {
        toast.success(`Login Successfull!!!`);
        setAuthorisedUser(true)

        sessionStorage.setItem("user", JSON.stringify(result.data.existingUser));
        sessionStorage.setItem("token", result.data.token);

        if (result.data.existingUser.role === "admin") {
          setRole("admin")
          navigate("/admindashboard");
        } else {
          setRole("user")
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center flex-col bg-[url('https://plus.unsplash.com/premium_photo-1681487916420-8f50a06eb60e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxZWFyY2h8MXx8bG9naW4lMjBwYWdlfGVufDB8fHww&fm=jpg&q=60&w=3000')] bg-cover bg-center">
        <div className='p-10'>
          <h1 className='text-3xl font-bold text-center'>BOOKSTORE</h1>
          <div style={{ width: "400px" }} className='bg-blue-950 text-white p-5 flex flex-col my-5 justify-center items-center'>
            <div style={{ width: "100px", height: "100px", borderRadius: "50%" }} className='border mb-3 flex justify-center items-center'>
              <FaRegCircleUser className='text-6xl' />
            </div>

            <h1 className='text-2xl'>{insideRegister ? "Register" : "Login"}</h1>

            <form action="" onSubmit={formik.handleSubmit}>
              {insideRegister && (
                <div className='my-5'>
                  <label htmlFor="">Username</label>
                  <input
                    name='username'
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    type="text"
                    placeholder="Username"
                    className='bg-white p-2 w-full rounded mt-2 placeholder-gray-500 text-black'
                  />
                  <div className='my-2 text-xs text-yellow-400'>{formik.errors.username}</div>
                </div>
              )}


              <div className="my-5">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  name='email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  placeholder="Email"
                  className="bg-white p-2 w-full rounded mt-2 placeholder-gray-500 text-black"
                />
                <div className='my-2 text-xs text-yellow-400'>{formik.errors.email}</div>
              </div>

              <div className="mt-5 ">
                <label htmlFor="">Password</label>
                <div className="flex items-center relative">
                  <input
                    placeholder="Password"
                    name='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    type={show ? "text" : "password"}
                    className="bg-white p-2 w-full rounded mt-2 placeholder-gray-500 text-black"
                  />
                  <span onClick={() => setShow(!show)}>{show ? <FaEye className='absolute right-3 top-5 text-gray-500 bg-white ' /> : <IoMdEyeOff className='absolute right-3 top-5 text-gray-500 bg-white ' />}</span>

                </div>
                <div className='my-2 text-xs text-yellow-400'>{formik.errors.password}</div>
              </div>

              <div className="mt-2">
                <p className="text-xs text-orange-400">
                  *Never share your password with others
                </p>
              </div>
              <div className="mt-4">
                {insideRegister ? (
                  <button type="submit" className="bg-green-700 p-2 w-full rounded">
                    Register
                  </button>
                ) : (
                  <button type="submit" className="bg-green-700 p-2 w-full rounded">
                    Login
                  </button>
                )}
              </div>

              <div className='mt-3 flex justify-center items-center'>
                {/* Google Authentication */}
                <GoogleLogin
                  onSuccess={credentialResponse => {
                    handleGoogleLogin(credentialResponse)
                    console.log(credentialResponse);
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />
              </div>

              <div className="mt-3">
                {insideRegister ? (
                  <p>
                    Are you already a user?{" "}
                    <Link className="text-blue-400" to="/login">
                      Login
                    </Link>
                  </p>
                ) : (
                  <p>
                    Are you a new user?{" "}
                    <Link className="text-blue-400" to="/register">
                      Register
                    </Link>
                  </p>
                )}
              </div>



            </form>
          </div>
        </div>
      </div>

    </>
  )
}

export default Auth 