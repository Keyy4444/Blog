import React, { useEffect } from "react";
import "quill/dist/quill.snow.css";
import { useQuill } from "react-quilljs";

interface QuillEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        [{ header: 1 }, { header: 2 }],
        [{ list: "bullet" }],
      ],
    },
    formats: [
      "size",
      "bold",
      "italic",
      "underline",
      "strike",
      "header",
      "list",
    ],
  });

  useEffect(() => {
    if (quill && value !== quill.root.innerHTML) {
      quill.root.innerHTML = value;
    }
  }, [quill, value]);

  useEffect(() => {
    if (quill) {
      const handleChange = () => {
        const content = quill.root.innerHTML;
        onChange(content);
      };

      quill.on("text-change", handleChange);

      return () => {
        quill.off("text-change", handleChange);
      };
    }
  }, [quill, onChange]);

  return (
    <div style={{ width: 500, height: 300 }}>
      <div ref={quillRef} style={{ height: "100%" }} />
      <div id="toolbar">
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        <button className="ql-strike" />
        <select className="ql-header" defaultValue="">
          <option value="" />
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
        </select>
        <button className="ql-list" value="bullet" />
      </div>
    </div>
  );
};

export default QuillEditor;
