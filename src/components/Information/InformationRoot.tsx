import React from "react";

type InformationRootProps = {
  children: React.ReactNode;
};

const InformationRoot: React.FC<InformationRootProps> = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen px-4 md:px-0">
      {children}
    </div>
  );
};

export default InformationRoot;
