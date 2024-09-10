import document_Option_1 from "@/assets/images/upload_option_1.png";
import document_Option_2 from "@/assets/images/upload_option_2.png";
// import document_Option_3 from "@/assets/images/upload_option_3.png";
import document_Option_4 from "@/assets/images/upload_option_4.png";
// import document_Option_5 from "@/assets/images/upload_option_5.png";
import document_Option_6 from "@/assets/images/upload_option_6.png";
// import document_Option_7 from "@/assets/images/upload_option_7.png";
import SelectDoumentTypeItems from "./SelectDoumentTypeItems";
import { FileType } from "@/lib/constants";

const SelectDoumentType = ({
  onSelectedDocumentType,
}: {
  onSelectedDocumentType: (type: number) => void;
}) => {
  const documentUploadType = [
    {
      documentSelectOption: document_Option_1,
      type: FileType.Document.name,
      enumType: FileType.Document.enum,
    },
    {
      documentSelectOption: document_Option_2,
      type: FileType.Excel.name,
      enumType: FileType.Excel.enum,
    },
    // {
    //   documentSelectOption: document_Option_3,
    // },
    {
      documentSelectOption: document_Option_4,
      type: FileType.Pdf.name,
      enumType: FileType.Pdf.enum,
    },
    // {
    //   documentSelectOption: document_Option_5,
    // },
    {
      documentSelectOption: document_Option_6,
      type: FileType.Video.name,
      enumType: FileType.Video.enum,
    },
    // {
    //   documentSelectOption: document_Option_7,
    // },
  ];
  return (
    <div>
      <h5 className="font-bold text-black sm:text-xl text-base font-calibri sm:pb-5 pb-3">
        Select Document Type
      </h5>
      <div className="flex flex-wrap justify-center items-center">
        {documentUploadType.map((data, index) => {
          return (
            <SelectDoumentTypeItems
              onClick={() => onSelectedDocumentType(data.enumType)}
              key={index}
              data={data}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SelectDoumentType;
