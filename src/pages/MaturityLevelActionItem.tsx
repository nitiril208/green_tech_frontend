import advanceGreen from "@/assets/images/advanceGreen.svg";
import apply from "@/assets/images/apply.svg";
import develop from "@/assets/images/develop.svg";
import planAction from "@/assets/images/planAction.svg";
import selfAssess from "@/assets/images/selfAssess.svg";
import Header from "@/components/Header";
import AssignCard from "@/components/MaturityAssessment/Roadmap/AssignCard";
import Loader from "@/components/comman/Loader";
import HomeFooter from "@/components/homePage/HomeFooter";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { setPath } from "@/redux/reducer/PathReducer";
import { enumUpadate } from "@/services/apiServices/enum";
import { getCheckedMeasures } from "@/services/apiServices/pillar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Correct from "/assets/img/Correct.png";
import InviteMember from "@/components/Models/InviteMember";
import { useEffect, useState } from "react";

function MaturityLevelActionItem() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { clientId, UserId } = useAppSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const userID = UserId
    ? +UserId
    : userData?.query
    ? userData?.query?.id
    : userData?.id;

  const { data: getCheckedmeasures, isPending } = useQuery({
    queryKey: [QUERY_KEYS.checkedMeasures],
    queryFn: () => getCheckedMeasures(userID, clientId),
    enabled: true,
  });

  const path = 6 + 1;
  const { mutate: EnumUpadate, isPending: isLoading } = useMutation({
    mutationFn: () => enumUpadate({ path: path.toString() }, +userID),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.enumUpadateList],
      });
      localStorage.setItem("path", JSON.stringify(data.data.data?.pathStatus));
      dispatch(
        setPath([
          {
            label: "Course Management",
            link: null,
          },
          {
            label: "Recommended Course",
            link: `/company/coursesrecommended`,
          },
        ])
      );
      navigate("/company/coursesrecommended");
    },
  });

  const handlematurityAction = () => {
    EnumUpadate();
  };

  const paths = [
    {
      name: "Self-assess",
      img: selfAssess,
      status: "indeterminate",
    },
    {
      name: "Plan Action",
      img: planAction,
      status: "pending",
    },
    {
      name: "Develop",
      img: develop,
      status: "pending",
    },
    {
      name: " Apply",
      img: apply,
      status: "pending",
    },
    {
      name: "Advance Your Green",
      img: advanceGreen,
      status: "pending",
    },
  ];

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div>
      <Header />
      <div className="mainContailner">
        <div className="border-t border-b border-[#DED7D7]">
          <div className="h-[120px] font-Poppins font-medium text-[12.85px] leading-[16.64px] text-[#3A3A3A] flex justify-center pb-3 pt-[13px]">
            <div className="relative lg:gap-[79.4px] justify-between flex min-w-[640px] md:w-auto items-center mx-5">
              {paths.map((path) => (
                <div
                  key={path.name}
                  className={`flex flex-col self-end items-center ${
                    path.name === "Engage" || path.name === "Assess" ? " " : " "
                  }`}
                >
                  {path.status === "checked" ? (
                    <img
                      src={Correct}
                      alt="img"
                      width={59.6}
                      height={59.6}
                      className="mt-[13.4]"
                    />
                  ) : path.status === "indeterminate" ? (
                    <img
                      src={path.img}
                      alt="img"
                      width={59.6}
                      height={59.6}
                      className="mt-[7px]"
                    />
                  ) : (
                    <img
                      src={path.img}
                      alt="img"
                      width={59.6}
                      height={59.6}
                      className="mt-[15.4px]"
                    />
                  )}
                  <p
                    className={`${
                      path.name === "Engage" || path.name === "Assess"
                        ? "bg-[#64A70B] text-white"
                        : ""
                    }`}
                  >
                    {path.name}
                  </p>
                </div>
              ))}
              <div className="absolute top-[47.5px] left-[30px] right-12 border-2 border-dashed border-[#585858] -z-10"></div>
            </div>
          </div>
        </div>
        <div className="xl:mb-[20px] xl:mt-[76px] my-[20px]">
          <div className=" text-center font-abhaya font-bold">
            <h3 className="font-abhaya text-[30px]">
              Now, that’s worthy of a congrats.
            </h3>

            <p className="xl:mt-[31px] mt-[25px] font-abhaya font-bold">
              Because it’s one thing to have the will to be green.
              <br /> Another thing to know where you stand.
              <br /> And a whole other to have defined actions that will advance
              your sustainability.
            </p>
          </div>
          <div className="flex justify-center xl:mt-[42px] mt-[36px]">
            <Button
              type="button"
              isLoading={isLoading}
              onClick={handlematurityAction}
              className="bg-[#64A70B] text-[white] w-[200px] h-[40px] rounded text-center text-base font-abhaya"
            >
              See Recommended Courses
            </Button>
            <button
              onClick={() => navigate("/company/dashboard")}
              className="ml-4 bg-[#64A70B] text-[white] w-[200px] h-[40px] rounded text-center font-abhaya text-base"
            >
              Go To My Dashboard
            </button>
          </div>
        </div>
        <div className="mb-5">
          <h4 className="font-abhaya text-[30px] font-bold text-center">
            My Action Items
          </h4>
        </div>
        {isPending ? (
          <Loader />
        ) : (
          getCheckedmeasures?.data?.data?.map((item: any) => {
            return <AssignCard data={item} />;
          })
        )}
        <h5 className="font-abhaya text-[20px] font-bold text-center">
          Please ensure that Employees/Delegates are added or invited first
          before assigning Action Items. To do so, please click here.
        </h5>
        <div className="my-5 text-center">
          <Button
            type="button"
            onClick={() => setIsOpen(true)}
            className="bg-[#00778B] text-white rounded-sm lg:w-[223px] w-[200px] h-12 lg:text-base text-sm"
          >
            Invite Team Members
          </Button>
        </div>

        {/* <div className="flex flex-col h-full w-full mt-2">
				<div className="ml-[180px]   h-[390px] w-[1126px]">
					<div className="w-full h-[74px] border border-solid border-[#D9D9D9] rounded-tl-lg rounded-tr-lg">
						<div className=" pb-2 pt-2 flex  gap-5  h-[70px] w-[1126px]">

							<div className="flex ">
								<div className=" ml-4 bg-white rounded-full drop-shadow-md w-14 h-14 p-4 mb-2">
									<img src={moralesIcon} alt="moralesIcon" />
								</div>

								<div className="ml-6 mt-4 text-[#1D2026] font-Calibri font-bold">Governance</div>


								<div className="flex relative ml-24">
									<div className="ml-[450px] text-[#1D2026] mt-4 text-center font-Calibri rounded-full bg-opacity-70 bg-[#EFF4FAF5] h-[30px] w-[107px] flex items-center justify-center">Intermediate</div>
									<div className="absolute top-3 left-28 right-16 border-2 border-dashed border-[#A6A6A6] w-40 mt-5 ml-[446px]">

										<svg className="absolute top-1/2 transform -translate-y-1/2 right-0 -mr-2 text-gray-700 mt-8 " xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 256 256" fill="#85B6FF">
											<path d="M 87.85 41.551 L 5.545 1.167 C 2.414 -0.369 -0.979 2.725 0.263 5.984 l 14.342 37.648 c 0.336 0.881 0.336 1.854 0 2.735 L 0.263 84.016 c -1.241 3.259 2.152 6.353 5.282 4.817 L 87.85 48.449 C 90.717 47.043 90.717 42.957 87.85 41.551 z" />
										</svg>
									</div>
									<div className=" text-white mt-4 text-center font-sans rounded-full bg-green-700 bg-opacity-70 h-8 w-24 flex items-center justify-center ml-[160px]">Advanced</div>
								</div>

							</div>
						</div>
					</div>

					<div className="w-full h-[70px] border border-solid border-[#D9D9D9] ">
						<p className=" pt-5 pl-6">Enhance and execute your Net Zero strategy with clear goals and comprehensive actions.</p>
					</div>
					<div className="w-full h-[70px] border border-solid border-[#D9D9D9]">
						<p className=" pt-5 pl-6">Lead in energy efficiency through continuous optimization and strategic energy management.</p>
					</div>
					<div className="w-full h-[70px] border border-solid border-[#D9D9D9]">
						<p className=" pt-5 pl-6">Achieve sustainability leadership by fully embracing and expanding renewable energy use.</p>
					</div>
					<div className="w-full h-[70px] border border-solid border-[#D9D9D9] rounded-bl-lg rounded-br-lg">
						<p className=" pt-5 pl-6">Optimise transportation and logistics for minimal environmental impact through advanced strategies and technologies.</p>
					</div>
				</div>
			</div> */}

        <HomeFooter />
      </div>
      <InviteMember isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default MaturityLevelActionItem;
