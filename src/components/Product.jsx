import reactLogo from "../assets/react.svg";

export const Product = ({ product, addToCart }) => {
  return (
    <div className="card p-3 mb-3 gap-3" style={{ width: "15rem" }}>
      <h3 className="card-title text-center">{product.name}</h3>
      <img
        src={reactLogo}
        className="card-img-top"
        alt="Product"
        width="150px"
      />
      <div className="d-flex justify-content-between mt-3 mt-auto">
        <p className="card-text">{product.stock}</p>
        <button
          className="btn btn-primary"
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};
