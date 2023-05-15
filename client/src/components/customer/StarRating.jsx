import React, { useState } from "react";

function StarRating({ name, stars, setStars }) {
  const [index, setIndex] = useState(0);
  return (
    <div className="flex flex-row-reverse gap-x-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <p
          className={`text-3xl star hover:text-yellow-500 cursor-pointer duration-150 ${
            index === i ? "fixed-star" : ""
          }`}
          onClick={() => {
            setIndex(i);
            setStars({
              ...stars,
              [name]: (6 - i) * 2,
            });
          }}
        >
          &#9733;
        </p>
      ))}
    </div>
  );
}

export default StarRating;
