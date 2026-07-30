import { Node, mergeAttributes } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    expertTip: {
      insertExpertTip: () => ReturnType;
      toggleExpertTip: () => ReturnType;
    };
  }
}

export const ExpertTip = Node.create({
  name: "expertTip",

  group: "block",

  content: "inline*",

  defining: true,

  addAttributes() {
    return {
      label: {
        default: "Tips dari Praktisi",
        parseHTML: (element) => element.getAttribute("data-label") || "Tips dari Praktisi",
        renderHTML: (attributes) => {
          return { "data-label": attributes.label };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'aside[data-type="expert-tip"]',
      },
      {
        tag: 'blockquote[data-type="expert-tip"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "aside",
      mergeAttributes(HTMLAttributes, {
        "data-type": "expert-tip",
        class: "expert-tip-box",
      }),
      [
        "div",
        { class: "expert-tip-label" },
        ["span", { class: "expert-tip-icon" }, "\uD83D\uDCA1"],
        ["span", { class: "expert-tip-text" }, HTMLAttributes.label || "Tips dari Praktisi"],
      ],
      [
        "div",
        { class: "expert-tip-content" },
        0,
      ],
    ];
  },

  addCommands() {
    return {
      insertExpertTip:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { label: "Tips dari Praktisi" },
            content: [{ type: "text", text: "Tulis tips Anda di sini..." }],
          });
        },
      toggleExpertTip:
        () =>
        ({ commands }) => {
          return commands.toggleWrap(this.name);
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      "Mod-Shift-t": () => this.editor.commands.insertExpertTip(),
    };
  },
});
