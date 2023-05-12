import { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { login } from "../../api";
import UserContext from "../../context/UserContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [cookies, setCookie] = useCookies(["userId"]);
  const [user, setUser] = useContext(UserContext);

  const handleLoginSubmit = async (ev) => {
    ev.preventDefault();

    login({ email, password })
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data);
          setCookie("userId", res.data._id);
          alert("Login successful");
          navigate("/");
        } else {
          setError(true);
        }
      })
      .catch((err) => console.log(err));
  };

  if (user) {
    return <Navigate to={"/"}></Navigate>;
  }

  return (
    <>
      {error && (
        <div className="bg-red-400/40 text-center py-2 rounded-3xl">
          <p className="text-red-800 font-semibold">{`Wrong email or password! Try again.`}</p>
        </div>
      )}
      <form
        onSubmit={handleLoginSubmit}
        className="flex flex-col justify-start items-center"
      >
        <div className="mt-4">
          <h1 className="text-4xl text-center mb-12 font-semibold">Login</h1>
          <div>
            <div className="">
              <label className="">Email</label>
              <input
                className=""
                type="email"
                value={email}
                onChange={(ev) => {
                  setEmail(ev.target.value);
                  setError(false);
                }}
              />
              <span></span>
            </div>

            <div>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(ev) => {
                  setPassword(ev.target.value);
                  setError(false);
                }}
              />
              <span></span>
            </div>

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
    </>
  );
}
