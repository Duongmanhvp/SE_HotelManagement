import { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { register } from "../../api";
import UserContext from "../../context/UserContext";
import registerSchema from "../../validate/RegisterValidator";
import subYears from "date-fns/subYears";

export default function RegisterPage() {
  // const [registerUser, setRegisterUser] = useState({});
  const [user, setUser] = useContext(UserContext);
  const [cookies, setCookie] = useCookies(["userId"]);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
    gender: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setError(false);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (subYears(Date.now(), 18).getTime() < new Date(formData.birthday)) {
      setError("User must be more than 18 years old.");
      return;
    }
    try {
      const result = registerSchema.validate(formData);
      if (!result.error) {
        register(formData).then((res) => {
          setUser(res.data);
          setCookie("userId", res.data._id);
        });
        navigate("/");
      } else {
        window.scrollTo(0, 0);
        setError(result.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (user) {
    return <Navigate to={"/"}></Navigate>;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="w-2/3 py-10 px-[5%]">
        {error && (
          <div className="bg-red-400/40 text-center py-2 rounded-3xl">
            <p className="text-red-800 font-semibold">{`Error: ${error}`}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <h2 className="text-3xl font-semibold text-center mb-4">
            Register user
          </h2>
          <label className="flex flex-col">
            <span className="text-gray-700">Name</span>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-gray-700">Email</span>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-gray-700">Password</span>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-gray-700">Phone</span>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-gray-700">Birthday</span>

            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleInputChange}
              className="mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-gray-700">Gender</span>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select</option>

              <option value="Male">Male</option>

              <option value="Female">Female</option>

              <option value="Other">Other</option>
            </select>
          </label>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Register
          </button>
          <div className="text-center mt-4">
            <span className="text-gray-700">Already have an account?</span>
            <Link
              to={"/login"}
              className="text-blue-500 hover:text-blue-700 font-bold"
            >
              {" "}
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
