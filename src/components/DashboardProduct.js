import React, { useState, useEffect, useCallback } from 'react';
import Badge from 'react-bootstrap/Badge';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import EditProductModal from './EditProductModal';
import AddProductModal from './AddProductModal';
import { CirclePlus } from 'lucide-react';
import { Pencil } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import "../App.css";

function DashboardProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [sortByStock, setSortByStock] = useState(false);

  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
  };

  const toggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  const toggleSortByStock = () => {
    setSortByStock(!sortByStock);
  };
  
  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch('http://localhost/php-ecommerc/products.php');
      const data = await response.json();
      if (data.success) {
        let sortedProducts = data.products;
        if (sortByStock) {
          sortedProducts = data.products.sort((a, b) => a.stock - b.stock);
        }
        setProducts(sortedProducts);
        setTotalProducts(data.total_products);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  }, [sortByStock]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    toggleEditModal();
  };

  const handleDelete = async (productId) => {
    if (window.confirm('คุณต้องการลบสินค้านี้หรือไม่?')) {
      try {
        const response = await fetch(`http://localhost/php-ecommerc/delete-product.php?id=${productId}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (data.success) {
          fetchProducts();
        } else {
          console.error('Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="container">
      <hr />
      
      <div className='d-flex justify-content-between mt-3 ml-3'>
      {['end'].map(
          (direction) => (
            <DropdownButton
              key={direction}
              id={`dropdown-button-drop-${direction}`}
              drop={direction}
              variant="secondary"
              title={`ตัวเลือกแสดง`}
            >
              <Dropdown.Item onClick={toggleSortByStock}>
                จำนวนสินค้าน้อยที่สุด
              </Dropdown.Item>
            </DropdownButton>
          ),
        )}
      <h3>จำนวนสินค้าทั้งหมด: <Badge bg="secondary">{totalProducts}</Badge></h3>
      <div className="d-flex justify-content-end">
        <button className="btn btn-primary" size="sm" onClick={toggleAddModal}><CirclePlus size={18} /> Add Product</button>
      </div>
       
        
      </div>
      <table className="table table-responsive mt-3">
        <thead>
          <tr>
            <th scope="col">รหัสสินค้า</th>
            <th scope="col">ชื่อสินค้า</th>
            <th scope="col">ราคา</th>
            <th scope="col">รายละเอียด</th>
            <th scope="col">จำนวนในสต็อก</th>
            <th scope="col">รูปภาพ</th>
            <th scope="col">ดำเนินการ</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7" className="text-center">กำลังโหลดข้อมูล...</td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.product_id}>
                <td>{product.product_id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>{product.stock}</td>
                <td><img src={`http://localhost/php-ecommerc/${product.image}`} alt={product.name} style={{ width: '100px' }} /></td>
                <td>
                  <button className="btn btn-sm btn-warning m-2" onClick={() => handleEdit(product)}> <Pencil size={18}/> แก้ไข</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(product.product_id)}> <Trash2 size={18}/> ลบ</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <EditProductModal show={showEditModal} onClose={toggleEditModal} product={selectedProduct} fetchProducts={fetchProducts} />

      <AddProductModal show={showAddModal} onClose={toggleAddModal} fetchProducts={fetchProducts} />
    </div>
  );
}

export default DashboardProduct;
