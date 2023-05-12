import { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { register } from "../../api";
import UserContext from "../../context/UserContext";

export default function RegisterPage() {
  const [registerUser, setRegisterUser] = useState({});
  const [user, setUser] = useContext(UserContext);
  const [cookies, setCookie] = useCookies(["userId"]);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setRegisterUser({ ...registerUser, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    register(registerUser)
      .then((res) => {
        setUser(res.data);
        setCookie("userId", res.data._id);
      })
      .catch((err) => console.log(err));
    navigate("/");
  };
  if (user) {
    return <Navigate to={"/"}></Navigate>;
  }

  return (
    <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
      <div className="mt-4 flex items-center justify-center grow+">
        <div>
          <h1 className="text-4xl text-center mb-12">Register</h1>

          <input
            type="text"
            placeholder="Nguyen Van A"
            name="name"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="your@email.com"
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="phone"
            name="phone"
            onChange={handleChange}
          />
          <input type="date" name="birthday" onChange={handleChange}></input>
          <fieldset className="flex justify-start items-center gap-14">
            <label>Gender</label>
            <div className="flex px-6 justify-between items-center grow">
              <div>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onClick={handleChange}
                ></input>
                <label>Male</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onClick={handleChange}
                ></input>
                <label>Female</label>
              </div>
            </div>
          </fieldset>
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member?{" "}
            <Link className="underline text-black" to={"/login"}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
