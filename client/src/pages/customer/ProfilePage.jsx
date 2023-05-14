import { useContext } from "react";
import { useCookies } from "react-cookie";
import { AiFillEye, AiFillLock } from "react-icons/ai";
import { BsPersonFillLock } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import AccountNav from "../../components/customer/AccountNav";
import UserProfile from "../../components/customer/UserProfile";
import UserContext from "../../context/UserContext";

export default function ProfilePage() {
  const [user, setUser] = useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies("userId");
  const navigate = useNavigate();

  async function handleLogout() {
    setUser(null);
    removeCookie("userId");
    navigate("/");
  }

  return (
    <div>
      <AccountNav />
      <div>
        <div className="w-[80%] m-auto grid grid-cols-[2fr,1fr] gap-24 mt-20">
          <UserProfile user={user}></UserProfile>
          <div className="rounded-2xl border-2 p-6">
            <div>
              <BsPersonFillLock
                className="text-blue-500"
                size={50}
              ></BsPersonFillLock>
              <h2 className="font-semibold text-xl">
                Why is my information not displayed here?
              </h2>
              <p className="text-gray-500">
                We are hiding some account information to protect your identity.
              </p>
            </div>
            <div>
              <AiFillLock className="text-blue-500" size={50}></AiFillLock>
              <h2 className="font-semibold text-xl">
                What information can you edit?
              </h2>
              <p className="text-gray-500">
                The information we uses to verify your identity cannot be
                changed. You can edit your contact information and some personal
                information, but we may ask you to verify your identity the next
                time you book or create a rental.
              </p>
            </div>

            <div>
              <AiFillEye className="text-blue-500" size={50}></AiFillEye>
              <h2 className="font-semibold text-xl">
                What information is shared with others?
              </h2>
              <p className="text-gray-500">
                We only discloses contact information to Hosts/Organizers and
                guests once the reservation/reservation is confirmed.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center max-w-lg mx-auto mt-12">
          Logged in as {user.name}
          <br />
          <button onClick={handleLogout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
