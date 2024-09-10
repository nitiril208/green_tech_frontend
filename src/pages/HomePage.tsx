import AccordionHome from "@/components/homePage/AccordionHome";
import Companies from "@/components/homePage/Companies";
import FeaturedCourses from "@/components/homePage/FeaturedCourses";
import GuidingPlatform from "@/components/homePage/GuidingPlatform";
import HomeBanner from "@/components/homePage/HomeBanner";
import HomeFooter from "@/components/homePage/HomeFooter";
import HomeHeader from "@/components/homePage/HomeHeader";
import Journey from "@/components/homePage/Journey";
import Steps from "@/components/homePage/Steps";
import TrainingProviders from "@/components/homePage/TrainingProviders";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <HomeHeader />
      <HomeBanner />
      <Companies />
      <GuidingPlatform />
      <Steps />
      <TrainingProviders />
      <FeaturedCourses />
      <AccordionHome />
      <Journey />
      <HomeFooter />
    </>
  );
};

export default HomePage;
