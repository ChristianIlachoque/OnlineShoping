import "./App.css";
import { products as initialProducts } from "./api/products";
import { useEffect, useState } from "react";
import { ProductList } from "./components/ProductList";
import { CartList } from "./components/CartList";

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [input, setInput] = useState("");
  const [option, setOption] = useState("all");
  const addToCart = (productSelected) => {
    // Disminuir stock de lista
    const newProductList = products.map((product) => {
      if (product.name === productSelected.name && product.stock > 0) {
        return {
          ...product,
          stock: product.stock - 1,
        };
      }
      return product;
    });
    setProducts(newProductList);

    // Agregar producto a nueva lista
    const existedItem = items.some(
      (item) => item.name === productSelected.name
    );

    if (existedItem) {
      const newItemList = items.map((item) => {
        if (item.name === productSelected.name) {
          return {
            ...item,
            stock: item.stock + 1,
            total: item.total + item.unit_price,
          };
        }
        return item;
      });
      setItems(newItemList);
    } else {
      setItems([
        ...items,
        { ...productSelected, stock: 1, total: productSelected.unit_price },
      ]);
    }
  };
  const exportJSON = (selectedList) => {
    const modifiedList = [...selectedList, { TOTAL: totalPrice }];
    const jsonContent = JSON.stringify(modifiedList, null, 2);

    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "exportJSON.json");

    document.body.appendChild(link);
    link.click();

    //Liberar el objeto URL creado
    URL.revokeObjectURL(url);
  };

  const filteredProducts = products.filter((product) => {
    const matchName = product.name.toLowerCase().includes(input.toLowerCase());
    const matchType = option === "all" || product.type === option;
    return matchName && matchType;
  });

  useEffect(() => {
    let total = 0;
    items.forEach((item) => {
      total += item.total;
    });
    setTotalPrice(total);
  }, [items]);
  return (
    <div className="container-fluid text-white">
      <h1 className="text-center text-dark mb-3 mt-3">Alternova Shop</h1>
      <div className="d-flex input-group mb-5 gap-3">
        <input
          className="form-control"
          type="text"
          placeholder="Buscar..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <select
          className="form-select"
          value={option}
          onChange={(e) => setOption(e.target.value)}
        >
          <option value="all">Todos</option>
          <option value="technology">Technology</option>
          <option value="sport">Sport</option>
          <option value="building">Building</option>
        </select>
      </div>
      <div className="d-flex justify-content-around">
        {/* PRODUCT LIST */}
        <ProductList products={filteredProducts} addToCart={addToCart} />

        {/* CART LIST */}
        <CartList
          items={items}
          totalPrice={totalPrice}
          exportJSON={exportJSON}
        />
      </div>
    </div>
  );
}

export default App;
