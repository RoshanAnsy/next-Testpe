import request from "../request";

const updateUserProfile=(id:string,data:object)=>{
    return request({
        url: "https://",
        method: "PUT",
        body:data,
    })
}

const getUserProfile=(token:string)=>{
    return request({
        url: "https://",
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "auth-token":token,
        },
    })
}

export const ProfileService={
    updateUserProfile,
    getUserProfile,
 
}