import { format } from "date-fns";
export function formatStarRate(num) {
  const stars = "★★★★★☆☆☆☆☆";
  return stars.substring(5 - num, 10 - num);
}
export function extractReviewScores(place) {
  const name = [
    "Mức độ sạch sẽ",
    "Độ chính xác",
    "Giao tiếp",
    "Vị trí",
    "Nhận phòng",
    "Giá trị",
  ];
  const rate = Object.values(place.review_scores).map(
    (item) => item.$numberInt
  );

  return name.map((item, index) => [item, rate[index]]);
}
export function extractDate(num) {
  return format(+num, "PPP");
}
