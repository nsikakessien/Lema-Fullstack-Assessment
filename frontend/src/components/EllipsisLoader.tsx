import React from "react";

const EllipsisLoader: React.FC = () => {
  return (
    <div className="relative inline-block w-20 h-20 text-[#F9F5FF]">
      <div className="absolute top-1/3 left-2 w-3.5 h-3.5 rounded-full bg-current animate-[ellipsis1_0.6s_infinite_cubic-bezier(0,1,1,0)]"></div>
      <div className="absolute top-1/3 left-2 w-3.5 h-3.5 rounded-full bg-current animate-[ellipsis2_0.6s_infinite_cubic-bezier(0,1,1,0)]"></div>
      <div className="absolute top-1/3 left-8 w-3.5 h-3.5 rounded-full bg-current animate-[ellipsis2_0.6s_infinite_cubic-bezier(0,1,1,0)]"></div>
      <div className="absolute top-1/3 left-14 w-3.5 h-3.5 rounded-full bg-current animate-[ellipsis3_0.6s_infinite_cubic-bezier(0,1,1,0)]"></div>
    </div>
  );
};

export default EllipsisLoader;
