import Contact from "@/components/Contact";
import { useEffect } from "react";

const HomeContactPage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div>
      <Contact />
    </div>
  );
};

export default HomeContactPage;
