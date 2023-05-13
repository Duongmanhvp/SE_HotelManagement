import React, { useState } from "react";

function ShowText({ text, showChar }) {
  const [more, setMore] = useState(true);
  function getShowedText(text) {
    if (text.length <= showChar) {
      return text;
    } else {
      return text.substr(0, showChar);
    }
  }
  return (
    <>
      {text.length <= showChar && <p>{text}</p>}
      {text.length > showChar && more && (
        <p>
          {getShowedText(text)}...
          <span
            onClick={() => setMore(false)}
            className="font-semibold underline cursor-pointer"
          >
            More
          </span>
        </p>
      )}
      {text.length > showChar && !more && (
        <p>
          {text}
          <span
            onClick={() => setMore(true)}
            className="font-semibold underline cursor-pointer"
          >
            Less
          </span>
        </p>
      )}
    </>
  );
}

export default ShowText;
