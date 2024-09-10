import ForgotPassword from "@/components/Auth/ForgotPassword";
import { useEffect } from "react";

const ForgotPasswordPage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div>
      <ForgotPassword />
    </div>
  );
};

export default ForgotPasswordPage;
