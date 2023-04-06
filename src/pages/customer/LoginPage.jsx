import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import axios from "axios";
import { login } from "../../api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  async function checkValid({ email, password }) {
    // valid user
    // const {name,role} = await login({email,password})

    return true;
  }

  function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      if (!checkValid({ email, password })) {
        throw new Error("Sai tài khoản hoặc mật khẩu");
      }
      alert("Login successful");
      setUser({ username: email, role: "customer", isAuth: true });
      setRedirect(true);
    } catch (e) {
      alert("Login failed");
    }
  }

  return (
    <form onSubmit={handleLoginSubmit}>
      <div className="mt-4 flex items-center justify-center grow">
        <div>
          <h1 className="text-4xl text-center mb-12 font-semibold">Login</h1>

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
        </div>
      </div>
    </form>
  );
}
