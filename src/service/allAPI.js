// apis



import commonAPI from "./commonAPI"
import { serverURL } from "./serverURL"


export const registerAPI = async (reqBody) => {

    return await commonAPI("POST", `/register`, reqBody)

}

export const loginAPI = async (reqBody) => {

    return await commonAPI("POST", `/login`, reqBody)

}

// update User
export const updateUserProfileAPI = async (userId, reqBody) => {
    return await commonAPI("PUT", `/updateuser/${userId}`, reqBody);
};

//add book
export const addNewBookAPI = async (reqBody) => {
    return await commonAPI("POST", `/addbook`, reqBody)
}

//get book

export const getHomeBooksAPI = async () => {
    return await commonAPI("GET", `getbooks`, "")
}

//loggedin
export const getALLbooksAPI = async (searchkey) => {
    return await commonAPI("GET", `getallbooks?search=${searchkey}`, "")
}

// view book
export const viewBookAPI = async (bookID) => {
    return await commonAPI('GET', `/view/${bookID}/book`, {});
};

// get user upload books
export const getUserUploadBooksAPI = async () => {
    return await commonAPI('GET', `/userbooks`, {});
};

//get purchase history data

export const getPurchaseHistoryDataAPI = async () => {
    return await commonAPI("GET", `/purchasedbooks`, {})
}

// remove user added book
export const removerUserAddedBookAPI = async (bookID) => {
    return await commonAPI("DELETE", `/remove/${bookID}/book`, {});
};



// get user upload books
export const getAdminBooksAPI = async () => {
    return await commonAPI('GET', `/getallbooks/admin`, {});
};

// approve book - admin

export const approveBookAPI = async (id) => {
    return await commonAPI("PUT", `/approvebook/${id}`, {})
}

//show all users - admin

export const getAllUsers = async () => {
    return await commonAPI("GET", `/getusers`, {})
}

//update admin profile
export const updateAdminProfileAPI = async (id, reqBody) => {
    return await commonAPI("PUT", `/updateadmin/${id}`, reqBody)
}

export const getCountAPI = async () => {
    return await commonAPI("GET", `/getcounts`, {})
}


export const googleAuthenticationAPI = async (reqBody) => {
    return await commonAPI("POST", `/google/login`, reqBody)
}

//generative AI abstract

export const generateAbstractAPI = async (bookTitle) => {
    console.log("reqbody - ", bookTitle)
    return await commonAPI("POST", `/genAI`, { bookTitle })
}

// payment
export const makePaymentAPI = async (id) => {
    return await commonAPI("PUT", `/make/payment/${id}`, {});
};






