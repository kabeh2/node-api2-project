import React, { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap";

const AppNavbar = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="primary" dark expand="md">
        <Container>
          <NavbarBrand href="/">Node Project #2</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink
                  tag={RRNavLink}
                  exact
                  to="/"
                  className="nav-link"
                  activeClassName="active"
                >
                  Home
                </NavLink>
              </NavItem>
            </Nav>
            <Nav navbar>
              <NavItem>
                <NavLink
                  tag={RRNavLink}
                  to="/add"
                  className="nav-link"
                  activeClassName="active"
                >
                  Add
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default AppNavbar;
