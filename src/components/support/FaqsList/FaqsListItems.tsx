type ListProps = {
  data: {
    list: string;
  };
};

const FaqsListItems = ({ data }: ListProps) => {
  return <div className="text-base text-black font-bold">{data.list}</div>;
};

export default FaqsListItems;
