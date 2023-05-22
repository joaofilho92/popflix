import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import "./MyFooter.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function MyFooter() {
  return (
    <>
      <MDBFooter className="text-center text-white Myfooter cont3">
        <MDBContainer className="pt-4 cont3">
          <section className="mb-4 cont3">
            <MDBBtn
              rippleColor="dark"
              color="link"
              floating
              size="lg"
              className="text-dark m-1"
              href="https://www.linkedin.com/in/joao-batista-sviluppatorefrontend/"
              role="button"
            >
              <MDBIcon fab className="fa-linkedin" />
            </MDBBtn>

            <MDBBtn
              rippleColor="dark"
              color="link"
              floating
              size="lg"
              className="text-dark m-1"
              href="https://github.com/joaofilho92"
              role="button"
            >
              <MDBIcon fab className="fa-github" />
            </MDBBtn>
          </section>
        </MDBContainer>

        <div className="text-center text-light p-3 bg-black txt1">
          © 2023 Copyright:
          <a className="text-light ms-1" href="http://localhost:3001/Home">
            Joao Batista - Epicode School Italy
          </a>
        </div>
      </MDBFooter>
    </>
  );
}

export default MyFooter;
