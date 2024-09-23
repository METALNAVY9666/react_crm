import { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import Profile from "./Profile";
import Socials from "./Socials";

export default function Settings() {
  const [settingsMenu, setSettingsMenu] = useState<string>("profile");

  const subMenus: Record<string, Record<string, string | JSX.Element>> = {
    profile: { name: "Profil", render: <Profile /> },
    socials: { name: "Réseaux", render: <Socials /> },
  };

  return (
    <>
      <Navbar className="bg-body-tertiary ">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {Object.keys(subMenus).map((subMenu) => (
                <Nav.Link onClick={() => setSettingsMenu(subMenu)}>
                  {subMenus[subMenu]["name"]} <br />
                  {settingsMenu === subMenu ? (
                    <i className="bi bi-caret-up-fill" />
                  ) : null}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {Object.keys(subMenus)
        .filter((x) => x == settingsMenu)
        .map((y) => subMenus[y]["render"])}
    </>
  );
}
