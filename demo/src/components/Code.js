import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { githubGist as style } from 'react-syntax-highlighter/dist/styles/hljs';

export default function Code({ code }) {
  return (
    <div className="code-block">
      <SyntaxHighlighter language="jsx" style={style}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
