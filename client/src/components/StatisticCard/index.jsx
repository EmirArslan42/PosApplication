import React from "react";
const index = ({title,amount,img}) => {
  return (
      <div className="statistic-card bg-gray-800 p-8 rounded-lg">
        <div className="flex gap-x-4">
          <div className="w-16 h-16 bg-white rounded-full p-3">
            <img src={img} alt="" />
          </div>
          <div className="flex flex-col text-white">
            <p className="mb-2 text-lg font-medium text-gray-400">
              {title}
            </p>
            <p className="text- font-semibold text-gray-200">
                {amount}
            </p>
          </div>
        </div>
      </div>
  );
};

export default index;
