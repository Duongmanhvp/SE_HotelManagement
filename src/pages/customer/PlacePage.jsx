import { useEffect, useState } from "react";
import AddressLink from "../../components/customer/AddressLink";
import BookingWidget from "../../components/customer/BookingWidget";
import PlaceGallery from "../../components/customer/PlaceGallery";
import { FaWifi } from "react-icons/fa";
import {
  extractReviewScores,
  formatStarRate,
  extractDate,
} from "../../utils/Caculate";
import _place from "../../data/sampleData";
import { RxAvatar } from "react-icons/rx";
import {
  BsFillHouseDoorFill,
  BsAwardFill,
  BsCheckCircleFill,
} from "react-icons/bs";
import { AiFillCalendar } from "react-icons/ai";
import RateBar from "../../components/customer/RateBar";
import { useParams } from "react-router-dom";
import { getPlaceById } from "../../api";

export default function PlacePage() {
  const [place, setPlace] = useState(null);
  const { placeId } = useParams();
  let reviewScores = extractReviewScores(_place);
  useEffect(() => {
    //window.scrollTo(0, 0);
    getPlaceById(placeId)
      .then((res) => {
        setPlace(res.data);
        reviewScores = extractReviewScores(res.data);
      })
      .catch((err) => {
        setPlace(_place);
        reviewScores = extractReviewScores(_place);
      });
  }, []);

  if (!place) return "";

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold">{place.name}</h1>
      <div className="flex items-center">
        <p className="mr-2">
          <span className="font-bold text-lg">
            ⭐{place.review_scores.review_scores_rating.$numberInt / 10}
          </span>{" "}
          •
          <span className="ml-1 font-bold text-lg">
            {place.number_of_reviews.$numberInt}
          </span>{" "}
          đánh giá
        </p>
        <AddressLink>{place.address.street}</AddressLink>
      </div>

      <img
        src={place.images.picture_url}
        className="rounded-3xl h-[480px] cover m-auto"
      ></img>
      <div className="flex justify-between mt-12 gap-12 ">
        <div>
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-xl font-semibold mb-2">
                  {place.name} • Chủ nhà {place.host.host_name}{" "}
                </h1>
                <p>
                  {place.accommodates.$numberInt} khách •{" "}
                  {place.bedrooms.$numberInt} phòng ngủ •{" "}
                  {place.beds.$numberInt} giường •{" "}
                  {Math.floor(place.bathrooms.$numberDecimal)} phòng tắm
                </p>
              </div>
              <div>
                <RxAvatar size={40}></RxAvatar>
              </div>
            </div>
            <hr></hr>
            <div className="mt-6">
              <div className="flex items-center mb-10">
                <BsFillHouseDoorFill size={30}></BsFillHouseDoorFill>
                <div className="ml-4">
                  <h2 className="font-semibold text-lg">Loại phòng</h2>
                  <p>
                    {place.property_type} • {place.room_type} • {place.bed_type}
                  </p>
                </div>
              </div>
              <div className="flex items-center mb-10">
                <BsAwardFill size={30}></BsAwardFill>
                <div className="ml-4">
                  <h2 className="font-semibold text-lg">
                    Owner {place.host.host_name}
                  </h2>
                  <p>{place.host.host_about}</p>
                </div>
              </div>
              <div className="flex items-center mb-10">
                <AiFillCalendar size={30}></AiFillCalendar>
                <div className="ml-4">
                  <h2 className="font-semibold text-lg">Chính sách đổi trả</h2>
                  <p>Hủy miễn phí trong 48 giờ.</p>
                </div>
              </div>
            </div>
            <hr></hr>
            <div className="my-6">
              <h2 className="font-bold text-2xl mb-5">Mô tả phòng</h2>
              <p className="leading-loose">{place.description}</p>
            </div>
            <hr></hr>
            <div className="my-6">
              <h2 className="font-bold text-2xl mb-8">
                Nơi này có những gì cho bạn
              </h2>
              <ul className="grid grid-cols-2">
                {place.amenities.map((item) => (
                  <li className="flex items-center mb-6">
                    <BsCheckCircleFill
                      size={24}
                      style={{ color: "green" }}
                    ></BsCheckCircleFill>
                    <span className="ml-3">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <hr></hr>
          </div>
        </div>

        <BookingWidget place={place}></BookingWidget>
      </div>
      <div className="my-8">
        <h2 className="text-2xl">
          <span className="font-bold ">
            ⭐{place.review_scores.review_scores_rating.$numberInt / 10}
          </span>{" "}
          •
          <span className="ml-2 font-bold ">
            {place.number_of_reviews.$numberInt}
          </span>{" "}
          đánh giá
        </h2>
        <ul className="grid grid-cols-2 mt-4 gap-x-56 gap-y-5">
          {reviewScores.map((item) => (
            <li className="flex justify-between items-center">
              <p className="font-semibold">{item[0]}</p>
              <RateBar rate={item[1]}></RateBar>
            </li>
          ))}
        </ul>
      </div>
      <ul className="grid grid-cols-2 gap-x-56">
        {place.reviews.map((item) => (
          <li className="mb-8">
            <div className="flex items-center">
              <RxAvatar size={40}></RxAvatar>
              <div className="ml-2 mb-2">
                <p className="font-semibold">{item.reviewer_name}</p>
                <span className="font-light">
                  {extractDate(item.date.$date.$numberLong)}
                </span>
              </div>
            </div>
            <p className="leading-relaxed line-clamp-3">{item.comments}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
