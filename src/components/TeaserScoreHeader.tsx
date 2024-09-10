import { VscBellDot } from "react-icons/vsc";
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function TeaserScoreHeader() {
  const navigate = useNavigate();

  return (
    <header className="max-container flex">
      <div className="xl:ml-[167px] ml-[50px] mt-[57px]">
        <img
          onClick={() => {
            navigate("/");
          }}
          className="max-w-[131px] h-[86px] cursor-pointer"
          src="../assets/img/logo1.png"
          alt="Logo 1"
        />
      </div>
      <div className="mt-[106px] ml-[22px] text-[#3A3A3A] font-[calibri]">
        <ul className="flex gap-[31px] font-[400] text-[16px] leading-[19.53px]">
          <li className="group flex items-center gap-[5px]">
            <span className="cursor-pointer">Our Courses</span>
            <img
              className="w-[6px] h-[6px]"
              src="../assets/img/Vector 1.png"
              alt="Vector 1"
            />
          </li>
          <li>Testimonial</li>
          <li>Blogs</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <div className="mt-[94px] ml-[385px] text-[14px] flex items-center space-x-2 relative">
        {/* <img className="ml-2 h-10 w-13" src="../assets/img/Icon.png" alt="Icon 1" /> */}

        <VscBellDot className="ml-2 h-[50px] w-[20px] mr-[15px] " />

        <span className="flex-1">Hi, Evergrow</span>
        {/* <img className="ml-[31px] mt-[5px] w-[11px] h-[15px] text-[#3A3A3A]" src="../assets/img/Dropdown.png" alt="Dropdown" /> */}
        <IoMdArrowDropdown className="mt-[3px] w-[20px] h-[20px]" />
      </div>

      <img
        className="ml-[31px] mt-[42px] w-[136px] h-[105px]"
        src="../assets/img/logo2.png"
        alt="Logo 2"
      />
    </header>
  );
}

export default TeaserScoreHeader;
