import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.baseURL='http://localhost:5000/api/';

//Arrow Function ile kullanım
const responseBody = (response:AxiosResponse)=>response.data;
//axios interceptors
axios.interceptors.response.use(response =>{
    return response
},(error:AxiosError)=>{
    console.log('caugth by interceptor');
    return Promise.reject(error.response);

})

//Normal Kullanım/
// function responseBodyFn(response:AxiosResponse){
//     return response.data;
// }


const requests = {
    get:(url:string)=>axios.get(url).then(responseBody),
    post:(url:string,body:{})=>axios.post(url,body).then(responseBody),
    put:(url:string,body:{})=>axios.put(url,body).then(responseBody),
    delete:(url:string)=>axios.delete(url).then(responseBody),
    
}

const Catalog=
{
    list:()=> requests.get('products'),
    details:(id:number)=>requests.get(`products/${id}`)
}
const TestErrors={
    get400Error:()=>requests.get('buggy/bad-requests'),
    get401Error:()=>requests.get('buggy/unauthorised'),
    get404Error:()=>requests.get('buggy/not-found'),
    get500Error:()=>requests.get('buggy/server-error'),
    getValidationError:()=>requests.get('buggy//validation-error'),
}

const agent ={
Catalog,
TestErrors
}

export default agent;
