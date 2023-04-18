import axios from "axios";
import { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../../components/customer/AccountNav";
import PlacesPage from "./PlacesPage";
import { AiFillLock, AiFillEye } from "react-icons/ai";
import { BsPersonFillLock } from "react-icons/bs";
import UserProfile from "../../components/customer/UserProfile";
import UserContext from "../../context/UserContext";

export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const { user, setUser } = useContext(UserContext);
  async function logout() {
    setUser({ username: "", role: "", isAuth: false });
    setRedirect("/");
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      <AccountNav />
      <div>
        <div className="w-[80%] m-auto grid grid-cols-[2fr,1fr] gap-24 mt-20">
          <UserProfile></UserProfile>
          <div className="rounded-2xl border-2 p-6">
            <div>
              <BsPersonFillLock
                className="text-blue-500"
                size={50}
              ></BsPersonFillLock>
              <h2 className="font-semibold text-xl">
                Tại sao thông tin của tôi không được hiển thị ở đây?
              </h2>
              <p className="text-gray-500">
                Chúng tôi đang ẩn một số thông tin tài khoản để bảo vệ danh tính
                của bạn.
              </p>
            </div>
            <div>
              <AiFillLock className="text-blue-500" size={50}></AiFillLock>
              <h2 className="font-semibold text-xl">
                Bạn có thể chỉnh sửa những thông tin nào?
              </h2>
              <p className="text-gray-500">
                Không thể thay đổi thông tin mà chúng tôi sử dụng để xác minh
                danh tính của bạn. Bạn có thể chỉnh sửa thông tin liên hệ và một
                số thông tin cá nhân, nhưng chúng tôi có thể yêu cầu bạn xác
                minh danh tính vào lần tới khi bạn đặt phòng hoặc tạo mục cho
                thuê.
              </p>
            </div>

            <div>
              <AiFillEye className="text-blue-500" size={50}></AiFillEye>
              <h2 className="font-semibold text-xl">
                Thông tin nào được chia sẻ với người khác?
              </h2>
              <p className="text-gray-500">
                Chúng tôi chỉ tiết lộ thông tin liên lạc cho Chủ nhà/Người tổ
                chức và khách sau khi đặt phòng/đặt chỗ được xác nhận.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center max-w-lg mx-auto mt-12">
          Logged in as {user.username}
          <br />
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}