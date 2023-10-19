import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose"; 
import { Product } from "@/models/Product";

export default function HomePage({ featuredProduct,newProducts }) { 
  console.log({newProducts});
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} /> 
      <NewProducts products={newProducts} />
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const featuredProductId = '64fdd9f0bd4e93899ada0eed';
    await mongooseConnect(); 
    const featuredProduct = await Product.findById(featuredProductId);
    const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10});
    return {
      props: { 
        featuredProduct: JSON.parse(JSON.stringify(featuredProduct)), 
        newProducts: JSON.parse(JSON.stringify(newProducts)),
      }, 
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: { featuredProduct: null }, 
    };
  }
}
