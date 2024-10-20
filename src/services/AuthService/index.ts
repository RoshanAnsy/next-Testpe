import request from "../request";

const emailSignUp=(payload:object)=>{
    
    return request({
        url:"/auth/sign-up",
        method:"POST",
        data:payload
    })
}

const emailLogin=(payload:object)=>{
    return request({
        url:"/auth/login",
        method:"POST",
        data:payload
    })
}

export const AuthService ={
    emailSignUp,
    emailLogin,
 
}