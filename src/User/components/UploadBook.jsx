import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { addNewBookAPI, generateAbstractAPI } from '../../service/allAPI';
import useDebounce from '../../Hooks/useDebounce';


function UploadBook() {


    const [bookDetails, setBookDetails] = useState({
        bookTitle: "",
        publisher: "",
        author: "",
        isbn: "",
        imageURL: "",
        language: "",
        totalPages: "",
        category: "",
        price: "",
        discountPrice: "",
        abstract: "",
        uploadImages: [],
    });
    const debounceTitleSearch = useDebounce(bookDetails?.bookTitle, 1000)

    const [preview, setPreview] = useState("")
    const [previewList, setPreviewList] = useState([])
    // console.log(bookDetails);

    // handleUploadBookImage
    const handleImageUpload = (e) => {
        const imageFile = e.target.files[0];
        if (bookDetails.uploadImages.length >= 3) {
            toast.info("Only 3 Images Can be added!!!");
        } else {
            const uploadBookImageArray = bookDetails.uploadImages;
            uploadBookImageArray.push(imageFile);
            setBookDetails({ ...bookDetails, uploadImages: uploadBookImageArray });
            const url = URL.createObjectURL(imageFile);
            console.log(url);

            setPreview(url);
            const demoPreviewList = previewList;
            demoPreviewList.push(url);
            setPreviewList(demoPreviewList);
        }
    };

    // handleAddBook
    const handleAddBook = async () => {
        const {
            bookTitle,
            publisher,
            author,
            isbn,
            imageURL,
            language,
            totalPages,
            category,
            price,
            discountPrice,
            abstract,
            uploadImages,
        } = bookDetails;

        if (
            !bookTitle ||
            !publisher ||
            !author ||
            !isbn ||
            !imageURL ||
            !language ||
            !totalPages ||
            !category ||
            !price ||
            !discountPrice ||
            !abstract ||
            uploadImages.length == 0
        ) {
            toast.info("Fill all the details!!!");
        } else {
            // api call
            const reqBody = new FormData();
            for (let key in bookDetails) {
                if (key != "uploadImages") {
                    reqBody.append(key, bookDetails[key]);
                } else {
                    bookDetails.uploadImages.forEach((imageFile) => {
                        reqBody.append("uploadImages", imageFile);
                    });
                }
            }
            const result = await addNewBookAPI(reqBody);
            console.log(result);
            if (result.status == 200) {
                toast.success('Book Added Successfully!!!')
                handleReset()
            } else if (result.status == 409) {
                toast.warning('Book Already Exists!!!')
            } else {
                toast.error('Something Went Wrong')
            }

        }
    };

    //handle reset

    const handlereset = () => {
        setBookDetails({
            bookTitle: "",
            publisher: "",
            author: "",
            isbn: "",
            imageURL: "",
            language: "",
            totalPages: "",
            category: "",
            price: "",
            discountPrice: "",
            abstract: "",
            uploadImages: [],
        })
        setPreview("")
        setPreviewList([])
    }


    // generative AI abstract generation

    useEffect(() => {
        if (debounceTitleSearch) {
            generateBookAbstract()
            console.log("Ready for API call")
        }
    }, [debounceTitleSearch])


    const generateBookAbstract = async () => {
        try {
            console.log(`Debounced Value :`, debounceTitleSearch);

            const result = await generateAbstractAPI(debounceTitleSearch);
            console.log(result);
            if (result.status == 200) {
                setBookDetails({ ...bookDetails, abstract: result?.data.content });
            }

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className='p-10 my-20 mx-5 bg-gray-200'>
                <h1 className='text-center text-3xl font-medium'>Upload Book Details</h1>
                <div className='grid grid-cols-2 mt-10 w-full'>
                    <div className='px-3'>
                        <div className=' mb-3'>
                            <input className='w-full p-2 rounded bg-white' placeholder='Book Title' type="text"
                                value={bookDetails.bookTitle}
                                onChange={(e) => setBookDetails({ ...bookDetails, bookTitle: e.target.value })} />
                        </div>
                        <div className='mb-3'>
                            <input className='w-full p-2 rounded bg-white' placeholder='Author' type="text"
                                value={bookDetails.author}
                                onChange={(e) => setBookDetails({ ...bookDetails, author: e.target.value })} />
                        </div>
                        <div className='mb-3'>
                            <input className='w-full p-2 rounded bg-white' placeholder='Book Cover Image Url' type="text"
                                value={bookDetails.imageURL}
                                onChange={(e) => setBookDetails({ ...bookDetails, imageURL: e.target.value })} />
                        </div>
                        <div className='mb-3'>
                            <input className='w-full p-2 rounded bg-white' placeholder='Total Pages' type="text"
                                value={bookDetails.totalPages}
                                onChange={(e) => setBookDetails({ ...bookDetails, totalPages: e.target.value })} />
                        </div>
                        <div className='mb-3'>
                            <input className='w-full p-2 rounded bg-white' placeholder='Original Price' type="text"

                                value={bookDetails.price}
                                onChange={(e) => setBookDetails({ ...bookDetails, price: e.target.value })} />
                        </div>
                        <div className='mb-3'>
                            <input className='w-full p-2 rounded bg-white' placeholder='Discount Price' type="text" value={bookDetails.discountPrice}
                                onChange={(e) => setBookDetails({ ...bookDetails, discountPrice: e.target.value })} />
                        </div>
                        <div className='mb-3'>
                            <textarea className='w-full p-2 rounded bg-white' placeholder='Abstract' type="text"
                                value={bookDetails.abstract}
                                onChange={(e) => setBookDetails({ ...bookDetails, abstract: e.target.value })} />
                        </div></div>
                    <div className='px-3'><div className=' mb-3'>
                        <input className='w-full p-2 rounded bg-white' placeholder='Publisher' type="text"
                            value={bookDetails.publisher}
                            onChange={(e) => setBookDetails({ ...bookDetails, publisher: e.target.value })} />
                    </div>
                        <div className='mb-3'>
                            <input className='w-full p-2 rounded bg-white' placeholder='ISBN' type="text"
                                value={bookDetails.isbn}
                                onChange={(e) => setBookDetails({ ...bookDetails, isbn: e.target.value })} />
                        </div>
                        <div className='mb-3'>
                            <input className='w-full p-2 rounded bg-white' placeholder='Language' type="text"
                                value={bookDetails.language}
                                onChange={(e) => setBookDetails({ ...bookDetails, language: e.target.value })} />
                        </div>
                        <div className='mb-3'>
                            <input className='w-full p-2 rounded bg-white' placeholder='Category' type="text"
                                value={bookDetails.category}
                                onChange={(e) => setBookDetails({ ...bookDetails, category: e.target.value })} />

                        </div>
                        <div className="mb-3 flex justify-center items-center mt-10">
                            <label htmlFor="uploadImage">
                                <input type="file" id='uploadImage' hidden onChange={(e) => handleImageUpload(e)} />
                                <img width={"150px"} src={preview ? preview : "https://www.pngall.com/wp-content/uploads/2/Upload-Transparent.png"} alt="" />
                            </label>
                        </div>
                        {preview.length > 0 &&
                            <div className="flex flex-wrap justify-center items-center gap-4">
                                {console.log(previewList)}
                                {previewList?.map((item, index) => (
                                    <img
                                        width={"70px"}
                                        src={item}
                                        alt=""
                                    />
                                ))}

                                {previewList.length < 3 && <label htmlFor="bookImages">
                                    {/* <input type="file" hidden id="bookImages" /> */}
                                    <input type="file" id='bookImages' hidden onChange={(e) => handleImageUpload(e)} />
                                    <img
                                        width={"60px"}
                                        src="https://i.pinimg.com/736x/55/6c/c3/556cc3aaf31042af34b00033ca6de475.jpg"
                                        alt=""
                                    />
                                </label>}


                            </div>
                        }

                        <div className='flex justify-end items-center gap-10 mt-10'>
                            <button className=' p-2 bg-gray-500 text-white rounded' on onClick={handlereset}>
                                RESET
                            </button>
                            <button className='p-2 bg-blue-500 text-white rounded' onClick={handleAddBook}>
                                ADD BOOK DETAILS
                            </button>
                        </div>
                    </div>
                </div>
            </div></>
    )
}

export default UploadBook