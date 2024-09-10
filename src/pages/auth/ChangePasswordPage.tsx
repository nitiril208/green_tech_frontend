import ChangePassword from "@/components/Auth/ChangePassword";
import { useEffect } from "react";

const ChangePasswordPage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div>
      <ChangePassword />
    </div>
  );
};

export default ChangePasswordPage;
