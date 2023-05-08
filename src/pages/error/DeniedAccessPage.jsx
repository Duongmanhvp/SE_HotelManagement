import React from "react";
import { Link } from "react-router-dom";

function DeniedAccessPage() {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="text-center">
        <h2 className="text-[70px] font-bold">Oops!</h2>
        <h4 className="text-2xl font-medium">Access Denied</h4>
        <p>You do not have permission to access this page.</p>
        <button className="primary max-w-sm mt-2">
          <Link to={"/"}>Go back home</Link>
        </button>
      </div>
    </div>
  );
}

export default DeniedAccessPage;
