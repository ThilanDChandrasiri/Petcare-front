import Link from "next/link";
import CartIcon from "./icons/Cart";
import { useContext } from "react";
import { CartContext } from "./CartContext";

export default function ProductBox({ _id, title, description, price, images }) {
  const { addProduct } = useContext(CartContext);
  const url = '/product/' + _id;

  return (
    <div className="w-44">
      <Link href={url} className="bg-white p-4 h-36 flex flex-col justify-between">
        <div className="h-full flex items-center justify-center">
          <img className="product-image" src={images?.[0]} alt="" />
        </div>
      </Link>
      <div className="mt-2">
        <Link href={url} className="text-sm">{title}</Link>
        <div className="flex justify-between mt-1">
          <div className="flex items-center font-bold">Rs:{price}</div>
          <div>
            <button onClick={() => addProduct(_id)} className="btn-primary"><CartIcon /></button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .product-image {
          width: 100%; 
          height: 100%; 
          object-fit: cover; 
        }
      `}</style>
    </div>
  );
}
