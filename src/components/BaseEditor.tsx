import { useMemo } from "react";
import { MDXEditor } from "@mdxeditor/editor/MDXEditor";
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  UndoRedo,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  DiffSourceToggleWrapper,
  diffSourcePlugin,
  linkDialogPlugin,
  imagePlugin,
  linkPlugin,
  headingsPlugin,
  quotePlugin,
  listsPlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  type MDXEditorMethods,
} from "@mdxeditor/editor";

const BaseEditor = ({
  readOnly,
  editorRef,
}: {
  readOnly: boolean;
  editorRef: React.MutableRefObject<MDXEditorMethods | null>;
}) => {
  const plugins = useMemo(
    () => [
      headingsPlugin(),
      quotePlugin(),
      listsPlugin(),
      linkPlugin(),
      linkDialogPlugin(),
      thematicBreakPlugin(),
      diffSourcePlugin(),
      imagePlugin(),
      toolbarPlugin({
        toolbarContents: () => (
          <>
            <DiffSourceToggleWrapper>
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <BlockTypeSelect />
              <CreateLink />
              <InsertImage />
              <InsertTable />
              <ListsToggle />
              <InsertThematicBreak />
            </DiffSourceToggleWrapper>
          </>
        ),
      }),
    ],
    []
  );
  return (
    <MDXEditor
      ref={editorRef}
      plugins={plugins}
      readOnly={readOnly}
      markdown=""
    />
  );
};

export default BaseEditor;
