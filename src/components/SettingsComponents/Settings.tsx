import { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import Profile from "./Profile";

export default function Settings() {
  const [settingsMenu, setSettingsMenu] = useState<string>("profile");

  return (
    <>
      <Navbar className="bg-body-tertiary ">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => setSettingsMenu("profile")}>
                Profil <br />
                {settingsMenu === "profile" ? (
                  <i className="bi bi-caret-up-fill" />
                ) : null}
              </Nav.Link>
              <Nav.Link onClick={() => setSettingsMenu("appearence")}>
                Apparence <br />
                {settingsMenu === "appearence" ? (
                  <i className="bi bi-caret-up-fill" />
                ) : null}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {settingsMenu === "profile" ? <Profile /> : null}
    </>
  );
}
