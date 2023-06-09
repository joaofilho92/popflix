import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MyNav.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const MyNav = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let username = sessionStorage.getItem("username");
    if (username === "" || username === null) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Navbar expand="lg" className="Navb">
      <Container fluid className="ms-5">
        <Link to="/Home" className="text-light">
          <img
            src="/img/PopFlix2.png"
            className="img1"
            alt="PopFlix_logo"
            href="/Home"
          />
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 ms-4 text-light"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Item className="navMenu">
              <Nav.Link as={Link} to="/Home" className="text-light">
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="navMenu">
              <Nav.Link as={Link} to="/Movie" className="text-light">
                Movie
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="navMenu">
              <Nav.Link as={Link} to="/TvSeries" className="text-light">
                TvSeries
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="navMenu">
              <Nav.Link as={Link} to="/Search" className="text-light">
                Search
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav className="d-flex mx-5">
            <Nav.Item>
              <button type="button" className="btn btn4 text-light">
                <Link to="/" className="text-light">
                  Logout
                </Link>
              </button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNav;
