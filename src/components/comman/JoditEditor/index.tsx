// CKEditorComponent.tsx
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { FC } from "react";

interface CKEditorComponentProps {
  value: string;
  onChange: (event: any, editor: any) => void;
  className?: string;
}

const CKEditorComponent: FC<CKEditorComponentProps> = ({
  value,
  onChange,
  className,
}) => {
  return (
    <div className={`ckeditor ${className}`}>
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={onChange}
        config={{
          toolbar: [
            "bold",
            "italic",
            "bulletedList",
            "numberedList",
            "blockQuote",
            "alignment",
            "link",
          ],
        }}
      />
    </div>
  );
};

export default CKEditorComponent;
