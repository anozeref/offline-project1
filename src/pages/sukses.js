import React, { Component } from "react";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";

export default class Sukses extends Component {
  componentDidMount() {
    // Ambil semua keranjangs dulu
    axios.get(API_URL + "keranjangs")
      .then(res => {
        const keranjangs = res.data;

        if (keranjangs.length > 0) {
          // Buat pesanan baru dengan timestamp
          const timestamp = new Date().toISOString(); // format ISO
          const pesanan = {
            total_bayar: keranjangs.reduce((sum, k) => sum + k.total_harga, 0),
            menus: keranjangs,
            timestamp: timestamp
          };

          // Simpan ke db pesanan[]
          axios.post(API_URL + "pesanan", pesanan)
            .then(() => {
              // Setelah berhasil simpan, hapus semua keranjangs
              const deletePromises = keranjangs.map(item =>
                axios.delete(API_URL + "keranjangs/" + item.id)
              );
              return Promise.all(deletePromises);
            })
            .then(() => {
              // Tampilkan swal sukses
              swal({
                title: "Sukses!",
                text: "Pesanan berhasil dicatat.",
                icon: "success",
                button: "Kembali",
              }).then(() => {
                // redirect ke Home setelah klik swal
                this.props.history.push("/");
              });
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return null; // tidak perlu render apapun karena swal tampil
  }
}
