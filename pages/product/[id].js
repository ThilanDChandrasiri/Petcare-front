import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import CartIcon from "@/components/icons/Cart";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";


export default function ProductPage({product}) {
    const {addProduct} = useContext(CartContext);
    return(
        <>
        <Header/>
        <Center>
        <div className="mt-10 grid sm:grid-cols-custom-fractions1 grid-cols-1 gap-10">
            <div className="bg-white p-8 rounded-md ">
            <ProductImages images={product.images}/>
            </div>

            <div className="">
            <h1 className="text-black font-medium pb-4 text-3xl ">{product.title}</h1>
            <p>{product.description}</p>
            <div className="flex pt-4 gap-8 items-center">
            <p className="font-bold text-xl">{product.price} LKR</p>
            <button 
                onClick={() => addProduct(product._id)}
                className="bg-primary shadow-primary shadow-lg text-white rounded-sm flex gap-1 items-center py-1 px-4 text-sm cursor-pointer">
            <CartIcon/>
            Add to cart
            </button>
            </div>

            </div>
        </div>
        </Center>
        </>
    );
}

export async function getServerSideProps(context) {
    await mongooseConnect();
    const {id} = context.query;
    const product = await Product.findById(id);
    return {
        props:{
            product: JSON.parse(JSON.stringify(product)),
        }
    }
}