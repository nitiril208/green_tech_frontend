import OurService from "@/components/ourServices/OurService";
import { useEffect } from "react";

const OurServicePage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div>
      <OurService />
    </div>
  );
};

export default OurServicePage;
