import axios from "axios";
//const App_URL = "http://127.0.0.1:8000/api/productinfoList";
//const App_URL = "http://127.0.0.1:5000/getProductList";
const App_URL = "http://127.0.0.1:8000/products/";
const Laravel_Base_Api = "http://127.0.0.1:8000/products";
export const  getProductList = async () => {
    try {
        const response = await axios.get(App_URL);
        return response.data;
        
    } catch (error) {
        console.log(error)
    }
}
export const getProductById = async(id: number) => {
    try {
        const response = await axios.get(`${Laravel_Base_Api}/${id}`,{headers:{"Content-Type":"application/json"}})
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
export const deleteProductById = async(id: number) => {
    try{
        const response = await axios.delete(`${Laravel_Base_Api}/${id}`)
    }catch (error){
        console.log(error)
    }
}