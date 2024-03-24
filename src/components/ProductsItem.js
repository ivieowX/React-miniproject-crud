import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const ProductsItem = (props) => {
  const [show, setShow] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleBuy = () => {
    const orderQuantity = parseInt(quantity);
    if (orderQuantity > 0 && orderQuantity <= props.stock) {
      // สร้าง object สำหรับส่งไปยัง API
      const data = {
        product_id: props.product_id,
        name: props.name,
        price: props.price,
        description: props.description,
        stock: props.stock - orderQuantity, // ลดจำนวนสินค้าในสต็อค
      };

      // เรียกใช้ API สำหรับการอัพเดทสินค้า
      axios.put('http://localhost/php-ecommerc/update-product1.php', data)
        .then(response => {
          console.log(response.data);
          handleClose(); // ปิด Modal หลังจากอัพเดทสำเร็จ
        })
        .catch(error => {
          console.error('Error updating product:', error);
        });

      // ทำการสั่งซื้อสินค้าด้วยจำนวน quantity
      console.log(`สั่งซื้อ ${quantity} ชิ้นของ ${props.name}`);
    } else {
      alert(`โปรดเลือกจำนวนสินค้าให้ถูกต้อง (ระหว่าง 1 ถึง ${props.stock})`);
    }
  };

  return (
    <div className="col-md-3 col-sm-6 hero-feature ">
      <div className="thumbnail border">
        <img
          src={`http://localhost/php-ecommerc/${props.image}`}
          alt={props.name}
          style={{ width: "200px", height: "150px" }}
        />
        <div className="caption">
          <h3>{props.name}</h3>
          <p>ราคา {props.price}</p>
          <p>
            <Button variant="primary" onClick={handleShow}>
              ดูรายละเอียด
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{props.name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <img
                  src={`http://localhost/php-ecommerc/${props.image}`}
                  alt={props.name}
                  style={{ display: "flex", flex: "center", width: "50%", height: "auto" }}
                />
                <h2>ราคา: {props.price} </h2>
                <p>รายละเอียด: {props.description} </p>
                <p>สินค้าคงเหลือ: {props.stock} ชิ้น</p>
                <Form.Group controlId="quantity">
                  <Form.Label>จำนวนสินค้า</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    max={props.stock}
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="success" onClick={handleBuy}>
                  ซื้อสินค้า
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                  ปิด
                </Button>
              </Modal.Footer>
            </Modal>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductsItem;
