"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import LinkExtension from "@tiptap/extension-link";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";

function ToolbarButton({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`min-w-8 h-8 px-1.5 grid place-items-center rounded-md text-sm font-bold transition ${
        active
          ? "bg-[var(--blue)]/10 text-[var(--blue)]"
          : "text-slate-600 hover:bg-slate-100 hover:text-[var(--blue)]"
      }`}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  function setLink() {
    const url = window.prompt("Masukkan URL link:");
    if (!url) {
      editor?.chain().focus().unsetLink().run();
      return;
    }
    editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  function exec(cmd: string, value?: string) {
    editor?.chain().focus().run();
    if (cmd === "formatBlock" && value) {
      const tag = value.replace(/[<>]/g, "").toLowerCase();
      if (tag === "h2") editor?.chain().focus().toggleHeading({ level: 2 }).run();
      else if (tag === "h3") editor?.chain().focus().toggleHeading({ level: 3 }).run();
      else if (tag === "p") editor?.chain().focus().setParagraph().run();
      else if (tag === "blockquote") editor?.chain().focus().toggleBlockquote().run();
    } else if (cmd === "bold") editor?.chain().focus().toggleBold().run();
    else if (cmd === "italic") editor?.chain().focus().toggleItalic().run();
    else if (cmd === "underline") editor?.chain().focus().toggleUnderline().run();
    else if (cmd === "insertUnorderedList") editor?.chain().focus().toggleBulletList().run();
    else if (cmd === "insertOrderedList") editor?.chain().focus().toggleOrderedList().run();
    else if (cmd === "createLink") editor?.chain().focus().setLink({ href: value || "" }).run();
    else if (cmd === "unlink") editor?.chain().focus().unsetLink().run();
    else if (cmd === "removeFormat") editor?.chain().focus().clearNodes().unsetAllMarks().run();
    else if (cmd === "undo") editor?.chain().focus().undo().run();
    else if (cmd === "redo") editor?.chain().focus().redo().run();
  }

  const ToolBtn = ({
    label,
    title: tip,
    onClick: clickFn,
  }: {
    label: React.ReactNode;
    title: string;
    onClick: () => void;
  }) => (
    <ToolbarButton onClick={clickFn} title={tip}>
      {label}
    </ToolbarButton>
  );

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-slate-200 bg-slate-50 px-3 py-2 sticky top-14 z-20">
      <ToolBtn label="H2" title="Heading 2" onClick={() => exec("formatBlock", "<h2>")} />
      <ToolBtn label="H3" title="Heading 3" onClick={() => exec("formatBlock", "<h3>")} />
      <ToolBtn label={"\u00B6"} title="Paragraf" onClick={() => exec("formatBlock", "<p>")} />
      <span className="w-px h-5 bg-slate-300 mx-1" />
      <ToolBtn label={<b>B</b>} title="Bold" onClick={() => exec("bold")} />
      <ToolBtn label={<i>I</i>} title="Italic" onClick={() => exec("italic")} />
      <ToolBtn label={<u>U</u>} title="Underline" onClick={() => exec("underline")} />
      <span className="w-px h-5 bg-slate-300 mx-1" />
      <ToolBtn label={"\u2022\u2261"} title="Bullet list" onClick={() => exec("insertUnorderedList")} />
      <ToolBtn label={"1\u2261"} title="Numbered list" onClick={() => exec("insertOrderedList")} />
      <ToolBtn label={"\u275D"} title="Quote / callout" onClick={() => exec("formatBlock", "<blockquote>")} />
      <span className="w-px h-5 bg-slate-300 mx-1" />
      <ToolBtn label={"\uD83D\uDD17"} title="Insert link" onClick={setLink} />
      <ToolBtn label={"\u232B"} title="Hapus format" onClick={() => exec("removeFormat")} />
      <span className="w-px h-5 bg-slate-300 mx-1" />
      <ToolBtn label={"\u21A9"} title="Undo" onClick={() => exec("undo")} />
      <ToolBtn label={"\u21AA"} title="Redo" onClick={() => exec("redo")} />
    </div>
  );
}

export default function TipTapEditor({
  content,
  onChange,
  onInsertTable,
}: {
  content: string;
  onChange: (html: string) => void;
  onInsertTable?: () => void;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      BulletList.configure({ HTMLAttributes: { class: "list-disc pl-6" } }),
      OrderedList.configure({ HTMLAttributes: { class: "list-decimal pl-6" } }),
      ListItem,
      Underline,
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: { target: "_blank", rel: "noopener noreferrer" },
      }),
      Table.configure({
        resizable: false,
        HTMLAttributes: { class: "border-collapse border border-slate-200 w-full my-4" },
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: { class: "border border-slate-200 bg-slate-50 px-3 py-2 text-left font-semibold" },
      }),
      TableCell.configure({
        HTMLAttributes: { class: "border border-slate-200 px-3 py-2" },
      }),
    ],
    content: content || "",
    editorProps: {
      attributes: {
        class: "reading-prose min-h-[420px] px-6 sm:px-8 py-6 outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Sync content from outside (e.g. AI generate or edit mode initial load)
  const syncedRef = { current: false };
  if (editor && content !== undefined && editor.getHTML() !== content && !syncedRef.current) {
    editor.commands.setContent(content);
    syncedRef.current = true;
  }

  return (
    <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
