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
import { ExpertTip } from "./tiptap-expert-tip";

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
      className={`min-w-[34px] h-8 px-1.5 grid place-items-center rounded-lg text-sm font-bold transition-all duration-150 ${
        active
          ? "bg-[var(--blue)] text-white shadow-sm"
          : "text-slate-500 hover:bg-slate-100 hover:text-[var(--blue)]"
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

  const Divider = () => <div className="w-px h-5 bg-slate-200 mx-1.5" />;

  return (
    <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-2 flex flex-wrap items-center gap-1">
        <ToolbarButton onClick={() => exec("formatBlock", "<h2>")} active={editor.isActive("heading", { level: 2 })} title="Heading 2">H2</ToolbarButton>
        <ToolbarButton onClick={() => exec("formatBlock", "<h3>")} active={editor.isActive("heading", { level: 3 })} title="Heading 3">H3</ToolbarButton>
        <ToolbarButton onClick={() => exec("formatBlock", "<p>")} active={editor.isActive("paragraph") && !editor.isActive("heading")} title="Paragraf">
          <span className="font-serif text-base leading-none">&para;</span>
        </ToolbarButton>
        <Divider />
        <ToolbarButton onClick={() => exec("bold")} active={editor.isActive("bold")} title="Bold">
          <span className="font-extrabold">B</span>
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("italic")} active={editor.isActive("italic")} title="Italic">
          <span className="italic">I</span>
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("underline")} active={editor.isActive("underline")} title="Underline">
          <span className="underline">U</span>
        </ToolbarButton>
        <Divider />
        <ToolbarButton onClick={() => exec("insertUnorderedList")} active={editor.isActive("bulletList")} title="Bullet list">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("insertOrderedList")} active={editor.isActive("orderedList")} title="Numbered list">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 6h10M7 12h10M7 18h10" /></svg>
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("formatBlock", "<blockquote>")} active={editor.isActive("blockquote")} title="Quote">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" /></svg>
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().insertExpertTip().run()} active={editor.isActive("expertTip")} title="Tips dari Praktisi">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
        </ToolbarButton>
        <Divider />
        <ToolbarButton onClick={setLink} active={editor.isActive("link")} title="Insert link">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("removeFormat")} title="Hapus format">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </ToolbarButton>
        <Divider />
        <ToolbarButton onClick={() => exec("undo")} title="Undo">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a5 5 0 015 5v0a5 5 0 01-5 5H3" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 6l-4 4 4 4" /></svg>
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("redo")} title="Redo">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10H11a5 5 0 00-5 5v0a5 5 0 005 5h10" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 6l4 4-4 4" /></svg>
        </ToolbarButton>
      </div>
    </div>
  );
}

export default function TipTapEditor({
  content,
  onChange,
}: {
  content: string;
  onChange: (html: string) => void;
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
      ExpertTip,
    ],
    content: content || "",
    editorProps: {
      attributes: {
        class:
          "prose prose-lg prose-slate max-w-none min-h-[500px] px-8 sm:px-12 py-8 outline-none " +
          "prose-headings:font-head prose-headings:text-[var(--navy)] " +
          "prose-h2:text-2xl prose-h2:font-extrabold prose-h2:mt-10 prose-h2:mb-4 " +
          "prose-h3:text-lg prose-h3:font-extrabold prose-h3:mt-8 prose-h3:mb-3 " +
          "prose-p:text-[17px] prose-p:leading-[1.8] prose-p:text-slate-600 prose-p:my-4 " +
          "prose-strong:text-[var(--navy)] " +
          "prose-a:text-[var(--blue)] prose-a:font-semibold prose-a:underline prose-a:underline-offset-2 " +
          "prose-blockquote:border-l-4 prose-blockquote:border-[var(--cyan)] prose-blockquote:bg-gradient-to-r prose-blockquote:from-blue-50 prose-blockquote:to-cyan-50 prose-blockquote:rounded-r-xl prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:text-slate-600 " +
          "prose-table:w-full prose-table:my-6 " +
          "prose-th:text-left prose-th:font-bold prose-th:bg-slate-50 prose-th:px-4 prose-th:py-3 prose-th:border prose-th:border-slate-200 " +
          "prose-td:px-4 prose-td:py-3 prose-td:border prose-td:border-slate-200 " +
          "prose-li:text-[17px] prose-li:leading-relaxed prose-li:text-slate-600",
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
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
