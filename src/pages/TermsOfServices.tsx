import TermsofService from "@/components/TermsofService";
import { useEffect } from "react";

const TermsOfServices = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return <TermsofService />;
};

export default TermsOfServices;
