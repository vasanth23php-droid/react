import React, { useState, FormEvent, ReactHTMLElement } from "react";
interface ProductData {
        productname: string,
        productcode: number,
        productprice: number,
        productowneremail: string,
        rating: number
    }
interface ProductDataError {
        productname: string,
        productcode: string,
        productprice: string,
        productowneremail: string,
        rating: string
    }
function ProductForm() {
    const [proform, setProform] = useState<ProductData>({
        productname: "",
        productcode: 0,
        productprice: 0,
        productowneremail: "",
        rating: 0
    });
    const [productformerror, setProductformError] = useState<Partial<ProductDataError>>({});
    const formSubmit = (e:FormEvent) => {
        e.preventDefault(); // suspent the defaultly submit the browser action
        const productError: Partial<ProductDataError> = {};

        if (!proform.productname){
           productError.productname = "Fill the product name"
        }
        if (proform.productcode === 0 || proform.productcode === undefined){
            productError.productcode = "Fill the product code"
        }
        if (proform.productprice === 0 || proform.productprice === undefined){
            productError.productprice = "Fill the product price"
        }
        if (!proform.productowneremail){
            productError.productowneremail = "Fill the product owner email"
        }
         if (proform.rating === 0 || proform.rating === undefined){
            productError.rating = "Fill the product rating"
        }
        setProductformError(productError);
    }
    const handleProductFormChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProform({...proform, [e.target.name]: e.target.value});
    }
    return (
        <div>
            <h3>Product list</h3>
            <form onSubmit={formSubmit}>
                <table>
                    <tr>
                        <td>Please fill the product name</td>
                        <td><input  type="text" 
                                    name="productname" 
                                    value={proform.productname} 
                                    onChange={handleProductFormChanges} />
                                     {productformerror.productname && <p style={{ color: "red" }}>{productformerror.productname}</p>}
                        </td>
                    </tr>
                    <tr>
                        <td>Please fill the product code</td>
                        <td><input   type="text"
                                     name="productcode"
                                     value={proform.productcode} 
                                     onChange={handleProductFormChanges}/>
                                     {productformerror.productcode && <p style={{ color: "red" }}>{productformerror.productcode}</p>}
                        </td>
                    </tr>
                    <tr>
                        <td>Please fill the product price</td>
                        <td><input  type="text"
                                    name="productprice"
                                    value={proform.productprice}
                                    onChange={handleProductFormChanges}/>
                                    {productformerror.productprice && <p style={{ color: "red" }}>{productformerror.productprice}</p>}
                        </td>
                    </tr>
                    <tr>
                        <td>Please fill the product owner email</td>
                        <td><input  type="text" 
                                    name="productowneremail"
                                    value={proform.productowneremail}
                                    onChange={handleProductFormChanges} />
                                    {productformerror.productowneremail && <p style={{ color: "red" }}>{productformerror.productowneremail}</p>}
                        </td>
                    </tr>
                    <tr>
                        <td>Please fill the product rating</td>
                        <td><input  type="text" 
                                    name="rating"
                                    value={proform.rating}
                                    onChange={handleProductFormChanges}  />
                                    {productformerror.rating && <p style={{ color: "red" }}>{productformerror.rating}</p>}
                        </td>
                    </tr>
                    <tr>
                        <td><input type="button" value="Cancel" /></td>
                        <td><input type="submit" value="Add" /></td>
                    </tr>
                </table>
            </form>
        </div>
    )
}

export default ProductForm;