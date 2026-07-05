"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function ArticleEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "min-h-[200px] px-4 py-3 focus:outline-none text-[#0F2540]",
      },
    },
  });

  return (
    <div className="border border-gray-300 rounded-2xl bg-white overflow-hidden">
      <EditorContent editor={editor} />
    </div>
  );
}
