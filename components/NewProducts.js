import Center from "./Center";
import ProductBox from "./ProductBox";
import ProductsGrid from "./ProductsGrid";

export default function NewProducts({products}){
    return(
        <Center>
            <h2 className="text-primary font-bold text-4xl pt-3 font-serif">New Items</h2>
            <ProductsGrid products={products} />
        </Center>
    );
}

