import ProductBox from "./ProductBox";

export default function ProductsGrid({products}) {
    return (
        <div className="grid sm:grid-cols-4 grid-cols-2 gap-8 pt-4">
            {products?.length > 0 && products.map(product => (
                <ProductBox key={product._id} {...product}/>
            ))}
            </div>
    );
}