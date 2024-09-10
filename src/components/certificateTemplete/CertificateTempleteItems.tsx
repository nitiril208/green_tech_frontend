import { PermissionContext } from "@/context/PermissionContext";
import { useAppDispatch } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { setPath } from "@/redux/reducer/PathReducer";
import { deleteCertificate } from "@/services/apiServices/certificate";
import { DataEntity } from "@/types/certificate";
import { ErrorType } from "@/types/Errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil, Trash2 } from "lucide-react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
interface CertificateTempleteItemsProps {
  data: DataEntity;
}

const CertificateTempleteItems = ({ data }: CertificateTempleteItemsProps) => {
  const dispatch = useAppDispatch();
  const Role = location.pathname.split("/")[1];
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { permissions } = useContext(PermissionContext);

  const { mutate, isPending } = useMutation({
    mutationFn: deleteCertificate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getcertificate],
      });
    },
    onError: (error: ErrorType) => {
      console.error(error);
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    },
  });

  const handleDelete = (id: number) => {
    mutate(id);
  };

  const handleAllocate = () => {
    dispatch(
      setPath([
        {
          label: `Certificate Management`,
          link: null,
        },
        {
          label: `Issued Certificate`,
          link: `/${Role}/allocated-certificate`,
        },
        {
          label: `Allocate Certificate`,
          link: `/${Role}/allocated-certificate-employee`,
        },
      ])
    );
    navigate(`/${Role}/allocated-certificate-employee`);
  };

  return (
    <div className="col-span-1 border border-[#D9D9D9] rounded-md md:mx-3 sm:mx-2 mx-0 mb-5">
      <div className=" text-center ">
        <div className="relative w-full">
          <img
            src={`${data?.previousCertificate}`}
            alt="previousCertificate"
            className="object-contain w-full mx-auto"
          />
        </div>
      </div>
      <h6 className="text-center font-abhaya font-bold text-black text-base pb-2 pt-2">
        {data?.templateName}
      </h6>
      <div className="flex items-center justify-between border-t border-[#D9D9D9] p-2.5">
        <div>
          <Button
            type="button"
            disabled={Role === "trainee" ? !permissions?.certificate : false}
            onClick={handleAllocate}
            className="bg-[#58BA66] xl:text-sm text-xs w-[90px] h-[32px] font-nunito leading-1 p-0 leading-0"
          >
            ALLOCATE
          </Button>
        </div>
        <div>
          <Link to={`updatecertificate/${data?.id}`} className="">
            <Button
              className="p-2 w-8 h-8 bg-[#5CC1EE] me-2"
              onClick={() =>
                dispatch(
                  setPath([
                    {
                      label: "Certificate Management",
                      link: null,
                    },
                    {
                      label: "Certificate List",
                      link: `/${Role}/certificate-template`,
                    },
                    {
                      label: "Update Certificate",
                      link: `/${Role}/certificate-template/updatecertificate/${data?.id}`,
                    },
                  ])
                )
              }
            >
              <Pencil className="w-4 h-4" />
            </Button>
          </Link>
          <Button
            type="button"
            isLoading={isPending}
            disabled
            onClick={() => handleDelete(data?.id)}
            className="p-2 w-8 h-8 bg-[#FF5252]"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CertificateTempleteItems;
