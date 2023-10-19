import Link from "next/link";
import Center from "./Center";
import { useContext } from "react";
import { CartContext } from "./CartContext";


export default function Header() {
  const {cartProducts} = useContext(CartContext);
  return (
    <header>
            
      <Center>
        <div className="flex justify-between py-4 items-center">
      <Link className="text-white text-4xl" href={'/'}>Petcare</Link>
      <nav className="text-violet-300 flex gap-2">
        <Link href={'/'}>Home</Link>
        <Link href={'/products'}>All Products</Link>
        <Link href={'/categories'}>Categories</Link>
        <Link href={'/account'}>Account</Link>
        <Link href={'/cart'}>Cart({cartProducts.length})</Link>
      </nav>
      </div>
      </Center>
    </header>
  );
}
