import { QUERY_KEYS } from "@/lib/constants";
import { RootState } from "@/redux/store";
import { certificateList } from "@/services/apiServices/certificate";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Loader from "../comman/Loader";
import CertificateTempleteItems from "./CertificateTempleteItems";
const CertificateTemplete = () => {
  const { UserId } = useSelector((state: RootState) => state.user);
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const userID = UserId ? UserId : userData?.query?.id;
  const { data: certificate_data, isPending } = useQuery({
    queryKey: [QUERY_KEYS.getcertificate],
    queryFn: () => certificateList(userID),
  });
  return (
    <div className="bg-white rounded-lg">
      <div className=" md:flex block justify-between items-center border-b border-[#D9D9D9] p-4">
        <div className="">
          <h6 className="text-[16px] font-semibold font-calibri">
            All Certificate
          </h6>
          <p className="text-[#606060] text-[15px] font-abhaya leading-[16px] mt-1">
            All your created certificate templates
          </p>
        </div>
      </div>
      <div className="p-4">
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-2 grid-cols-1 md:gap-x-3 sm:gap-x-2 sm:gap-y-5 gap-y-0">
          {isPending ? (
            <Loader containerClassName="col-span-full" />
          ) : (
            certificate_data?.data?.map((item, index: number) => {
              return <CertificateTempleteItems data={item} key={index} />;
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificateTemplete;
