import { Button } from "react-bootstrap";
import { saveRecord, type ApplicationRecord } from "../data";
import type { MDXEditorMethods } from "@mdxeditor/editor";

const EditorActions = ({
  readOnly,
  newPage,
  setReadOnly,
  record,
  editorRef,
  field,
}: {
  readOnly: boolean;
  newPage: boolean;
  record: ApplicationRecord;
  setReadOnly: (readOnly: boolean) => void;
  editorRef: React.MutableRefObject<MDXEditorMethods | null>;
  field: string;
}) => {
  return newPage ? (
    <Button
      variant="primary"
      onClick={(e) => {
        e.preventDefault();
        setReadOnly(false);
      }}
      disabled={true}
    >
      Edit
    </Button>
  ) : readOnly ? (
    <Button
      variant="primary"
      onClick={async (e) => {
        e.preventDefault();
        setReadOnly(false);
      }}
    >
      Edit
    </Button>
  ) : (
    <>
      <Button
        variant="primary"
        className="me-2"
        onClick={async (e) => {
          e.preventDefault();
          setReadOnly(true);
          await saveRecord({
            ...record,
            [field]: editorRef.current?.getMarkdown(),
          });
        }}
      >
        Save
      </Button>
      <Button
        variant="secondary"
        onClick={async (e) => {
          e.preventDefault();
          setReadOnly(true);
        }}
      >
        Cancel
      </Button>
    </>
  );
};

export default EditorActions;
