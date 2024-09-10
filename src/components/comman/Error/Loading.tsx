import React from "react";

interface LoadingProps {
  isLoading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
  return isLoading ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black/10 z-[99999]">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Loading;
