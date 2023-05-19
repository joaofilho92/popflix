import "./RegisterPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegisterPage() {
  const [id, idchange] = useState("");
  const [password, passwordchange] = useState("");
  const [name, namechange] = useState("");

  const navigate = useNavigate();

  const IsValidate = () => {
    let isproceed = true;
    let errormessage = "Inserisci un valore in";
    if (id === null || id === "") {
      isproceed = false;
      errormessage += "Email";
    }
    if (id === null || password === "") {
      isproceed = false;
      errormessage += "Password";
    }
    if (id === null || name === "") {
      isproceed = false;
      errormessage += "Name";
    }
    if (!isproceed) {
      toast.warning(errormessage);
    } else {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(id)) {
      } else {
        isproceed = false;
        toast.warning("Inserire un indirizzo e-mail valido");
      }
    }
    return isproceed;
  };

  const handleSubmit = (e) => {
    if (IsValidate()) {
      e.preventDefault();
      let regobj = { id, name, password };
      //console.log(regobj);

      fetch("http://localhost:3000/user", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(regobj),
      })
        .then((res) => {
          toast.success("Register successfully.");
          navigate("/");
        })
        .catch((err) => {
          toast.sucess("Failed : " + err.message);
        });
    }
  };

  return (
    <div className="cont2">
      <div className="form2 position-absolute top-50 start-50 translate-middle">
        <h1 className="p-5 mt-1 title">Iscriviti ora</h1>
        <form onSubmit={handleSubmit}>
          <div className="p-5 inpt1">
            <input
              htmlFor=""
              required
              value={name}
              onChange={(e) => namechange(e.target.value)}
              type="text"
              className="inp2 NomeUser"
              placeholder="Nome"
            ></input>

            <input
              htmlFor=""
              required
              value={id}
              onChange={(e) => idchange(e.target.value)}
              type="text"
              className="inp2 EmailUser"
              placeholder="Email"
            ></input>

            <input
              htmlFor=""
              required
              value={password}
              onChange={(e) => passwordchange(e.target.value)}
              type="password"
              className="inp3"
              placeholder="Password"
            ></input>

            <div className="position-relative mt-4 custom ">
              <input
                required
                type="checkbox"
                className="checkbox position-absolute ml-5 "
              />
              <label className="termini">Accetto i Termini di Utilizzo</label>
            </div>

            <button type="submit" className="btn1">
              Registrati
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
