class ApiResponse {
    public statusCode:number
    public data:any
    public message:string
    public success:boolean
     constructor(statusCode:number, data:any, message:string = "Success"){
         this.statusCode = statusCode
         this.message = message
         this.success = statusCode < 400
         this.data = data
     }
 };
 export default ApiResponse;
 