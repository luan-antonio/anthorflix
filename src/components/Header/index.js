import React from "react";
import "./header.css";

export default () => {
  return (
    <header>
      <div className="header-logo">
        <a href="/">
          <img
            src="/anthor-logo2.png"
            alt="logo"
          ></img>
        </a>
      </div>
      <div className="header-user">
        <a href="">
          <img
            src="https://occ-0-5395-185.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABUgzrBovlCuT6bxWcqfuRcQ4dt4BOaE6X4P3WNIRTiQXb_oFnhpSZ3BwFQMAG6SmgXxIBSn02IhHGTkf-vXTAUCz2WmC.png?r=478"
            alt="profile"
          ></img>
        </a>
      </div>
    </header>
  );
};
