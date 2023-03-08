import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from "../Image.jsx";

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
    setPlaces(data);
  }, []);
  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={"/place/" + place._id}>
            <div className="bg-gray-200 mb-2 rounded-2xl flex">
              {place.photos?.[0] && (
                <Image
                  className="rounded-2xl object-cover aspect-square m-auto"
                  src={place.photos?.[0]}
                  alt=""
                />
              )}
            </div>
            <h2 className="font-bold">{place.address}</h2>
            <h3 className="text-sm text-gray-500">{place.title}</h3>
            <div className="mt-1">
              <span className="font-bold">${place.price}</span> per night
            </div>
          </Link>
        ))}
    </div>
  );
}
