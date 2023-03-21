import React, { useState } from "react";

function CustomersDetail() {
  const [index, setIndex] = useState(1);
  return (
    <div>
      <h1 className="font-bold text-xl mt-3 ml-6">Chi tiết khách hàng</h1>
      <hr className="mt-3"></hr>
      <div className="flex justify-start items-center mt-4 ml-6">
        <img
          src="https://picsum.photos/200"
          className="w-32 h-32 rounded-full"
        ></img>
        <div className="ml-8">
          <span className=" font-bold text-2xl">Nguyễn Văn A</span>
          <p className=" text-md">
            Rank: <span className="font-bold">Gold</span> • Khách hàng tiềm năng
          </p>
        </div>
      </div>
      <hr className="mt-3"></hr>
      <div className=" mt-5 flex justify-center items-center">
        <button
          onClick={() => setIndex(1)}
          className={`px-6 py-3 rounded-xl ${index === 1 && "bg-pink-500"}`}
        >
          Hồ sơ
        </button>
        <button
          onClick={() => setIndex(2)}
          className={`px-6 py-3 ml-3 rounded-xl ${
            index === 2 && "bg-pink-500"
          }`}
        >
          Đơn mua
        </button>
      </div>

      {index === 1 && (
        <div className="grid grid-cols-2 gap-3 w-1/2 m-auto mt-8">
          <div className="font-bold text-right">
            <p>Họ tên</p>
            <p>Ngày sinh</p>
            <p>Giới tính</p>
            <p>Địa chỉ</p>
            <p>Dân tộc</p>
            <p>Email</p>
            <p>Số điện thoại</p>
          </div>
          <div>
            <p>Nguyễn Văn A</p>
            <p>28/06/2003</p>
            <p>Nam</p>
            <p>Thành phố Hà Nội - Việt Nam</p>
            <p>Kinh</p>
            <p>abcxyz@gmail.com</p>
            <p>0123456987</p>
          </div>
        </div>
      )}
      {index === 2 && (
        <div className="mt-8 ml-12">
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <li>
              <img
                src="https://picsum.photos/200"
                className="w-20 h-20 rounded-lg float-left ml-3 mr-4"
              ></img>
              <p>EcoLuxe Cabin w/Conversation Pit : 32 Acres +Trail</p>
              <p>Đánh giá: ⭐⭐⭐⭐⭐</p>
              <p>
                <span className="font-bold">Thanh toán:</span> $762
              </p>
            </li>
            <li>
              <img
                src="https://picsum.photos/200"
                className="w-20 h-20 rounded-lg float-left ml-3 mr-4"
              ></img>
              <p>EcoLuxe Cabin w/Conversation Pit : 32 Acres +Trail</p>
              <p>Đánh giá: ⭐⭐⭐⭐⭐</p>
              <p>
                <span className="font-bold">Thanh toán:</span> $762
              </p>
            </li>
            <li>
              <img
                src="https://picsum.photos/200"
                className="w-20 h-20 rounded-lg float-left ml-3 mr-4"
              ></img>
              <p>EcoLuxe Cabin w/Conversation Pit : 32 Acres +Trail</p>
              <p>Đánh giá: ⭐⭐⭐⭐⭐</p>
              <p>
                <span className="font-bold">Thanh toán:</span> $762
              </p>
            </li>
            <li>
              <img
                src="https://picsum.photos/200"
                className="w-20 h-20 rounded-lg float-left ml-3 mr-4"
              ></img>
              <p>EcoLuxe Cabin w/Conversation Pit : 32 Acres +Trail</p>
              <p>Đánh giá: ⭐⭐⭐⭐⭐</p>
              <p>
                <span className="font-bold">Thanh toán:</span> $762
              </p>
            </li>
            <li>
              <img
                src="https://picsum.photos/200"
                className="w-20 h-20 rounded-lg float-left ml-3 mr-4"
              ></img>
              <p>EcoLuxe Cabin w/Conversation Pit : 32 Acres +Trail</p>
              <p>Đánh giá: ⭐⭐⭐⭐⭐</p>
              <p>
                <span className="font-bold">Thanh toán:</span> $762
              </p>
            </li>
            <li>
              <img
                src="https://picsum.photos/200"
                className="w-20 h-20 rounded-lg float-left ml-3 mr-4"
              ></img>
              <p>EcoLuxe Cabin w/Conversation Pit : 32 Acres +Trail</p>
              <p>Đánh giá: ⭐⭐⭐⭐⭐</p>
              <p>
                <span className="font-bold">Thanh toán:</span> $762
              </p>
            </li>
            <li>
              <img
                src="https://picsum.photos/200"
                className="w-20 h-20 rounded-lg float-left ml-3 mr-4"
              ></img>
              <p>EcoLuxe Cabin w/Conversation Pit : 32 Acres +Trail</p>
              <p>Đánh giá: ⭐⭐⭐⭐⭐</p>
              <p>
                <span className="font-bold">Thanh toán:</span> $762
              </p>
            </li>
            <li>
              <img
                src="https://picsum.photos/200"
                className="w-20 h-20 rounded-lg float-left ml-3 mr-4"
              ></img>
              <p>EcoLuxe Cabin w/Conversation Pit : 32 Acres +Trail</p>
              <p>Đánh giá: ⭐⭐⭐⭐⭐</p>
              <p>
                <span className="font-bold">Thanh toán:</span> $762
              </p>
            </li>
            <li>
              <img
                src="https://picsum.photos/200"
                className="w-20 h-20 rounded-lg float-left ml-3 mr-4"
              ></img>
              <p>EcoLuxe Cabin w/Conversation Pit : 32 Acres +Trail</p>
              <p>Đánh giá: ⭐⭐⭐⭐⭐</p>
              <p>
                <span className="font-bold">Thanh toán:</span> $762
              </p>
            </li>
            <li>
              <img
                src="https://picsum.photos/200"
                className="w-20 h-20 rounded-lg float-left ml-3 mr-4"
              ></img>
              <p>EcoLuxe Cabin w/Conversation Pit : 32 Acres +Trail</p>
              <p>Đánh giá: ⭐⭐⭐⭐⭐</p>
              <p>
                <span className="font-bold">Thanh toán:</span> $762
              </p>
            </li>
            <li>
              <img
                src="https://picsum.photos/200"
                className="w-20 h-20 rounded-lg float-left ml-3 mr-4"
              ></img>
              <p>EcoLuxe Cabin w/Conversation Pit : 32 Acres +Trail</p>
              <p>Đánh giá: ⭐⭐⭐⭐⭐</p>
              <p>
                <span className="font-bold">Thanh toán:</span> $762
              </p>
            </li>
            <li>
              <img
                src="https://picsum.photos/200"
                className="w-20 h-20 rounded-lg float-left ml-3 mr-4"
              ></img>
              <p>EcoLuxe Cabin w/Conversation Pit : 32 Acres +Trail</p>
              <p>Đánh giá: ⭐⭐⭐⭐⭐</p>
              <p>
                <span className="font-bold">Thanh toán:</span> $762
              </p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default CustomersDetail;
