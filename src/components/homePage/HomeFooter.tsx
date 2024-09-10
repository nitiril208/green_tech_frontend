import footerLogoImage from "@/assets/images/FooterLogo.png";
import footerLogoImage1 from "@/assets/images/FooterLogo1.png";
import homeFooterLogo from "@/assets/images/HomeFooterLogo.png";
import homeFooterLogo1 from "@/assets/images/HomeFooterLogo1.png";
import RoundLogoImage from "@/assets/images/star-footer-image.svg";
import { UserRole } from "@/types/UserRole";
import { BsInstagram } from "react-icons/bs";
import { FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";

const HomeFooter = () => {
  const location = useLocation();
  const userData = JSON.parse(localStorage.getItem("user") as string);

  const isHomePage = () => {
    return location.pathname === "/";
  };
  return (
    <div className="relative">
      <footer className="xl:max-w-[1160px] max-w-full mx-auto xl:px-0 lg:px-5 px-0 flex justify-center items-end footerAfter">
        {isHomePage() && (
          <div className="h-[230px] absolute bottom-0 bg-[#71B2C9] lg:block hidden"></div>
        )}
        <div className="w-[1162px] bg-[#002A3A] z-[9] sm:rounded-tl-[20px] sm:rounded-tr-[20px] rounded-0 text-center">
          <div className="lg:flex block xl:gap-x-[33px] gap-x-[15px] xl:ml-8 ml-0 xl:mt-[44px] mt-6 xl:justify-normal justify-center lg:pb-0 pb-5">
            <div className="relative lg:p-0 px-5">
              {/* <img
                className="xl:w-[951px] w-[810px] h-[84px] lg:block hidden"
                src="../assets/img/network-group.png"
              /> */}
              <div className="flex lg:flex-row flex-col lg:justify-around justify-start lg:items-center items-start rounded-xl lg:bg-white bg-transparent xl:gap-3 sm:gap-2 gap-0 xl:w-[951px] lg:w-[850px] w-auto h-auto lg:py-[14px] lg:px-5 px-0">
                <div className="lg:order-1 order-4">
                  <p className="lg:w-[300px] w-full text-justify sm:text-md text-sm sm:leading-4 leading-5 lg:text-[#002A3A] text-white text-semibold line-clamp-4 sm:pt-0 sm:pb-0 pt-[15px] pb-[15px] sm:mb-0 mb-[32px] sm:border-b-0 font-Droid-Regular border-b border-white">
                    Skillnet Ireland is funded from the National Training Fund
                    through the Department of Further and Higher Education,
                    Research, Innovation and Science.
                  </p>
                </div>
                <div className="lg:order-2 order-2 sm:pb-0 pb-[41px]">
                  <img
                    src={footerLogoImage}
                    alt="footer logo"
                    className="lg:block hidden w-[90px]"
                  />
                  <img
                    src={footerLogoImage1}
                    alt="footer logo"
                    className="lg:hidden block h-[74px] w-[150px] ml-[22px]"
                  />
                </div>
                <div className="secondary-text sm:flex block justify-between items-center lg:hidden lg:order-3 order-3">
                  <p className="lg:block hidden no-underline text-sm leading-5 font-Droid-Regular font-bold">
                    © All Rights Reserved. Green Tech Skillnet & County Wexford
                    Chamber Skillnet 2024.
                  </p>

                  <div className="flex gap-5  justify-center sm:my-3">
                    <Button
                      variant={"ghost"}
                      className="w-[19px] h-[19px] p-0 hover:bg-transparent hover:text-white"
                    >
                      <FaXTwitter className="w-[19px] h-[19px]" />
                    </Button>
                    <Button
                      variant={"ghost"}
                      className="w-[19px] h-[19px] p-0 hover:bg-transparent hover:text-white"
                    >
                      <BsInstagram className="w-[19px] h-[19px]" />
                    </Button>
                    <Button
                      variant={"ghost"}
                      className="w-[19px] h-[19px] p-0 hover:bg-transparent hover:text-white"
                    >
                      <FaFacebookF className="w-[19px] h-[19px]" />
                    </Button>
                    <Button
                      variant={"ghost"}
                      className="w-[19px] h-[19px] p-0 hover:bg-transparent hover:text-white"
                    >
                      <IoLogoYoutube className="w-[19px] h-[19px]" />
                    </Button>
                  </div>
                </div>
                <div className="lg:order-3 order-1 sm:pb-0 pb-[34px]">
                  <img
                    src={homeFooterLogo}
                    alt=""
                    className="lg:block hidden w-[160px]"
                  />
                  <img
                    src={homeFooterLogo1}
                    alt=""
                    className="lg:hidden block w-[300px]"
                  />
                </div>
                <div className="sm:block hidden lg:order-4 order-4">
                  <div className="flex items-center gap-2">
                    <div>
                      <img src={RoundLogoImage} alt="round logo" />
                    </div>
                    <div>
                      <h6 className="xl:text-base text-sm font-bold lg:text-[#002A3A] text-white text-left leading-4">
                        Co-funded by
                        <br />
                        the European Union
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:block hidden">
                <div className="secondary-text sm:flex block justify-between items-center py-3">
                  <p className="lg:block hidden no-underline text-sm leading-5 font-abhaya font-bold">
                    © All Rights Reserved. Green Tech Skillnet & County Wexford
                    Chamber Skillnet 2024.
                  </p>

                  <div className="flex gap-5  justify-center my-3">
                    <a
                      href="https://x.com/?lang=en"
                      target="_blank"
                      className="w-[19px] h-[19px] p-0 hover:bg-transparent hover:text-white"
                    >
                      <FaXTwitter className="w-[19px] h-[19px]" />
                    </a>
                    <a
                      href={"https://www.instagram.com"}
                      target="_blank"
                      className="w-[19px] h-[19px] p-0 hover:bg-transparent hover:text-white"
                    >
                      <BsInstagram className="w-[19px] h-[19px]" />
                    </a>
                    <a
                      href={"https://www.facebook.com"}
                      target="_blank"
                      className="w-[19px] h-[19px] p-0 hover:bg-transparent hover:text-white"
                    >
                      <FaFacebookF className="w-[19px] h-[19px]" />
                    </a>
                    <a
                      href={"https://www.youtube.com/"}
                      target="_blank"
                      className="w-[19px] h-[19px] p-0 hover:bg-transparent hover:text-white"
                    >
                      <IoLogoYoutube className="w-[19px] h-[19px]" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <ul className=" text-white flex flex-col  sm:gap-y-[3px] gap-y-[10px] text-start secondary-text lg:p-0 px-5 sm:pr-[35px] pr-[29px] underline">
                <Link
                  to={"/our-courses"}
                  className="font-abhaya text-base font-bold cursor-pointer leading-5"
                >
                  Our Courses
                </Link>
                <Link
                  to={
                    userData
                      ? `/${UserRole[
                          userData?.query?.role
                        ]?.toLowerCase()}/dashboard`
                      : "/register"
                  }
                  className="font-abhaya text-base font-bold cursor-pointer leading-5"
                >
                  Join Us
                </Link>
                {/* <Link
                  to={"/blog"}
                  className="font-abhaya text-base font-bold cursor-pointer leading-5"
                >
                  News
                </Link> */}
                <Link
                  to={"/contact"}
                  className="font-abhaya text-base font-bold cursor-pointer leading-5"
                >
                  Contact Us
                </Link>
              </ul>
              <p className="lg:hidden block no-underline text-sm text-white leading-5 font-abhaya font-bold max-w-[165px] w-[165px] text-left">
                © County Wexford Chamber 2023. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeFooter;
