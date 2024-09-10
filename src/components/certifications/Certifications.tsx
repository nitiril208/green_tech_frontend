import { QUERY_KEYS } from "@/lib/constants";
import { getCertifications } from "@/services/apiServices/certificate";
import { EmployeeCertificationResponse } from "@/types/certificate";
import { useQuery } from "@tanstack/react-query";
import Loader from "../comman/Loader";
import CertificationsList from "./CertificationsList";
const Certifications = () => {
  const userData = JSON.parse(localStorage.getItem("user") as string);

  const { data, isLoading } = useQuery<EmployeeCertificationResponse>({
    queryKey: [QUERY_KEYS.getcertifications],
    queryFn: () => getCertifications(userData?.query?.id),
  });

  return (
    <>
      <div className="lg:bg-white bg-transparent rounded-xl">
        <div className={`grid sm:gap-5 gap-4 bg-white sm:p-5 p-[15px] rounded-lg 
          ${isLoading ? "grid-cols-1" : "xl:grid-cols-2 grid-cols-1"}`}>
          {isLoading ? (
            <Loader />
          ) : data?.data?.length ? (
            data?.data?.map((data: any, index: number) => {
              return <CertificationsList key={index} data={data} />;
            })
          ) : (
            <p className="col-span-full flex items-center justify-center h-[300px]">
              No Certification
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Certifications;
