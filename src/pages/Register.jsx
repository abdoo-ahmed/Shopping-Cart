import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useContext(AppContext);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    document.getElementById("userName")?.focus();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!userName || !password || !email) return alert("please Fill The Empty");
    register(userName, email, password);
    setTimeout(() => nav("/login"), 500);
  }

  return (
    
    
   <section
  className="d-flex justify-content-center align-items-center"
  style={{ minHeight: "calc(100vh - 70px)" }}
>
  <div
    className="card bg-primary text-center p-4"
    style={{ maxWidth: "700px", width: "100%" }}
  >
    <h2 className="text-white fw-bold mb-4">Register User</h2>

    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          id="userName"
          type="text"
          className="form-control"
          placeholder="Enter User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Enter User Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Enter User password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <input
          type="submit"
          value="Sign up"
          id="signUP"
          className="btn btn-light w-100"
        />
      </div>

      <div className="text-light">
        <strong>Have Already Account?</strong>{" "}
        <a href="/login" className="text-white fw-bold text-decoration-none">
          Login
        </a>
      </div>
    </form>
  </div>
</section>


    
  );
}
