import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Container from 'react-bootstrap/Container';
import DashboardProduct from './components/DashboardProduct';
import Home from "./components/Home";
import Footer from './components/Footer';

const App = () => {
  return (
    <div>
      <Router>
        <Navbar className=' p-2' bg="dark" data-bs-theme="dark">
          <Container className='d-flex justify-content-between'>
            <Navbar.Brand href="/">React CRUD</Navbar.Brand>
            <Nav >
              <Link to="/" style={{ color: "white", padding: 15, textDecoration: "none" }}>
                หน้าแรก
              </Link>
            </Nav>
            <div>
              {['down-centered'].map(
                (direction) => (
                  <DropdownButton
                    key={direction}
                    id={`dropdown-button-drop-${direction}`}
                    drop={direction}
                    variant="secondary"
                    title={`ระบบหลังบ้าน`}
                  >
                    <Dropdown.Item as={NavLink} to="/DashboardProduct" style={{ textDecoration: "none", color: "inherit" }}>
                      ข้อมูลสินค้า
                    </Dropdown.Item>
                  </DropdownButton>
                ),
              )}
            </div>
          </Container>
        </Navbar>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/DashboardProduct"
            element={<DashboardProduct />}
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
