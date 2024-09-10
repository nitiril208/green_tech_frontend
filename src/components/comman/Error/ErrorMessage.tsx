import React from "react";

interface messageProps {
	message: string;
}
const ErrorMessage: React.FC<messageProps> = ({ message }) => {
	return <p className="text-red-400 text-[14px] mt-1">{message}</p>;
};

export default ErrorMessage;