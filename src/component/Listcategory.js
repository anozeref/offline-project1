import React, { Component } from "react";
import { Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faCoffee, faCheese } from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }) => {
  if (nama === "Makanan") return <FontAwesomeIcon icon={faUtensils} className="me-2" />;
  if (nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} className="me-2" />;
  if (nama === "Cemilan") return <FontAwesomeIcon icon={faCheese} className="me-2" />;
  return <FontAwesomeIcon icon={faUtensils} className="me-2" />;
};

export default class ListCategory extends Component {
  state = { categories: [] };

  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((res) => this.setState({ categories: res.data }))
      .catch((err) => console.log(err));
  }

  render() {
    const { categories } = this.state;
    const { changeCategory, categoriYangDipilih } = this.props;
    return (
      <Col md={2} className="mt-2">
        <h5><strong>Daftar Kategori</strong></h5>
        <hr />
        <ListGroup>
          {categories.map((category) => (
            <ListGroup.Item
              key={category.id}
              onClick={() => changeCategory(category.nama)}
              className={categoriYangDipilih === category.nama ? "category-aktif" : ""}
              style={{ cursor: "pointer" }}
            >
              <h5><Icon nama={category.nama} /> {category.nama}</h5>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    );
  }
}
