import React, { useState, useEffect } from "react";
import ProductsItem from "./ProductsItem";
import Spinner from "react-bootstrap/Spinner";

function Products() {
  const [data, setData] = useState({ success: 0, products: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost/php-ecommerc/all-data.php"
        );
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-lg-12">
          <h2 className="text-center mt-3">โน๊ตบุ๊ค, คอมพิวเตอร์</h2>
        </div>
      </div>
      <div className="row text-center">
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : data.success === 1 && data.products.length > 0 ? (
          data.products.map((product) => (
            <ProductsItem
              key={product.product_id}
              product_id={product.product_id}
              name={product.name}
              price={product.price}
              description={product.description}
              stock={product.stock}
              image={product.image}
            />
          ))
        ) : (
          <p className="mt-5">ไม่มีสินค้าในระบบ</p>
        )}
      </div>
    </div>
  );
}

export default Products;
