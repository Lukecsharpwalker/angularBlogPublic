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

