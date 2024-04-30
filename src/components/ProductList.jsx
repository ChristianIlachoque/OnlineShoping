import { Product } from "./Product";

export const ProductList = ({ products, addToCart }) => {
  if (products.length === 0) {
    return (
      <div className="flex-shrink-1 text-center p-5 m-5">
        <h2 className="text-dark">Sin resultados</h2>
      </div>
    );
  }
  return (
    <div className="flex-shrink-1">
      <div className="d-flex flex-wrap gap-3">
        {products.map((product, index) => (
          <Product key={index} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};
