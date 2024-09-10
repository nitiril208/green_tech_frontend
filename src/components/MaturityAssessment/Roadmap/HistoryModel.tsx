import Loader from "@/components/comman/Loader";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { QUERY_KEYS } from "@/lib/constants";
import { getTimeAgo } from "@/lib/utils";
import { getItemHistory } from "@/services/apiServices/pillar";
import { useQuery } from "@tanstack/react-query";

export interface HistoryResponse {
  data?: DataEntity[] | null;
  message: string;
}
export interface DataEntity {
  id: number;
  historyName: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: null;
  createdBy: CreatedBy;
}
export interface CreatedBy {
  id: number;
  name: string;
  email: string;
  password: string;
  role: number;
  lastLogin: string;
  isVerify: number;
  lastLogout: string;
  pathStatus: number;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
}

const HistoryModel = ({
  id,
  historyMasure,
}: {
  id: number | null;
  historyMasure: string;
}) => {
  const { data, isLoading } = useQuery<HistoryResponse>({
    queryKey: [QUERY_KEYS.itemHistory, { id }],
    queryFn: () => getItemHistory(id as number),
    enabled: !!id,
  });

  return (
    <>
      <div>
        <p className="text-base font-nunito font-bold text-[#000]">
          Action Item History
        </p>
        <h5 className="font-abhaya text-[22px] font-semibold text-[#000] leading-6 pt-[30px]">
          {historyMasure}
        </h5>
        <div className="pt-4 flex flex-col gap-5">
          {isLoading ? (
            <Loader />
          ) : (
            data?.data?.map((items, index: number) => {
              return (
                <div className="flex items-center gap-2" key={index}>
                  <div>
                    <Avatar>
                      {/* <AvatarImage src={items?.image} alt="Avatar" /> */}
                      <AvatarFallback>
                        {items.createdBy?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <div className="flex items-center pb-1">
                      <h6 className="text-[18px] font-abhaya font-bold">
                        {items.createdBy?.name}
                      </h6>
                      ,{" "}
                      <p className="text-[14px] font-abhaya text-[#777] font-[700] ml-1">
                        {getTimeAgo(items.createdAt)}
                      </p>
                    </div>
                    <div className="text-[15px] font-abhaya font-bold text-[#000]">
                      {items.historyName}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default HistoryModel;
