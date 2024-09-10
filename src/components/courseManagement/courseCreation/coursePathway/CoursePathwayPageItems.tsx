import { MaturityLevelResult } from "@/types/MaturityLavel";
import { DataEntity } from "@/types/Pillar";

interface CoursePathwayPageItemsProps {
  data: DataEntity;
  lavelData?: any;
  handleSelected: (pillarId: number, maturityId: number) => void;
  selectedData: {
    pillarId: string;
    maturityId: string;
  }[];
}

const CoursePathwayPageItems = ({
  data,
  lavelData,
  handleSelected,
  selectedData,
}: CoursePathwayPageItemsProps) => {
  return (
    <div className="md:h-[100px] h-auto border border-[#D9D9D9] rounded-md grid grid-cols-12 w-full mb-4 overflow-hidden">
      <div className="h-full flex items-center md:col-span-3 col-span-12 sm:p-4 p-2.5 bg-[#F5F7FF] align-middle border-e border-[#D9D9D9]">
        <h4 className="align-middle sm:text-base text-sm font-calibri font-bold">
          {data?.pillarName}
        </h4>
      </div>
      {/* <div className="col-span-9 flex items-center">
        <div className="2xl:ps-12 xl:ps-5 ps-3">
          <Button className="py-4 px-5 rounded-full  bg-[#FF5252] text-white text-base font-calibri">
            <Checkbox className="w-[24px] h-[24px] bg-white rounded-full border-bone me-3" />
            Introductory
          </Button>
        </div>
        <div className="2xl:ps-12 xl:ps-5 ps-3">
          <Button className="py-4 px-5 rounded-full  bg-[#FFD56A] text-black text-base font-calibri hover:text-white">
            <Checkbox className="w-[24px] h-[24px] bg-white rounded-full border-bone me-3" />
            Intermediate
          </Button>
        </div>
        <div className="2xl:ps-12 xl:ps-5 ps-3">
          <Button className="py-4 px-5 rounded-full  bg-[#D6F5AC] text-black text-base font-calibri hover:text-white">
            <Checkbox className="w-[24px] h-[24px] bg-white rounded-full border-bone me-3" />
            Advance
          </Button>
        </div>
      </div> */}
      {/* {lavelData?.map((item: MaturityLevelResult) => {
          return (
            <Label
              htmlFor={`r1_${item.id}-${data.id}`}
              className={`flex items-center space-x-2 py-[10px] px-3 rounded-full  bg-[${
                item.color
              }] ${
                item?.color === "#FF5252" ? "text-white" : "text-black"
              } text-base font-calibri`}
            >
              <Checkbox
                // onChange={() => handleSelected(item?.id.toString())}
                value={item?.id.toString()}
                onChange={(e:any) => console.log("eeeee++", e)}
              />
              <span className="text-base font-calibri">
                {item?.maturityLevelName}
              </span>
            </Label>
          );
        })} */}
      <div className="md:col-span-9 col-span-12 flex sm:flex-row flex-col xl:gap-[50px] sm:gap-6 gap-4 xl:ml-[50px] md:ml-6 ml-2.5 md:mt-0 mt-4 md:mx-0 mx-2.5 md:mb-0 mb-4">
        {lavelData?.map((item: MaturityLevelResult) => {
          return (
            <div
              key={item.id}
              className="flex items-center gap-[50px] col-span-9"
            >
              <div
                className={`checkbox space-x-2 rounded-full flex items-center pl-2.5 pr-3 sm:h-[44px] h-[36px]  bg-[${
                  item.color
                }] ${
                  item?.color === "#FF5252" ? "text-white" : "text-black"
                } text-base font-calibri`}
              >
                <label className="flex sm:gap-4 gap-3 items-center cursor-pointer">
                  <div className="w-[24px] h-[24px] flex justify-center items-center bg-white rounded-full border-bone">
                    {selectedData.some(
                      (selectLabel: any) =>
                        selectLabel?.maturityId === item?.id &&
                        selectLabel?.pillarId === data?.id
                    ) && (
                      <span className="w-3 h-3 rounded-full bg-[#58BA66] inline-block"></span>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    className="w-[24px] h-[24px] bg-white rounded-full border-bone me-3 hidden md:text-base text-sm focus:border focus:border-[#4b4b4b] shadow-none outline-none"
                    checked={selectedData.some(
                      (selectLabel: any) =>
                        selectLabel?.maturityId === item?.id &&
                        selectLabel?.pillarId === data?.id
                    )}
                    onChange={() => handleSelected(data?.id, item?.id)}
                  />
                  {item?.maturityLevelName}
                </label>
              </div>
            </div>
          );
        })}
      </div>

      {/* <RadioGroup
        value={
          selectedData?.find((item) => +item.pillarId === data.id)?.maturityId
        }
        onValueChange={(value) => handleSelected(value)}
        className="col-span-9 flex items-center gap-[50px] ml-[50px]"
      >
        {lavelData?.map((item: MaturityLevelResult) => {
          return (
            <Label
              htmlFor={`r1_${item.id}-${data.id}`}
              className={`flex items-center space-x-2 py-[10px] px-3 rounded-full  bg-[${
                item.color
              }] ${
                item?.color === "#FF5252" ? "text-white" : "text-black"
              } text-base font-calibri`}
            >
              <RadioGroupItem
                indicatorClassName="fill-[#58BA66]"
                className="text-[#58BA66] bg-white border-[#D9D9D9]  w-6 h-6"
                value={item?.id.toString()}
                id={`r1_${item.id}-${data.id}`}
              />
              <span className="text-base font-calibri">
                {item?.maturityLevelName}
              </span>
            </Label>
          );
        })} */}
      {/* <Label
          htmlFor={`r2_${data.id}`}
          className="flex items-center space-x-2 py-[10px] px-3 rounded-full  bg-[#FFD56A] text-black text-base font-calibri"
        >
          <RadioGroupItem
            indicatorClassName="fill-[#58BA66]"
            className="text-[#58BA66] bg-white border-[#fddfdf] w-6 h-6"
            value="Intermediate"
            id={`r2_${data.id}`}
          />
          <span className="text-base font-calibri">Intermediate</span>
        </Label>
        <Label
          htmlFor={`r3_${data.id}`}
          className="flex items-center space-x-2 py-[10px] px-3 rounded-full  bg-[#D6F5AC] text-black text-base font-calibri"
        >
          <RadioGroupItem
            indicatorClassName="fill-[#58BA66]"
            className="text-[#58BA66] bg-white border-[#D9D9D9] w-6 h-6"
            value="Advance"
            id={`r3_${data.id}`}
          />
          <span className="text-base font-calibri">Advance</span>
        </Label> */}
      {/* </RadioGroup> */}
    </div>
  );
};

export default CoursePathwayPageItems;
