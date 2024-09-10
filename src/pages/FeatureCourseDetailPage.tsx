import Loading from "@/components/comman/Error/Loading";
import Information from "@/components/featureCourseDetail/Information";
import HomeFooter from "@/components/homePage/HomeFooter";
import HomeHeader from "@/components/homePage/HomeHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchFeatureCourseById } from "@/services/apiServices/courseManagement";
import { useQuery } from "@tanstack/react-query";
import { MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FeatureCourseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState("information");

  const { data: getSingleCourse, isPending: getSingleCoursePending } =
    useQuery<any>({
      queryKey: [QUERY_KEYS.getSingleCourse],
      queryFn: () => fetchFeatureCourseById(String(id)),
    });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <HomeHeader />
      <div className="xl:max-w-[1160px] max-w-full w-full mx-auto my-4 xl:px-0 px-6 bg-white">
        <div className="">
          <div className="bg-white h-[calc(100vh-393px)] overflow-y-auto rounded-b-xl">
            <div className="flex justify-between items-center bg-white py-5">
              <h4 className="xl:text-[28px] md:text-[22px] text-[18px] leading-[normal] font-bold font-nunito text-black sm:pb-0 pb-3">
                {getSingleCourse?.data?.title}
              </h4>
              <div
                className="flex pr-5 cursor-pointer text-black md:hidden"
                onClick={() => navigate("/")}
              >
                <MoveLeft />
                <span className="text-base font-semibold pl-4">Back</span>
              </div>
            </div>
            <div className="py-5">
              <Tabs
                defaultValue="information"
                onValueChange={(e) => setCurrentTab(e)}
                className="w-full"
                value={currentTab}
              >
                <TabsList className="p-0 flex justify-between sm:items-center items-start sm:flex-row flex-col h-auto border-b">
                  <div className="flex sm:order-1 order-2">
                    <TabsTrigger
                      value="information"
                      className="text-base font-nunito text-black data-[state=active]:text-[#00778B] data-[state=active]:border-[#00778B] border-b rounded-none border-transparent"
                    >
                      Information
                    </TabsTrigger>
                  </div>
                  <div className="w-full sm:order-2 order-1 px-5 sm:mb-0 mb-3 sm:flex block justify-end">
                    <div
                      className="md:flex hidden pr-5 cursor-pointer text-black"
                      onClick={() => navigate("/")}
                    >
                      <MoveLeft />
                      <span className="text-base font-semibold pl-4">Back</span>
                    </div>
                  </div>
                </TabsList>
                <TabsContent value="information" className="">
                  <Information data={getSingleCourse?.data} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
        <Loading isLoading={getSingleCoursePending} />
      </div>
      <HomeFooter />
    </>
  );
};

export default FeatureCourseDetailPage;
