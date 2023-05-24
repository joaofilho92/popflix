import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MyNav.css";
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react";

const MyNav = () => {
  const usenavigate=useNavigate();
  useEffect(() => {
    let username = sessionStorage.getItem("username");
    if (username === "" || username === null) {
      usenavigate("/");
    }
  }, [usenavigate]);
      
  return (
    <Navbar expand="lg" className="Navb ">
      <Container fluid className="ms-5">
        <Link to={"/Home"} className="text-light ">
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
            <Nav.Link href="#action1" className="text-light navMenu">
              <Link to={"/Home"} className="text-light ">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link href="#action2" className="text-light navMenu">
              <Link to={"/Movie"} className="text-light ">
                Movie
              </Link>
            </Nav.Link>
            <Nav.Link href="#action2" className="text-light navMenu">
              <Link to={"/TvSeries"} className="text-light ">
                TvSeries
              </Link>
            </Nav.Link>
            <Nav.Link href="#action2" className="text-light navMenu">
              <Link to={"/Search"} className="text-light">
                Search
              </Link>
            </Nav.Link>
          </Nav>
          <Form className="d-flex mx-5">
            <button type="button" className="btn btn4 text-light">
              <Link to={"/"} className="text-light ">
                Logout
              </Link>
            </button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNav;
