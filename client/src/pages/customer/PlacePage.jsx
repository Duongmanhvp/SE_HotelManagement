import { useEffect, useState } from "react";
import AddressLink from "../../components/customer/AddressLink";
import BookingWidget from "../../components/customer/BookingWidget";
import PlaceGallery from "../../components/customer/PlaceGallery";
import { FaWifi } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import {
  extractReviewScores,
  formatStarRate,
  extractDate,
  getReviewScore,
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
  const [showServices, setShowServices] = useState(false);
  const [longService, setLongService] = useState(false);
  const { placeId } = useParams();
  let star = getReviewScore(place?.review_scores);
  let reviewScores = extractReviewScores(place);
  useEffect(() => {
    window.scrollTo(0, 0);
    getPlaceById(placeId)
      .then((res) => {
        setPlace(res.data);
        setLongService(res.data.amenities.length > 10);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!place) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold">{place.name}</h1>
      <div className="flex items-center">
        <p className="mr-2">
          <span className="font-bold text-lg">⭐{star || "Not rated"}</span> •
          <span className="ml-1 font-bold text-lg">{place.reviews.length}</span>{" "}
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
                  {place.guests_included} khách • {place.bedrooms} phòng ngủ •{" "}
                  {place.beds} giường • {Math.floor(place.bathrooms)} phòng tắm
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
                {!longService &&
                  place.amenities.map((item) => (
                    <li className="flex items-center mb-6">
                      <BsCheckCircleFill
                        size={24}
                        style={{ color: "green" }}
                      ></BsCheckCircleFill>
                      <span className="ml-3">{item}</span>
                    </li>
                  ))}
                {longService && !showServices && (
                  <>
                    {place.amenities.slice(0, 10).map((item) => (
                      <li className="flex items-center mb-6">
                        <BsCheckCircleFill
                          size={24}
                          style={{ color: "green" }}
                        ></BsCheckCircleFill>
                        <span className="ml-3">{item}</span>
                      </li>
                    ))}
                    <button
                      className="toggle-btn"
                      onClick={() => {
                        setShowServices(true);
                      }}
                    >
                      Show all
                    </button>
                  </>
                )}
                {longService && showServices && (
                  <>
                    {place.amenities.map((item) => (
                      <li className="flex items-center mb-6">
                        <BsCheckCircleFill
                          size={24}
                          style={{ color: "green" }}
                        ></BsCheckCircleFill>
                        <span className="ml-3">{item}</span>
                      </li>
                    ))}
                    <button
                      className="toggle-btn"
                      onClick={() => {
                        setShowServices(false);
                      }}
                    >
                      Hide
                    </button>
                  </>
                )}
              </ul>
            </div>
            <hr></hr>
          </div>
        </div>

        <BookingWidget place={place}></BookingWidget>
      </div>
      <div className="my-8">
        <h2 className="text-2xl">
          <span className="font-bold ">⭐{star || "Not rated"}</span> •
          <span className="ml-2 font-bold ">{place.reviews.length}</span> đánh
          giá
        </h2>
        {place.review_scores && (
          <ul className="grid grid-cols-2 mt-4 gap-x-56 gap-y-5">
            {reviewScores.map((item) => (
              <li className="flex justify-between items-center">
                <p className="font-semibold">{item[0]}</p>
                <RateBar rate={item[1]}></RateBar>
              </li>
            ))}
          </ul>
        )}
      </div>
      <PaginatedItems itemsPerPage={8} items={place.reviews}></PaginatedItems>
    </div>
  );
}

function Items({ reviews }) {
  return (
    <>
      <ul className="grid grid-cols-2 gap-x-56">
        {reviews.map((item) => (
          <li className="mb-8">
            <div className="flex items-center">
              <RxAvatar size={40}></RxAvatar>
              <div className="ml-2 mb-2">
                <p className="font-semibold">{item.reviewer_name}</p>
                <span className="font-light">
                  {extractDate(new Date(item.date))}
                </span>
              </div>
            </div>
            <p>{item.comments}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

function PaginatedItems({ itemsPerPage, items }) {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items reviews={currentItems} />
      <ReactPaginate
        className="paginate"
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
