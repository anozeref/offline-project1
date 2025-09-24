import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Hasil, ListCategory, Menus, NavbarComp } from "../component";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";

export default class Home extends Component {
  state = {
    menus: [],
    categoriYangDipilih: "Makanan",
    keranjangs: [],
    notifStock: 0,
    notifMessages: [],
  };

  componentDidMount() {
    this.getMenus(this.state.categoriYangDipilih);
    this.getKeranjangs();
    this.checkStock();
  }

  getMenus = (kategori) => {
    axios.get(API_URL + "product?category.nama=" + kategori)
      .then(res => this.setState({ menus: res.data }))
      .catch(err => console.log(err));
  };

  getKeranjangs = () => {
    axios.get(API_URL + "keranjangs")
      .then(res => this.setState({ keranjangs: res.data }))
      .catch(err => console.log(err));
  };

  changeCategory = (value) => {
    this.setState({ categoriYangDipilih: value, menus: [] });
    this.getMenus(value);
  };

  // Fungsi check stock untuk notif
  checkStock = () => {
    axios.get(API_URL + "product")
      .then(res => {
        const products = res.data;
        const messages = [];
        products.forEach(prod => {
          if (prod.stock === 0) messages.push(`Stock ${prod.nama} habis`);
          else if (prod.stock <= 5) messages.push(`Stock ${prod.nama} menipis`);
        });
        this.setState({ notifStock: messages.length, notifMessages: messages });
      })
      .catch(err => console.log(err));
  };

  masukkeranjang = (menu) => {
    axios.get(API_URL + "keranjangs?product.id=" + menu.id)
      .then(res => {
        if(res.data.length === 0){
          const keranjang = { jumlah: 1, total_harga: menu.harga, product: menu };
          axios.post(API_URL + "keranjangs", keranjang)
            .then(() => {
              swal("Sukses!", "Berhasil masuk keranjang", "success");
              this.getKeranjangs();
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + menu.harga,
            product: menu
          };
          axios.put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
            .then(() => this.getKeranjangs());
        }
        this.checkStock(); // update notif stok
      })
      .catch(err => console.log(err));
  };

  clearKeranjang = () => {
    axios.get(API_URL + "keranjangs")
      .then(res => {
        const deletePromises = res.data.map(item => axios.delete(API_URL + "keranjangs/" + item.id));
        Promise.all(deletePromises)
          .then(() => {
            swal("Berhasil!", "Keranjang sudah dikosongkan", "success");
            this.getKeranjangs();
          });
      });
  };

  render() {
    const { menus, categoriYangDipilih, keranjangs, notifStock, notifMessages } = this.state;

    return (
      <>
        <NavbarComp
          notifStock={notifStock}
          notifMessages={notifMessages}
          onClearKeranjang={this.clearKeranjang}
        />

        <Container fluid className="mt-3">
          <Row>
            <ListCategory
              changeCategory={this.changeCategory}
              categoriYangDipilih={categoriYangDipilih}
            />
            <Col>
              <h5><strong>Daftar Produk</strong></h5>
              <hr />
              <Row>
                {menus.map(menu => (
                  <Menus key={menu.id} menu={menu} masukkeranjang={this.masukkeranjang} />
                ))}
              </Row>
            </Col>
            <Hasil keranjangs={keranjangs} history={this.props.history} getKeranjangs={this.getKeranjangs}/>

          </Row>
        </Container>
      </>
    );
  }
}
