import Link from "next/link";
import Center from "./Center";
import CartIcon from "./icons/Cart";
import { useContext } from "react";
import { CartContext } from "./CartContext";

export default function Featured({ product }) { 
    const {addProduct} = useContext(CartContext);
    function addFeaturedToCart(){
        addProduct(product._id);
    }
    return(
        <div className="bg-gray-900 text-white">
            <Center>
                <div className="grid grid-cols-1 sm:grid-cols-2 pt-10 gap-8 items-center">

                    <div className="col-span-1 sm:col-span-1">
                        <h1 className="text-4xl py-2 font-serif">{product.title}</h1> 
                        <p className="text-violet-300 text-sm">{product.description}</p> 
                        <div className="flex gap-2 p-2 mb-2">
                            <Link href={'/product/' + product._id} className="btn-readmore">Read more...</Link>
                            <button onClick={addFeaturedToCart} className="bg-primary text-white rounded-sm flex gap-1 items-center py-1 px-4 text-sm cursor-pointer">
                                <CartIcon/>
                                Add to cart
                            </button>
                        </div>
                    </div>

                    <div className="col-span-1 sm:col-span-1 self-end flex justify-end">
                        <img className=" w-3/5 mx-auto sm:mx-0" src="https://petcare-admin.s3.amazonaws.com/1694359091193.png" alt="" />
                    </div>

                </div>
            </Center>
        </div>
    );
}
