import React from "react";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlask, faBone, faChampagneGlasses } from "@fortawesome/free-solid-svg-icons";

export default function Category({ kategoriAktif, changeCategory }) {
  const kategoriList = ["Cemilan", "Makanan", "Minuman"];
  const kategoriIcon = {
    Cemilan: faFlask,
    Makanan: faBone,
    Minuman: faChampagneGlasses
  }

  return (
    <Col className="mt-2">
      <h5>
        <strong>Kategori</strong>
      </h5>
      <hr />
      <ListGroup>
        {kategoriList.map((kategori, index) => (
          <ListGroup.Item
          
            key={index}
            active={kategoriAktif === kategori}
            onClick={() => changeCategory(kategori)}
            action
            style={{
              width:"150px",
              cursor: "pointer",
              textAlign: "left",   // biar text rapi di tengah
              fontWeight: "500",     // sedikit bold
              whiteSpace: "nowrap",  // biar 1 baris aja
              overflow: "hidden",    // sembunyikan kelebihan teks
              textOverflow: "ellipsis" // kasih titik-tiga kalau terlalu panjang
            }}
          >
            <FontAwesomeIcon icon={kategoriIcon[kategori]} />
            {kategori}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Col>
  );
}
