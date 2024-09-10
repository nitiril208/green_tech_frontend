import EllipseImage from "@/assets/images/Ellipse2.png";
import EllipseImage2 from "@/assets/images/Ellipse3.png";
import { DataEntity } from "@/types/userManual";

type supportListProps = {
  list: DataEntity;
  index: number;
};
const UserManualList = ({ list, index }: supportListProps) => {
  return (
    <a href={list?.documentUrl} target="_blank">
      <div className="shadow sm:p-4 p-3 border border-[#dddddd33] rounded-[10px] relative overflow-hidden ">
        <div className="font-semibold font-abhaya">
          <h6 className="sm:text-[15px] text-sm  leading-5 text-black sm:pb-3 pb-2.5">
            ID: #{index}
          </h6>
          <p className="text-[#00778B] sm:text-[15px] text-sm  leading-5 sm:pb-3 pb-2.5">
            <span className="text-[#000000]">Document Title:</span>{" "}
            {list?.title}
          </p>
          <p className="sm:text-[15px] text-sm leading-5">Type: {list?.type}</p>
        </div>
        <img
          src={EllipseImage}
          alt="ellipse"
          className="absolute sm:top-0 top-[-20px] sm:right-0 right-[-18px]"
        />
        <img
          src={EllipseImage2}
          alt="ellipse"
          className="absolute sm:top-0 top-[-20px] sm:right-0 right-[-18px]"
        />
      </div>
    </a>
  );
};

export default UserManualList;
