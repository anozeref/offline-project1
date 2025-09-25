import React, { useState, useRef, useEffect } from "react";
import { Navbar, Container, Nav, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faClipboardList, faTrash, faBoxesStacked } from "@fortawesome/free-solid-svg-icons";

const NavbarComp = ({ notifStock, notifMessages, onClearKeranjang }) => {
  const [showNotif, setShowNotif] = useState(false);
  const notifRef = useRef();

  const toggleNotif = () => setShowNotif(!showNotif);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotif(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const badgeColor = notifMessages.some(msg => msg.includes("habis")) ? "danger" : "warning";

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img src={process.env.PUBLIC_URL + "/assets/logo.svg"} width={200} alt="Logo" />
        </Navbar.Brand>

        <Nav className="ms-auto" style={{ position: "relative" }} ref={notifRef}>
          <Nav.Link onClick={toggleNotif} style={{ position: "relative" }}>
            <FontAwesomeIcon icon={faBell} />
            {notifStock > 0 && (
              <Badge bg={badgeColor} pill className="ms-1">!</Badge>
            )}
          </Nav.Link>

          {/* Sliding dropdown */}
          <div
            style={{
              position: "absolute",
              top: "40px",
              right: 0,
              width: "250px",
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
              overflow: "hidden",
              maxHeight: showNotif ? "500px" : "0",
              opacity: showNotif ? 1 : 0,
              transition: "all 0.3s ease",
              zIndex: 1000,
            }}
          >
            <div style={{ padding: showNotif ? "10px" : "0" }}>
              {notifMessages.length === 0
                ? <div>Tidak ada notifikasi baru</div>
                : notifMessages.map((msg, idx) => (
                    <div key={idx} style={{ padding: "5px 0", borderBottom: "1px solid #eee" }}>
                      {msg}
                    </div>
                  ))
              }
            </div>
          </div>

          <Nav.Link href="/rekap">
            <FontAwesomeIcon icon={faClipboardList} />
          </Nav.Link>
          {/* New Manage Stock link */}
          <Nav.Link href="/ManageStock">
            <FontAwesomeIcon icon={faBoxesStacked} />
          </Nav.Link>

          <Nav.Link onClick={onClearKeranjang}>
            <FontAwesomeIcon icon={faTrash} />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
