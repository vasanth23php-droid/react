import { useForm } from "react-hook-form";

type categoryFormData = {
    categoryName: string;
    categoryCode: number;
    subCategoryId: number;
    brand: string;
};

export default function CategoryForm() {
    const {register, handleSubmit, formState: { errors }} = useForm<categoryFormData>();
    const onSubmit = (data: categoryFormData) => {
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <table>
                <tr>
                    <td>Fill the category name</td>
                    <td><input {...register("categoryName", {required: "Category name is required"})} /></td>
                    <td>{errors.categoryName && <p style={{ color: "red" }}>{errors.categoryName.message}</p>}</td>
                </tr>
                <tr>
                    <td>Fill the category code</td>
                    <td><input {...register("categoryCode", {required: "Category Id is required"})} /></td>
                    <td>{errors.categoryCode && <p style={{ color: "red" }}>{errors.categoryCode.message}</p>}</td>
                </tr>
                <tr>
                    <td>Fill the sub category id </td>
                    <td><input {...register("subCategoryId", {required: "Sub Category Id required"})}/></td>
                    <td>{errors.subCategoryId && <p style={{ color: "red" }}>{errors.subCategoryId.message}</p>}</td>
                </tr>
                <tr>
                    <td>Fill the brand</td>
                    <td><input {...register("brand", {required: "Brand name is required"})}/></td>
                    <td>{errors.brand && <p style={{ color: "red" }}>{errors.brand.message}</p>}</td>
                </tr>
                <tr>
                   <td colSpan={3}><button type="submit">Add Category</button></td> 
                </tr>

            
            
            
            
            
            
            </table>
        </form>
    );
}