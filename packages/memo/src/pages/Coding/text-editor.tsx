import { Cell } from "models/cell";
import { FC, useEffect, useRef, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Cells } from ".";
interface TextEditorProps {
  cell: Cell;
}

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

export const TextEditor: FC<TextEditorProps> = ({ cell }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const setCells = useSetRecoilState(Cells);
  const cells = useRecoilValue(Cells);

  useEffect(() => {
    const listener = (e: any) => {
      if (ref.current && e.target && ref.current.contains(e.target)) {
        return;
      }
      setEditing(false);
    };

    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  const updateCell = (id, content) => {
    console.log("content, ", content);
    console.log("id, ", id);

    const index = cells.findIndex((cell) => cell.id === id);
    const cell = {
      id,
      content,
      type: "text",
    };

    const newCells = replaceItemAtIndex(cells, index, {
      ...cell,
    });
    setCells(newCells);
  };
  if (editing) {
    return (
      <div ref={ref}>
        <MDEditor
          value={cell.content!}
          onChange={(v) => updateCell(cell.id, v || "")}
        />
      </div>
    );
  }
  return (
    <div onClick={() => setEditing(true)}>
      <MDEditor.Markdown source={cell.content || "Click to edit"} />
    </div>
  );
};
