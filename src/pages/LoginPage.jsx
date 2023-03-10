import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { users } from "../data/Data.jsx";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  function checkValid({ email, password }) {
    for (let index = 0; index < users.length; index++) {
      const element = users[index];
      if (element.email === email && element.password === password) {
        localStorage.setItem("name", element.name);
        localStorage.setItem("email", element.email);
        return true;
      }
    }

    return false;
  }

  function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      if (!checkValid({ email, password })) {
        throw new Error("Sai tài khoản hoặc mật khẩu");
      }
      alert("Login successful");
      setRedirect(true);
    } catch (e) {
      alert("Login failed");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{" "}
            <Link className="underline text-black" to={"/register"}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
