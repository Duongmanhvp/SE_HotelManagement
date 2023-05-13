import React from "react";

const Header = ({ pagename }) => {
  return (
    <div className="flex justify-between px-4 pt-4 mb-2">
      <h2 className="font-bold text-xl">{pagename}</h2>
      <h2>Welcome back, Administrator</h2>
    </div>
  );
};

export default Header;
