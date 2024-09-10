import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { useAppDispatch } from "@/hooks/use-redux";
import { setPath } from "@/redux/reducer/PathReducer";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export function BreadcrumbWithCustomSeparator() {
  const { paths } = useSelector((state: RootState) => state.path);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (paths[paths?.length - 1]?.link) {
      navigate(paths[paths.length - 1].link);
    }
  }, [paths]);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths?.map((item, index: number) => {
          return (
            <BreadcrumbItem key={index}>
              {item.link ? (
                <>
                  <BreadcrumbItem>
                    {index > 0 && " / "}
                    {
                      <Link
                        className={`${
                          index === paths?.length - 1 && index > 0
                            ? " "
                            : "text-[#000000]"
                        } font-Nunito font-sans capitalize font-medium`}
                        to={item.link}
                        onClick={() =>
                          dispatch(
                            setPath(
                              paths?.filter((_, i: number) => {
                                return i <= index;
                              })
                            )
                          )
                        }
                      >
                        {item.label}
                      </Link>
                    }
                  </BreadcrumbItem>
                </>
              ) : (
                <BreadcrumbItem
                  className={`${
                    index === paths?.length - 1 && index > 0
                      ? "text-[#64748B] font-medium"
                      : "text-[#000000]"
                  } font-Nunito font-sans capitalize font-medium`}
                >
                  {index > 0 && " / "} {item.label}
                </BreadcrumbItem>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
