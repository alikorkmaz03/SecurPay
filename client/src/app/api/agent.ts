import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";//index.tsx ten geliyor

axios.defaults.baseURL='http://localhost:5000/api/';

//Arrow Function ile kullanım
const responseBody = (response:AxiosResponse)=>response.data;
//axios interceptors
axios.interceptors.response.use(response =>{
    return response
},(error:AxiosError)=>{
    // console.log('caugth by interceptor');
    const {data,status}=error.response as any;//Kodunuzun içerisinde yazarken bazı kısımları eksik bıraktığınızda bunları JS olduğu gibi any kodu ile çağırabilir
    switch (status) {
        case 400:
            if(data.errors)
            {
                const modelStateErrors:string[]=[];
                for(const key in data.errors)
                {
                    if(data.errors[key])
                    {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;

        case 401:
            toast.error(data.title);
            break;

        case 500:
            // toast.error(data.title);ç
            //hatalı kod 
            // history.push({
            //     pathname:'/server-error',state : {error.data}
                 
            // });
            // //Çözüm ServerError.tsx dosyasına aşağıdaki kod eklenmeli
            // const location = useLocation();
            // const state = location.state as any; 
            history.push('/server-error',{error:data});
            break;
    
        default:
            break;
    }
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
    getValidationError:()=>requests.get('buggy/validation-error'),
}

const agent ={
Catalog,
TestErrors
}

export default agent;
