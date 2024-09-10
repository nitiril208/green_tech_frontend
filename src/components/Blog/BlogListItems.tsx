import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

type BlogList = {
  data: {
    image: string;
    date: string;
    title: string;
    subTitle: string;
    description: string;
  };
};

const BlogListItems = ({ data }: BlogList) => {
  const navigate = useNavigate();
  return (
    <div className="col-span-1 bg-white shadow-lg flex flex-col gap-3 rounded-md overflow-hidden">
      <div className="relative">
        <img src={data.image} />
        <span className="w-auto primary-background text-white text-sm text-color py-1 px-3 absolute top-[15px] right-[15px]">
          {data.date}
        </span>
      </div>
      <div className="flex flex-col gap-2.5 p-3 pt-0">
        <h3 className="font-calibri text-2xl text-black">{data.title}</h3>
        <span className="text-[#4E5566] text-base">{data.subTitle}</span>
        <p className="line-clamp-4 text-base font-calibri text-[#4E5566]">
          {data.description}
        </p>
        <Button
          className="text-black px-3 gap-1 w-[120px] text-base bg-transparent border-2 primary-border rounded-full hover:bg-primary-bg hover:text-white"
          onClick={() => navigate("/blogDetails")}
        >
          Read More <ChevronRight width={18} />
        </Button>
      </div>
    </div>
  );
};

export default BlogListItems;
