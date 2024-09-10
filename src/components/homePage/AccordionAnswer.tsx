type FaqProps = {
  data: {
    question: string;
    answer: string;
  };
};

const AccordionAnswer = ({ data }: FaqProps) => {
  return (
    <div className="px-4 pb-4">
      {data?.answer?.split("/n").map((item, index) => (
        <p
          className="text-[#00778B] text-base font-Droid-Regular font-bold pb-5"
          key={index}
          dangerouslySetInnerHTML={{ __html: item }}
        ></p>
      ))}
      {/* <p
        className="text-[#00778B] text-base font-Droid-Regular font-bold pb-5"
        dangerouslySetInnerHTML={{ __html: data?.answer }}
      ></p> */}
    </div>
  );
};

export default AccordionAnswer;
