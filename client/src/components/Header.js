import React from "react";
import { Navbar, Nav } from "react-bootstrap";

function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/room">Video Chat</Nav.Link>
        <Nav.Link href="/notes">Notes</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default Header;
