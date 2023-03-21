import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from "../components/Image.jsx";

export default function IndexPage() {
  const data = [
    {
      _id: 1,
      photos: [
        "https://picsum.photos/200",
        "https://picsum.photos/201",
        "https://picsum.photos/202",
      ],
      address: "Telluride, Colorado, Hoa Kỳ",
      title: "Kiệt tác kiến trúc. Tầm nhìn đẹp nhất ở Telluride",
      price: 428,
    },
    {
      _id: 2,
      photos: [
        "https://picsum.photos/200",
        "https://picsum.photos/201",
        "https://picsum.photos/202",
      ],
      address: "Telluride, Colorado, Hoa Kỳ",
      title: "Kiệt tác kiến trúc. Tầm nhìn đẹp nhất ở Telluride",
      price: 428,
    },
    {
      _id: 2,
      photos: [
        "https://picsum.photos/200",
        "https://picsum.photos/201",
        "https://picsum.photos/202",
      ],
      address: "Telluride, Colorado, Hoa Kỳ",
      title: "Kiệt tác kiến trúc. Tầm nhìn đẹp nhất ở Telluride",
      price: 428,
    },
    {
      _id: 2,
      photos: [
        "https://picsum.photos/200",
        "https://picsum.photos/201",
        "https://picsum.photos/202",
      ],
      address: "Telluride, Colorado, Hoa Kỳ",
      title: "Kiệt tác kiến trúc. Tầm nhìn đẹp nhất ở Telluride",
      price: 428,
    },
    {
      _id: 2,
      photos: [
        "https://picsum.photos/200",
        "https://picsum.photos/201",
        "https://picsum.photos/202",
      ],
      address: "Telluride, Colorado, Hoa Kỳ",
      title: "Kiệt tác kiến trúc. Tầm nhìn đẹp nhất ở Telluride",
      price: 428,
    },
    {
      _id: 2,
      photos: [
        "https://picsum.photos/200",
        "https://picsum.photos/201",
        "https://picsum.photos/202",
      ],
      address: "Telluride, Colorado, Hoa Kỳ",
      title: "Kiệt tác kiến trúc. Tầm nhìn đẹp nhất ở Telluride",
      price: 428,
    },
    {
      _id: 2,
      photos: [
        "https://picsum.photos/200",
        "https://picsum.photos/201",
        "https://picsum.photos/202",
      ],
      address: "Telluride, Colorado, Hoa Kỳ",
      title: "Kiệt tác kiến trúc. Tầm nhìn đẹp nhất ở Telluride",
      price: 428,
    },
    {
      _id: 2,
      photos: [
        "https://picsum.photos/200",
        "https://picsum.photos/201",
        "https://picsum.photos/202",
      ],
      address: "Telluride, Colorado, Hoa Kỳ",
      title: "Kiệt tác kiến trúc. Tầm nhìn đẹp nhất ở Telluride",
      price: 428,
    },
    {
      _id: 2,
      photos: [
        "https://picsum.photos/200",
        "https://picsum.photos/201",
        "https://picsum.photos/202",
      ],
      address: "Telluride, Colorado, Hoa Kỳ",
      title: "Kiệt tác kiến trúc. Tầm nhìn đẹp nhất ở Telluride",
      price: 428,
    },
    {
      _id: 2,
      photos: [
        "https://picsum.photos/200",
        "https://picsum.photos/201",
        "https://picsum.photos/202",
      ],
      address: "Telluride, Colorado, Hoa Kỳ",
      title: "Kiệt tác kiến trúc. Tầm nhìn đẹp nhất ở Telluride",
      price: 428,
    },
    {
      _id: 2,
      photos: [
        "https://picsum.photos/200",
        "https://picsum.photos/201",
        "https://picsum.photos/202",
      ],
      address: "Telluride, Colorado, Hoa Kỳ",
      title: "Kiệt tác kiến trúc. Tầm nhìn đẹp nhất ở Telluride",
      price: 428,
    },
    {
      _id: 2,
      photos: [
        "https://picsum.photos/200",
        "https://picsum.photos/201",
        "https://picsum.photos/202",
      ],
      address: "Telluride, Colorado, Hoa Kỳ",
      title: "Kiệt tác kiến trúc. Tầm nhìn đẹp nhất ở Telluride",
      price: 428,
    },
    {
      _id: 2,
      photos: [
        "https://picsum.photos/200",
        "https://picsum.photos/201",
        "https://picsum.photos/202",
      ],
      address: "Telluride, Colorado, Hoa Kỳ",
      title: "Kiệt tác kiến trúc. Tầm nhìn đẹp nhất ở Telluride",
      price: 428,
    },
    {
      _id: 2,
      photos: [
        "https://picsum.photos/200",
        "https://picsum.photos/201",
        "https://picsum.photos/202",
      ],
      address: "Telluride, Colorado, Hoa Kỳ",
      title: "Kiệt tác kiến trúc. Tầm nhìn đẹp nhất ở Telluride",
      price: 428,
    },
    {
      _id: 2,
      photos: [
        "https://picsum.photos/200",
        "https://picsum.photos/201",
        "https://picsum.photos/202",
      ],
      address: "Telluride, Colorado, Hoa Kỳ",
      title: "Kiệt tác kiến trúc. Tầm nhìn đẹp nhất ở Telluride",
      price: 428,
    },
    {
      _id: 2,
      photos: [
        "https://picsum.photos/200",
        "https://picsum.photos/201",
        "https://picsum.photos/202",
      ],
      address: "Telluride, Colorado, Hoa Kỳ",
      title: "Kiệt tác kiến trúc. Tầm nhìn đẹp nhất ở Telluride",
      price: 428,
    },
    {
      _id: 2,
      photos: [
        "https://picsum.photos/200",
        "https://picsum.photos/201",
        "https://picsum.photos/202",
      ],
      address: "Telluride, Colorado, Hoa Kỳ",
      title: "Kiệt tác kiến trúc. Tầm nhìn đẹp nhất ở Telluride",
      price: 428,
    },
    {
      _id: 2,
      photos: [
        "https://picsum.photos/200",
        "https://picsum.photos/201",
        "https://picsum.photos/202",
      ],
      address: "Telluride, Colorado, Hoa Kỳ",
      title: "Kiệt tác kiến trúc. Tầm nhìn đẹp nhất ở Telluride",
      price: 428,
    },
    {
      _id: 2,
      photos: [
        "https://picsum.photos/200",
        "https://picsum.photos/201",
        "https://picsum.photos/202",
      ],
      address: "Telluride, Colorado, Hoa Kỳ",
      title: "Kiệt tác kiến trúc. Tầm nhìn đẹp nhất ở Telluride",
      price: 428,
    },
  ];
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    setPlaces(data);
  }, []);
  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <div className="hover:shadow-xl hover:-translate-y-2 duration-300 px-2 pb-4 rounded-2xl">
            <Link to={"/place/" + place._id}>
              <div className="bg-gray-200 mb-2 rounded-2xl flex ">
                {place.photos?.[0] && (
                  <Image
                    className=" object-cover aspect-square m-auto"
                    src={place.photos?.[0]}
                    alt=""
                  />
                )}
              </div>
              <div className="grid grid-cols-[4fr,1fr]">
                <div>
                  <h2 className="font-bold">{place.address}</h2>
                  <h3 className="text-sm text-gray-500 mt-1">{place.title}</h3>
                  <div className="mt-2">
                    <span className="font-bold">${place.price}</span> per night
                  </div>
                </div>
                <div className="justify-self-end">
                  <span>⭐4,6</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
}
