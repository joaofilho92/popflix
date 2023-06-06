import "./LoginPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [username, usernameupdate] = useState("");
  const [password, passwordupdate] = useState("");

  const usenavigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const ProceedLogin = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log("username:", username);
      fetch(`https://json-server-pop-flix.vercel.app/user?id=${username}`)
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          if (resp.length === 0) {
            toast.error("Inserisci un'e-mail valida");
          } else {
            const user = resp[0];
            if (user.password === password) {
              toast.success("Success");
              sessionStorage.setItem("username", user.name);
              usenavigate("/Home");
            } else {
              toast.error("Inserisci una password valida");
            }
          }
        })
        .catch((err) => {
          toast.error("Accesso non riuscito per :" + err.message);
        });
    }
  };

  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      toast.warning("Inserire un indirizzo email");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Inserire una password");
    }
    return result;
  };

  return (
    <div className="cont1">
      <div className="form1 position-absolute top-50 start-50 translate-middle">
        <h1 className="p-5 mt-1 title">Accedi</h1>
        <form onSubmit={ProceedLogin}>
          <div className="p-5 inpt1">
            <input
              htmlFor=""
              value={username}
              onChange={(e) => usernameupdate(e.target.value)}
              type="text"
              className="inp2"
              placeholder="Email"
            ></input>
            <input
              htmlFor=""
              value={password}
              onChange={(e) => passwordupdate(e.target.value)}
              type="password"
              className="inp3"
              placeholder="Password"
            ></input>
            <button type="submit" className="btn10">
              Entrar
            </button>
          </div>
        </form>
        <h3 className="ho3">
          Prima volta su PopFlix?{" "}
          <span>
            <Link to="/RegisterPage" className="spn2">
              Registrati.
            </Link>{" "}
          </span>
        </h3>
      </div>
    </div>
  );
};

export default LoginPage;
