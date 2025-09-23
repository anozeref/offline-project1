import { useState, useEffect } from "react";
import './App.css';
import { Navbar, Category, Hasil, ProductList } from "./component";
import { Container, Row, Col } from "react-bootstrap";
import { API_URL } from "./component/utils/constant";
import axios from "axios";

function App() {
  const [kategoriAktif, setKategoriAktif] = useState("");
  const [products, setProducts] = useState([]);
  const [keranjangs, setKeranjangs] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = kategoriAktif
          ? `${API_URL}/product?category.nama=${kategoriAktif}`
          : `${API_URL}/product`;
        const res = await axios.get(url);
        setProducts(res.data);
      } catch (err) {
        console.error("Gagal fetch:", err);
      }
    };

    fetchProducts();
  }, [kategoriAktif]);

  function tambahKeranjang(product) {
    setKeranjangs((prevKeranjang) => {
      const found = prevKeranjang.find(
        (item) => item.product.id === product.id
      );
      if (found) {
        return prevKeranjang.map((item) =>
          item.product.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        return [...prevKeranjang, { product, qty: 1 }];
      }
    });
  }

  function kurangiKeranjang(productId) {
    setKeranjangs((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  }

  function hapusKeranjang(productId) {
    setKeranjangs((prev) =>
      prev.filter((item) => item.product.id !== productId)
    );
  }

  return (
    <div>
      <Navbar />
      <Container>
        <Row>
          {/* Sidebar Category */}
          <Col xs={2}>
            <Category
              kategoriAktif={kategoriAktif}
              changeCategory={setKategoriAktif}
            />
          </Col>

          {/* Daftar Produk */}
          <Col xs={7}>
            <ProductList
              products={products}
              tambahKeranjang={tambahKeranjang}
            />
          </Col>

          {/* Keranjang & Konfirmasi */}
          <Col xs={3}>
            <Hasil
              keranjangs={keranjangs}
              kurangiKeranjang={kurangiKeranjang}
              hapusKeranjang={hapusKeranjang}
              setKeranjangs={setKeranjangs}  // ✅ tambahan untuk reset setelah konfirmasi
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
