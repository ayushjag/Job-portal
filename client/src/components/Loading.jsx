import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-[spin_2s_linear_infinite]"></div>
    </div>
  );
};

export default Loading;
