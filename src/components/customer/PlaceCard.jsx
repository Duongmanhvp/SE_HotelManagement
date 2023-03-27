import React from "react";
import Image from "./Image";

function PlaceCard({ place }) {
  return (
    <div className="hover:shadow-xl hover:-translate-y-2 duration-300 px-2 pb-4 pt-2 rounded-2xl bg-white">
      <div className="bg-gray-200 mb-2 rounded-2xl flex ">
        <Image
          className=" object-cover aspect-square m-auto"
          src={place.images.picture_url}
          alt=""
        />
      </div>
      <div className="grid grid-cols-[4fr,1fr]">
        <div>
          <h2 className="font-bold">{place.address.street}</h2>
          <h3 className="text-sm text-gray-500 mt-1">{place.name}</h3>

          <div className="mt-2">
            <span className="font-bold">${place.price.$numberDecimal}</span> per
            night
          </div>
        </div>
        <div className="justify-self-end font-bold">
          <span>
            ⭐{place.review_scores.review_scores_rating.$numberInt / 10}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PlaceCard;
