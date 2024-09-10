import PrivacyPolicy from "@/components/PrivacyPolicy";
import { useEffect } from "react";

const PrivacyPolicyPage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return <PrivacyPolicy />;
};

export default PrivacyPolicyPage;
