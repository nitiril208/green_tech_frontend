const SelectDoumentTypeItems = ({
  data,
  onClick,
}: {
  data: any;
  onClick: () => void;
}) => {
  return (
    <div className="sm:w-1/4 w-1/3 sm:mb-0 mb-2.5">
      <div
        className="md:w-[120px] w-[90px] h-[90px] md:h-[120px] border border-[#D9D9D9] rounded-md flex justify-center items-center hover:border-[#58BA66]"
        onClick={onClick}
      >
        <img
          src={data.documentSelectOption}
          className="sm:h-[84px] sm:w-[84px] w-[60px] h-[60px]"
        />
      </div>
    </div>
  );
};

export default SelectDoumentTypeItems;
