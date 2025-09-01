import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AppContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    document.getElementById("userName")?.focus();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!userName || !password) return alert("Fill Your Data");
    const ok = login(userName, password);
    if (ok) nav("/");
    else alert("not valid");
  }

  return (
    <section className="d-flex justify-content-center align-items-center" style={{ minHeight: "calc(100vh - 70px)" }}>
      <div className="card bg-primary text-center p-4" style={{ maxWidth: "600px", width: "100%" }}>
        <h2 className="text-white fw-bold mb-4">Login User</h2>

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
              value="Sign In"
              className="btn btn-light w-100"
              id="signIn"
            />
          </div>

          <div className="text-light">
            Sign up Now?{" "}
            <a href="/register" className="text-white fw-bold text-decoration-none">
              Register
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
