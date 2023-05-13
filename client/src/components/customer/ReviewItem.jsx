import React, { useState } from "react";
import { extractDate } from "../../utils/Caculate";
import { RxAvatar } from "react-icons/rx";
import ShowText from "./ShowText";

function ReviewItem({ item }) {
  return (
    <li className="mb-8">
      <div className="flex items-center">
        <RxAvatar size={40}></RxAvatar>
        <div className="ml-2 mb-2">
          <p className="font-semibold">{item.reviewer_name}</p>
          <span className="font-light">{extractDate(new Date(item.date))}</span>
        </div>
      </div>
      <ShowText text={item.comments} showChar={200}></ShowText>
    </li>
  );
}

export default ReviewItem;
