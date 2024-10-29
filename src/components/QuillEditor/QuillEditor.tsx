import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface QuillEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillInstanceRef = useRef<Quill | null>(null);

  console.log(value);

  useEffect(() => {
    if (editorRef.current && !quillInstanceRef.current) {
      const toolbarOptions = [
        ["bold", "italic", "underline", "strike"],
        [{ header: 1 }, { header: 2 }],
        [{ list: "bullet" }],
      ];

      quillInstanceRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: { toolbar: toolbarOptions },
      });

      // Initialize editor with initial value
      quillInstanceRef.current.root.innerHTML = value;

      // Listen for text changes
      quillInstanceRef.current.on("text-change", () => {
        const content = quillInstanceRef.current?.root.innerHTML;
        onChange(content || "");
      });
    }

    return () => {
      quillInstanceRef.current = null;
    };
  }, []); // Initial mount only

  useEffect(() => {
    if (
      quillInstanceRef.current &&
      quillInstanceRef.current.root.innerHTML !== value
    ) {
      quillInstanceRef.current.root.innerHTML = value; // Update editor when `value` changes
    }
  }, [value]); // Sync external `value` changes

  return <div ref={editorRef} style={{ height: "300px" }} />;
};

export default QuillEditor;
