import React from "react";

function UserProfile() {
  return (
    <div>
      <div>
        <label className="font-semibold text-lg">Tên pháp lý</label>
        <p className="text-gray-500">Nguyễn Văn A</p>
      </div>
      <hr className="mt-5 mb-5"></hr>
      <div>
        <label className="font-semibold text-lg">Ngày sinh</label>
        <p className="text-gray-500">29/02/2023</p>
      </div>
      <hr className="mt-5 mb-5"></hr>
      <div>
        <label className="font-semibold text-lg">Giới tính</label>
        <p className="text-gray-500">Nam</p>
      </div>
      <hr className="mt-5 mb-5"></hr>
      <div>
        <label className="font-semibold text-lg">Địa chỉ email</label>
        <p className="text-gray-500">binhthien@gmail.com</p>
      </div>
      <hr className="mt-5 mb-5"></hr>
      <div>
        <label className="font-semibold text-lg">Số điện thoại</label>
        <p className="text-gray-500">0865432198</p>
      </div>
      <hr className="mt-5 mb-5"></hr>
      <div>
        <label className="font-semibold text-lg">Địa chỉ</label>
        <p className="text-gray-500">Đường X, XYZ - ABC - VietNam</p>
      </div>
    </div>
  );
}

export default UserProfile;
