import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {getProductList , getProductById, deleteProductById} from "../../service/ProductApi";
import {useForm} from "react-hook-form";
//const Laravel_API = "http://127.0.0.1:8000/api/productinfoadd";
//const Laravel_API = "http://127.0.0.1:5000/addProduct"
const Laravel_API = "http://127.0.0.1:8000/products/";
const Laravel_Base_Api = "http://127.0.0.1:8000/products/";
type Product = {
    id: number,
    name: string,
    sku: string,
    category: string,
    price: number,
    stock: number
}
type addProduct = {
    name: string,
    sku: string,
    category: string,
    price: number,
    stock: number,
}
type editProduct = {
    name: string,
    sku: string,
    category: string,
    price: number,
    stock: number,
}
const ProductCURD:React.FC = () => {
   const [product, setProduct] = useState<Product[]>([]);
   const [editproduct, setEditProduct] = useState<Product[]>([]);
   const [editid, setEditId] = useState<number | null>(null);
   const {register, handleSubmit,reset, formState: {errors}} = useForm<addProduct>({
    defaultValues: {
        name: "",
        sku: "",
        category: "",
        price: 0,
        stock: 0, 
    }
    });

   const fetchproduct = async() => {
    try {
        const product = await getProductList();
        console.log(product);
        setProduct(product.data);
    } catch(error){
        console.log(error);
    }
   }
   useEffect(() => {
    fetchproduct();
   },[]);
   const editProduct = async(id: number) => {
       // const response = await axios.get(`${Laravel_Base_Api}/editProductinfo/`,{headers:{"Content-Type":"application/json"}})
        try{
            const product = await getProductById(id)
            console.log(product);
            reset({
                name: product.data.name,
                sku: product.data.sku,
                category: product.data.category,
                price: product.data.price,
                stock: product.data.stock, 
            })
            setEditId(id)
         } catch(error){
            console.log(error)
        }
   }
   const deleteProduct = async(id: number) => {
    try{
        const response = await deleteProductById(id);
        fetchproduct();
    }catch(error){
        console.log(error);
    }
   }
   const onSubmit = async(data: addProduct) => {
       // console.log(data);return false;
       if (editid === null){
        const response = await axios.post(`${Laravel_API}`,data,{headers:{"content-type":"application/json"}})
       } else {
        const response = await axios.put(`${Laravel_Base_Api}${editid}/`,data,{headers:{"content-type":"application/json"}})
       }
       fetchproduct();
   }

    return (
        <div>
            <div style={{ float: "left" }}>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>title</th>
                        <th>sku</th>
                        <th>category</th>
                        <th>price</th>
                        <th>stock</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {product.map((productData) => (
                    <tr>
                        <td>{productData.id}</td>
                        <td>{productData.name}</td>
                        <td>{productData.sku}</td>
                        <td>{productData.category}</td>
                        <td>{productData.price}</td>
                        <td>{productData.stock}</td>
                        <td><button onClick={() => editProduct(productData.id) } style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}>Edit Product </button> | 
                            <button onClick={() => deleteProduct(productData.id)} style={{ background: "none", border: "none", color: "red", cursor: "pointer" }}> Delete Product </button>
                        </td>
                    </tr>
                    ))}
                    
                </tbody>
            </table>
            </div>
            <div style={{ float: "left" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <table>
                    <tr>
                        <td>Fill the Title</td>
                        <td><input {...register("name", {required: "title is required"})} /></td>
                        <td>{errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}</td>
                    </tr>
                    <tr>
                        <td>Fill the sku</td>
                        <td><input {...register("sku", {required: "sku is required"})} /></td>
                        <td>{errors.sku && <p style={{ color: "red" }}>{errors.sku.message}</p>}</td>
                    </tr>
                     <tr>
                        <td>Fill the category</td>
                        <td><input {...register("category", {required: "category is required"})}  /></td>
                        <td>{errors.category && <p style={{ color: "red" }}>{errors.category.message}</p>}</td>
                    </tr>
                     <tr>
                        <td>Fill the price</td>
                        <td><input {...register("price", {
                            required: "price is required",
                            min: {
                                value: 1,
                                message: "Price at least 1"
                            },
                            max: {
                                value: 100000,
                                message: "Price cannot exceeds 100000"
                            },
                            valueAsNumber:true
                            })}  /></td>
                        <td>{errors.price && <p style={{ color: "red" }}>{errors.price.message}</p>}</td>
                    </tr>
                     <tr>
                        <td>Fill the stock</td>
                        <td><input {...register("stock", {
                            required: "stock is required",
                            min: {
                                value: 1,
                                message : "Stock at least 1"
                            },
                            max: {
                                value: 10,
                                message: "Stock cannot exceeds 10"
                            },
                            valueAsNumber: true
                            })} /></td>
                        <td>{errors.stock && <p style={{ color: "red" }}>{errors.stock.message}</p>}</td>
                    </tr>  
                     <tr>
                    <td colSpan={3}><button type="submit">{editid === null ? "Add Product" : "Edit Product"}</button></td> 
                    </tr>  
                </table>
            </form>
            </div>
        </div>
    );
}
export default ProductCURD;