import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNav from "../../components/customer/AccountNav";
import { _bookings } from "../../data/sampleData";
import StarRating from "../../components/customer/StarRating";
import BookingItem from "../../components/customer/BookingItem";
import UserContext from "../../context/UserContext";
import { getAllPaymentByUserId, sendReview } from "../../api";

const starRate = {
  review_scores_cleanliness: "Mức độ sạch sẽ",
  review_scores_accuracy: "Độ chính xác",
  review_scores_communication: "Giao tiếp",
  review_scores_location: "Vị trí",
  review_scores_checkin: "Nhận phòng",
  review_scores_value: "Giá trị",
};
export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [user] = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [stars, setStars] = useState();
  const [feedback, setFeedback] = useState();
  function handleClick(e, bookingId) {
    e.preventDefault();
    e.stopPropagation();
    setModalOpen(bookingId);
  }
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      if (feedback && Object.keys(stars).length === 6) {
        sendReview(modalOpen, {
          userName: user.name,
          stars,
          feedback,
        }).then((res) => {
          setModalOpen(false);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  let Model = (
    <div
      className="bg-gray-500/50 fixed w-full h-full top-0 bottom-0 left-0 right-0 z-50"
      onClick={() => setModalOpen(false)}
    >
      <div
        className="w-1/2 h-3/4 p-8 bg-white rounded-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2 className="font-semibold text-2xl mb-4">Vui lòng đánh giá</h2>
        <div className="grid grid-cols-2 gap-x-20 gap-y-4">
          {Object.keys(starRate).map((key) => (
            <div className="flex justify-between items-center gap-2">
              <label>{starRate[key]}</label>
              <StarRating
                name={`${key}`}
                setStars={setStars}
                stars={stars}
              ></StarRating>
            </div>
          ))}
        </div>

        <textarea
          placeholder="Chia sẻ nhận xét của bạn đến cộng đồng."
          style={{ resize: "none" }}
          className="mt-8"
          maxLength={1000}
          onChange={(e) => setFeedback(e.target.value)}
        ></textarea>
        <button
          onClick={handleSubmit}
          className="px-6 py-3 w-2/3 m-auto font-semibold text-white bg-primary/80 hover:bg-primary duration-200 mt-8 rounded-3xl"
        >
          Gửi đánh giá
        </button>
      </div>
    </div>
  );
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalOpen]);

  useEffect(() => {
    getAllPaymentByUserId(user._id)
      .then((response) => {
        setBookings(response.data);
      })
      .catch((err) => console.log(err));
  }, [modalOpen]);

  if (!bookings) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div>
        <AccountNav />
        <div className="w-2/3 m-auto">
          {bookings?.length > 0 &&
            bookings.map((booking) => (
              <Link to={`/account/bookings/${booking._id}`}>
                <BookingItem
                  booking={booking}
                  handleClick={(e) => handleClick(e, booking._id)}
                ></BookingItem>
              </Link>
            ))}
        </div>
      </div>
      {modalOpen && Model}
    </>
  );
}
