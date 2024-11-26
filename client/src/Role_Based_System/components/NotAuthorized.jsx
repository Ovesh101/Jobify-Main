import React from "react";
import Wrapper from "../../assets/wrappers/ErrorPage";
import img from "../../assets/images/unauthorized.jpg";

const NotAuthorized = () => {
  return (
    <Wrapper className="flex items-center justify-center  bg-gradient-to-b from-gray-100 to-gray-300">
      <div className="bg-white rounded-lg shadow-xl p-[100px]   mx-auto text-center border border-gray-200">
        <div className="relative overflow-hidden rounded-md mb-6">
          <img
            src={img}
            alt="Not Authorized"
            className=" md:w-[300px] md:h-[300px]  object-contain"
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Oops! Access Denied
        </h1>
        <p className="text-gray-700 text-base leading-relaxed">
          It looks like you don't have permission to view this page. If you
          believe this is a mistake, please reach out to the administrator.
        </p>
      </div>
    </Wrapper>
  );
};

export default NotAuthorized;
