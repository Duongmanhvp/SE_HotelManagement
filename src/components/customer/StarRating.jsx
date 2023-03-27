import React, { useState } from "react";

function StarRating() {
  return (
    <div className="flex flex-row-reverse gap-x-2">
      <p className="text-3xl star hover:text-yellow-500 cursor-pointer duration-150 ">
        &#9733;
      </p>
      <p className="text-3xl star hover:text-yellow-500 cursor-pointer duration-150">
        &#9733;
      </p>
      <p className="text-3xl star hover:text-yellow-500 cursor-pointer duration-150">
        &#9733;
      </p>
      <p className="text-3xl star hover:text-yellow-500 cursor-pointer duration-150">
        &#9733;
      </p>
      <p className="text-3xl star hover:text-yellow-500 cursor-pointer duration-150">
        &#9733;
      </p>
    </div>
  );
}

export default StarRating;
