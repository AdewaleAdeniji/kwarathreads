import ProductCard from "../simple/productCard";

const Products = ({ products }) => {
      return (
  
        <div id="resources" className="grid gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3 xl:gap-8 2xl:gap-12">
            {
                products.map((product) => { return <ProductCard product={product}/> })
            }
        </div>
      );
    }
  export default Products;