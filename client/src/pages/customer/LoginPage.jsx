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

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login({ email, password })
      .then((res) => {
        setUser(res.data);
        setCookie("userId", res.data._id);
        alert("Login successful");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };

  if (user) {
    return <Navigate to={"/"}></Navigate>;
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="w-1/2 py-10 px-[5%]">
          {error && (
            <div className="bg-red-400/40 text-center py-2 rounded-3xl">
              <p className="text-red-800 font-semibold">{`Wrong email or password! Try again.`}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="bg-gray-100 p-10 rounded-lg">
            <h2 className="text-3xl font-semibold text-center mb-4">Login</h2>
            <label className="block mb-2">
              Email
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="border border-gray-400 p-2 w-full rounded-lg"
              />
            </label>

            <label className="block mb-2">
              Password
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className="border border-gray-400 p-2 w-full rounded-lg"
              />
            </label>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 w-full"
            >
              Login
            </button>
            <p className="text-center mt-4">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-500 hover:text-blue-700 font-bold"
              >
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
