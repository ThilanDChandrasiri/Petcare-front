import Center from "@/components/Center";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";

export default function ProductsPage({products}) {
    return (
        <>
        <Header/>
        <Center>
        <h1 className="text-primary font-bold text-4xl pt-3 font-serif">All Products</h1>
        <ProductsGrid products={products} />
        </Center>
        </>
    );
}

export async function getServerSideProps() {
    await mongooseConnect();
    const products = await Product.find({}, null, {sort:{'_id':-1}});
    return {
        props:{
            products: JSON.parse(JSON.stringify(products)),
    }
};
}