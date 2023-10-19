import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function CartPage(){
    const {cartProducts,addProduct,removeProduct,clearCart} = useContext(CartContext);
    const [products,setProducts] = useState([]);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [city,setCity] = useState('');
    const [postalCode,setPostalCode] = useState('');
    const [streetAddress,setStreetAddress] = useState('');
    const [country,setCountry] = useState('');
    const [isSuccess,setIsSuccess] = useState(false);
    useEffect(()=> {
        if (cartProducts.length > 0){
            axios.post('/api/cart', {ids:cartProducts})
            .then(response => {
                setProducts(response.data);
            })
        } else {
            setProducts([]);
        }
    }, [cartProducts]);

    useEffect(() => {
        if (typeof window === 'undefined') {
          return;
        }
        if (window?.location.href.includes('success')) {
        
          setIsSuccess(true);
          clearCart();
        }
      }, []);

    function moreOfThisProducts(id){
        addProduct(id);
    }
    function lessOfThisProducts(id){
        removeProduct(id);
    }
    async function goToPayment(){
        const response = await axios.post('/api/checkout' , {
            name,email,city,postalCode,streetAddress,country,
            cartProducts,
        });
    if (response.data.url) {
        window.location = response.data.url;
    }
    }

    let total = 0;
    for(const productId of cartProducts){
        const price = products.find(p => p._id ===productId)?.price || 0;
        total += price;
    }
    
    if(isSuccess) {
        return(
            <>
            <Header/>
            <Center>
                <div className="mt-10 items-center justify-center text-center p-4 bg-white grid grid-cols-1">
                <h1 className="font-black pb-4 text-2xl">Thanks for your Order!</h1>
                <p>We will email you when your order will be sent.</p>
                </div>
            </Center>
            </>
        );
    }
    return(
        <>
        <Header />
        <Center>
        <div className="mt-10 grid sm:grid-cols-custom-fractions grid-cols-1 gap-10">
            <div className="bg-white p-8 rounded-md">
            <h2 className="text-primary text-lg font-bold pb-2">Cart</h2>
                {!cartProducts?.length && (
                    <div>Your cart is empty</div>
                )}
                
                {products?.length > 0 && (
                <table className="basic">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th className="text-center">Quantity</th>
                            <th className="text-right">Price(lkr)</th>
                        </tr>
                    </thead>
                    <tbody>
                    {products.map(product => (
                        <tr>
                            <td>
                                {product.title}
                                <img className="w-20 pb-4" src={product.images[0]} alt=""/>
                                
                            </td>
                            <td className="text-center">
                                <button onClick={()=> lessOfThisProducts(product._id)} className="btn-cart">-</button>
                                {cartProducts.filter(id=> id === product._id).length}
                                <button onClick={()=> moreOfThisProducts(product._id)} className="btn-cart">+</button>
                            </td>
                            <td className="text-right">
                                {cartProducts.filter(id=> id === product._id).length*product.price}
                            </td>
                        </tr>
                    ))}
                        <tr>
                        <td className="font-bold">Total</td>
                        <td></td>
                        <td className="text-right font-bold">{total}</td>
                        </tr>        
                    </tbody>
                </table>
                )}
            </div>
            {!!cartProducts?.length && (
                <div className="bg-white p-8 rounded-md">
                <h2 className="text-xl font-bold">Order Information</h2>
                
                <div>
                <input className="input-text" 
                    type="text" 
                    placeholder="Name" 
                    value={name} 
                    name="name"
                    onChange={ev => setName(ev.target.value)}/>
                </div>
                <div>
                <input className="input-text" 
                    type="text" 
                    placeholder="Email" 
                    value={email} 
                    name="email"
                    onChange={ev => setEmail(ev.target.value)}/>
                </div>
                <div className="flex">
                <input className="input-text" 
                    type="text" 
                    placeholder="City" 
                    value={city} 
                    name="city"
                    onChange={ev => setCity(ev.target.value)}/>                
                <input className="input-text" 
                    type="text" 
                    placeholder="Postal Code" 
                    value={postalCode}
                    name="postalCode" 
                    onChange={ev => setPostalCode(ev.target.value)}/>
                </div>
                <div>
                <input className="input-text" 
                    type="text" 
                    placeholder="Street Address" 
                    value={streetAddress}
                    name="streetAddress" 
                    onChange={ev => setStreetAddress(ev.target.value)}/>
                </div>
                <div>
                <input className="input-text" 
                    type="text" 
                    placeholder="Country" 
                    value={country} 
                    name="country"
                    onChange={ev => setCountry(ev.target.value)}/>
                </div>
                <button 
                    className="btn-payment"
                    onClick={goToPayment}>
                    Continue to payment
                </button>
                
            </div>
            )}
            

        </div>
        </Center>
        </>
    );
}

