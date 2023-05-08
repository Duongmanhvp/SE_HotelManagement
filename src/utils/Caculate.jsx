import { format } from "date-fns";
import { differenceInMinutes } from "date-fns";

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
  if (!place?.review_scores) {
    return [];
  }
  const rate = Object.values(place.review_scores);

  return name.map((item, index) => [item, rate[index]]);
}
export function extractDate(num) {
  if (!num) {
    return null;
  }
  return format(+num, "PPP");
}

export function getReviewScore(scores) {
  if (!scores) {
    return null;
  }
  let total = 0;
  const fields = 6;
  for (const key in scores) {
    if (key !== "review_scores_rating") {
      const element = scores[key];
      total += element;
    }
  }
  const val = total / fields;
  return Math.round(val * 10) / 10;
}

export function checkFeedbacked(userId, reviews) {
  return reviews.some((review) => review.reviewer_id === userId);
}

export const getTimeAgo = (createdAt) => {
  let minuteDiff = differenceInMinutes(Date.now(), new Date(createdAt));
  minuteDiff = Math.max(1, minuteDiff);
  if (minuteDiff >= 1 && minuteDiff <= 59) {
    return {
      unit: "minutes",
      number: minuteDiff,
    };
  } else if (minuteDiff < 1440) {
    return {
      unit: "hours",
      number: Math.floor(minuteDiff / 60),
    };
  } else {
    return {
      unit: "days",
      number: Math.floor(minuteDiff / 1440),
    };
  }
};
