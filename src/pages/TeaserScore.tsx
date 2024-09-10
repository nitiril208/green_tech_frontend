import Loading from "@/components/comman/Error/Loading";
import HomeFooter from "@/components/homePage/HomeFooter";
import HomeHeader from "@/components/homePage/HomeHeader";
import { CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { getAllassessment } from "@/services/apiServices/assessment";
import { enumUpadate } from "@/services/apiServices/enum";
import { fetchClientwiseMaturityLevel } from "@/services/apiServices/maturityLevel";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

const findMaturityLevel = (score: number, fetchClientmaturitylevel: any) => {
  for (const level of fetchClientmaturitylevel) {
    if (score >= level?.rangeStart && score <= level?.rangeEnd) {
      return level;
    }
  }
  return null;
};

const TeaserScore = () => {
  const navigate = useNavigate();
  const UserId = useAppSelector((state) => state.user.UserId);
  const { clientId } = useAppSelector((state) => state.user);
  const queryClient = useQueryClient();
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const userID = UserId
    ? UserId
    : userData?.query
    ? userData?.query?.id
    : userData?.id;

  const { data: fetchClientmaturitylevel, isPending } = useQuery({
    queryKey: [QUERY_KEYS.fetchbyclientMaturity],
    queryFn: () => fetchClientwiseMaturityLevel(clientId as string),
  });

  const { data: allassessmant } = useQuery({
    queryKey: [QUERY_KEYS.totalAssessment],
    queryFn: () => getAllassessment(userID, clientId),
  });

  const path = 2 + 1;
  const { mutate: EnumUpadate }: any = useMutation({
    mutationFn: () => enumUpadate({ path: path.toString() }, userID),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.enumUpadateList],
      });
      localStorage.setItem("path", JSON.stringify(data.data.data?.pathStatus));
    },
  });

  const handleScore = () => {
    EnumUpadate(path);
    navigate("/companyregister");
  };

  const score = Number(
    (
      (+allassessmant?.data?.data?.avTotalpoints /
        +allassessmant?.data?.data?.avTotalmaxpoint) *
      100
    ).toFixed(2)
  );
  const setScore = isNaN(score) ? 0 : score;

  const currentLavel =
    fetchClientmaturitylevel &&
    findMaturityLevel(Number(score), fetchClientmaturitylevel?.data);

  const data = {
    labels: [currentLavel?.maturityLevelName],
    datasets: [
      {
        label: "Poll",
        data: [setScore, 100 - Number(setScore)],
        backgroundColor: [currentLavel?.color, "#E8E8E8"],
      },
    ],
  };

  const textCenter = {
    id: "textCenter",
    beforeDatasetDraw(chart: any) {
      const { ctx, data } = chart;
      ctx.save();
      ctx.font = "bold 25px sans-serif";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        `${Math.round(data.datasets[0].data[0])}%`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      );
      ctx.restore();
    },
  };

  const options = {
    cutout: "80%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        callbacks: {
          label: function (context: any) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            label += Math.round(context.parsed) + "%";
            return label;
          },
        },
      },
    },
    hover: {
      mode: undefined,
    },
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const Labels = () => (
    <div className="flex flex-col justify-center h-fulzl w-[100px]">
      {fetchClientmaturitylevel?.data &&
        fetchClientmaturitylevel?.data?.length > 0 &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fetchClientmaturitylevel?.data?.map((label: any, index: number) => {
          return (
            <div
              key={index}
              className="text-sm flex flex-col items-start relative mt-10 h-6"
            >
              <div
                style={{
                  backgroundImage: `linear-gradient(to right, ${label?.color}, ${label?.color}, rgba(255, 82, 82, 0))`,
                }}
                className={`absolute left-0 h-full w-1/4 rounded-l-lg rounded-r-none`}
              ></div>
              <div className="rounded-r-lg mt-[2px] pl-2 z-50">
                {label.maturityLevelName}
              </div>
              {/* <div className="rounded-r-lg pl-2 ">
                {label?.rangeStart} to {label?.rangeEnd}
              </div> */}
            </div>
          );
        })}
    </div>
  );

  return (
    <div className="flex flex-col h-screen">
      <HomeHeader />
      <div className="bg-[url('../assets/img/backgroundscore.png')]">
        <div className="w-full max-w-[800px] mx-auto sm:mt-20 sm:mb-32 my-14 flex justify-center">
          <div className="border-t-8 border-solid border-[#00778B] flex justify-between bg-white rounded-lg w-full mx-5">
            <div className="lg:flex block w-full">
              <div className="mr-0">
                <div className="flex flex-col pl-8 pt-4">
                  <div className="flex items-center">
                    <CardTitle className="text-xl font-bold font">
                      Fascinating!
                    </CardTitle>
                    <img
                      className="w-[32px] h-[32px] ml-3 mb-0"
                      src="../assets/img/Green.png"
                      alt="Green checkmark"
                    />
                  </div>
                  <div className="bg-[#64A70B] h-[2px] w-20 mt-0 ml-0"></div>
                </div>
                <div></div>
                <div className=" pr-0 flex">
                  <div className="pl-8 flex-1">
                    {/* <CardDescription className="text-sm font-[calibri] text-[#002A3A]">
                      You've taken the first stride on your sustainability
                      journey!🌿
                    </CardDescription> */}
                    <p className="font-bold font-abhaya text-[#002A3A] mt-[28px] mb-[12px]">
                      Nice work completing this.
                    </p>
                    <p className="text-sm font-abhaya text-[#002A3A]">
                      To see the full breakdown of your score and start building
                      your sustainability action plan (based on personalised
                      recommendations!), register to get inside.
                    </p>
                    <button
                      className="bg-[#00778B] text-white py-2 px-4 rounded-md ml-0 mt-4 "
                      onClick={handleScore}
                    >
                      Complete your Registration
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between lg:max-w-[calc(100%_-_382px)] sm:max-w-[calc(100%_-_250px)] w-full sm:mb-10 mb-2">
                <div className="p-4 relative w-full">
                  <h2 className="text-lg font-semibold font-abhaya">
                    A glimpse of your Sustainability Score
                  </h2>
                  <div className="flex sm:flex-row flex-col w-full justify-between">
                    <Labels />
                    <div className="text-center sm:mt-8 mt-14 mx-auto  relative">
                      <div className="w-40 h-40 mt-0 relative">
                        <Doughnut
                          data={data}
                          options={options}
                          plugins={[textCenter]}
                        />
                      </div>
                      <div>
                        <button
                          style={{ backgroundColor: currentLavel?.color }}
                          className="text-black font-bold py-1 px-4 mt-3 rounded"
                        >
                          {currentLavel?.maturityLevelName}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <HomeFooter />
      </div>
      <Loading isLoading={isPending} />
    </div>
  );
};

export default TeaserScore;
