import Block from 'quill/blots/block';

export async function loadQuillModules(): Promise<void> {

  const [QuillModule, BlocKModule, SyntaxModule] = await Promise.all([
    import('quill'), import('quill/blots/block'), import('quill/modules/syntax')
  ]);

  const supportedLanguages = [
    { key: 'xml', label: 'XML' },
    { key: 'typescript', label: 'TypeScript' },
    { key: 'javascript', label: 'JavaScript' },
    { key: 'css', label: 'CSS' },
    { key: 'plaintext', label: 'Plain Text' }
  ];

  BlocKModule.default.tagName = "DIV";
  SyntaxModule.default.register();
  SyntaxModule.default.DEFAULTS.languages = supportedLanguages;
  QuillModule.default.register(Block, true);
  QuillModule.default.register(SyntaxModule, true);

}

export const quillToolbarConfig = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  ['link', 'image', 'video', 'formula'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean'],
]
