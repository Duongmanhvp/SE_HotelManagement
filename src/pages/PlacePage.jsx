import { useEffect, useState } from "react";
import AddressLink from "../components/AddressLink";
import BookingWidget from "../components/BookingWidget";
import PlaceGallery from "../components/PlaceGallery";

export default function PlacePage() {
  const data = {
    _id: 2,
    photos: [
      "https://picsum.photos/200",
      "https://picsum.photos/201",
      "https://picsum.photos/202",
    ],
    address: "Telluride, Colorado, Hoa Kỳ",
    title: "Kiệt tác kiến trúc. Tầm nhìn đẹp nhất ở Telluride",
    price: 428,
    description:
      "Chuẩn bị sẵn sàng để bị cuốn hút bởi kiến trúc và tầm nhìn tinh tế không dừng lại. Chúng tôi ĐẢM BẢO ĐÂY SẼ LÀ AIRBNB TUYỆT VỜI NHẤT TỪ TRƯỚC ĐẾN NAY! Ngôi nhà trên núi hiện đại này vừa được cải tạo và nằm trên hơn 2 mẫu đất. Nó nằm trong một khu rừng aspen làm cho nó trở thành một nơi hoàn hảo để tránh xa mọi thứ, tuy nhiên nó cách trung tâm Telluride chưa đầy 5 dặm và chỉ cách gondola Mountain Village 3 dặm với lối vào trượt tuyết/trượt tuyết và một gondola miễn phí thả bạn ngay vào Telluride",
    perks: ["Wifi", "Free parking spot", "TV", "Radio", "Pets", "Private"],
    extraInfo:
      "Chỉ có hai phòng ngủ riêng, “phòng ngủ thứ 3” nằm trong tầng lửng của phòng ngủ chính. Căn gác này yêu cầu phải leo thang để vào nhà và có trần nhà thấp, vì vậy nó thường được khuyên dùng cho trẻ em lớn tuổi và thanh thiếu niên, nhưng có thể không thoải mái cho người lớn và có thể không an toàn cho trẻ nhỏ.",
    checkIn: "20/03/2023",
    checkOut: "25/03/2023",
    maxGuests: 8,
  };
  const [place, setPlace] = useState(null);
  useEffect(() => {
    setPlace(data);
  }, []);

  if (!place) return "";

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          Check-in: {place.checkIn}
          <br />
          Check-out: {place.checkOut}
          <br />
          Max number of guests: {place.maxGuests}
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Extra info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
}
