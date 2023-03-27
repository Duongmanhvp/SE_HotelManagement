import React from "react";

function RateBar({ rate }) {
  let ratePercent = rate * 10 + "%";
  return (
    <div className="flex items-center w-60">
      <div class="w-full  bg-gray-200 rounded-full h-1.5  dark:bg-gray-700 ">
        <div
          class="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
          style={{ width: ratePercent }}
        ></div>
      </div>
      <span className="ml-2">{rate}</span>
    </div>
  );
}

export default RateBar;
