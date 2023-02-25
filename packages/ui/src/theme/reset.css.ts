import { globalStyle } from "@vanilla-extract/css";

globalStyle(
  "*:where(:not(html, iframe, canvas, img, svg, video, audio):not(svg *, symbol *)) ",
  {
    all: "unset",
    display: "revert",
  }
);

globalStyle("*,*::before,*::after", {
  boxSizing: "border-box",
});

globalStyle("a, button", {
  cursor: "revert",
});

globalStyle("ol, ul, menu", {
  listStyle: "none",
});

globalStyle("img", {
  maxInlineSize: "100%",
  maxBlockSize: "100%",
});

globalStyle("table", {
  borderCollapse: "collapse",
});

globalStyle("input, textarea", {
  WebkitUserSelect: "auto",
});

globalStyle("textarea", {
  whiteSpace: "revert",
});

globalStyle("meter", {
  WebkitAppearance: "revert",
  appearance: "revert",
});

globalStyle(":where(pre)", {
  all: "revert",
});

globalStyle("::marker", {
  content: "initial",
});

globalStyle(":where([hidden])", {
  display: "none",
});

globalStyle(":where([contenteditable]:not([contenteditable='false']))", {
  MozUserModify: "read-write",
  WebkitUserModify: "read-write",
  overflowWrap: "break-word",
  // WebkitLineBreak: "after-white-space",
  WebkitUserSelect: "auto",
});

// globalStyle(":where([draggable='true'])", {
//   WebkitUserDrag: "element",
// });

globalStyle(":where(dialog:modal)", {
  all: "revert",
});
