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
        [
          "span",
          { class: "expert-tip-icon" },
          [
            "svg",
            {
              class: "w-5 h-5",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              "stroke-width": "2",
            },
            [
              "path",
              {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
              },
            ],
          ],
        ],
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
