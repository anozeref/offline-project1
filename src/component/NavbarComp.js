import React from "react";
import { Navbar, Container, Nav, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faClipboardList, faTrash } from "@fortawesome/free-solid-svg-icons";

const NavbarComp = ({ notifStock, notifMessages, onClearKeranjang }) => {
  // Tentukan warna badge: merah kalau ada habis, kuning kalau cuma menipis
  const badgeColor = notifMessages.some(msg => msg.includes("habis")) ? "danger" : "warning";

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img src={process.env.PUBLIC_URL + "/assets/logo.svg"} width={200} alt="Logo" />
        </Navbar.Brand>

        <Nav className="ms-auto">
          {/* Notif stok */}
          <Nav.Link href="#" onClick={() => alert(notifMessages.join("\n"))}>
            <FontAwesomeIcon icon={faBell} />
            {notifStock > 0 && (
              <Badge bg={badgeColor} pill className="ms-1">!</Badge>
            )}
          </Nav.Link>

          {/* Rekap transaksi */}
          <Nav.Link href="/rekap">
            <FontAwesomeIcon icon={faClipboardList} />
          </Nav.Link>

          {/* Clear keranjang */}
          <Nav.Link onClick={onClearKeranjang}>
            <FontAwesomeIcon icon={faTrash} />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
