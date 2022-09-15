import Paragraph from "@editorjs/paragraph";
import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import Underline from "@editorjs/underline";
import SimpleImage from "@editorjs/simple-image";
// import ImageTool from "@editorjs/image";
// import Table from '@editorjs/table'
// import Raw from '@editorjs/raw'
// import Warning from '@editorjs/warning'
// import CheckList from '@editorjs/checklist'
// import Delimiter from '@editorjs/delimiter'
// import InlineCode from '@editorjs/inline-code'

export const EDITOR_JS_TOOLS = {
  // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
  // paragraph: Paragraph,
  header: {
    class: Header,
    inlineToolbar: ["link"],
  },
  embed: {
    class: Embed,
    config: {
      services: {
        youtube: true,
        coub: true,
        facebook: true,
        instagram: true,
      },
    },
  },
  list: List,
  code: Code,
  linkTool: LinkTool,
  // image: {
  //   class: ImageTool,
  //   config: {
  //     uploader: {
  //       async uploadByFile(file) {
  //         return onFileChange(file).then((imageUrl) => {
  //           return {
  //             success: 1,
  //             file: {
  //               url: imageUrl,
  //             },
  //           };
  //         });
  //       },
  //     },
  //   },
  // },
  quote: Quote,
  marker: Marker,
  underline: Underline,
  image: SimpleImage,
  //   raw: Raw,
  //   table: Table,
  //   warning: Warning,
  //   checklist: CheckList,
  //   delimiter: Delimiter,
  //   inlineCode: InlineCode,
};
