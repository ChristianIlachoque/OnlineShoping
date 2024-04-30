export const CartList = ({ items, totalPrice, exportJSON }) => {
  return (
    <div
      className="flex-grow-1"
      style={{ minWidth: "850px", maxWidth: "950px" }}
    >
      <div className="container-fluid text-white p-3 border mb-3">
        <h2 className="text-dark">Cart</h2>
        {items.length === 0 ? (
          <h2 className="text-center text-dark">Carrito vacio...</h2>
        ) : (
          <table className="table mt-2">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.stock}</td>
                  <td>{item.unit_price}</td>
                  <td>{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="d-flex justify-content-between mt-5 gap-2">
          <spam className="border text-dark p-2">
            Total Order Price: {totalPrice}
          </spam>
          <button
            className="btn btn-outline-primary"
            onClick={() => exportJSON(items)}
          >
            Create order
          </button>
        </div>
      </div>
    </div>
  );
};
