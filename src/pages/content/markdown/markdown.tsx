import React, { memo, ReactElement, useEffect } from 'react';
import marked from 'marked';
import "./markdown.scss";
import hljs from 'highlight.js';
import 'highlight.js/styles/tomorrow-night-eighties.css';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: (code, lang) => {
    try {
      return hljs.highlight(lang, code).value;
    } catch (e) {
      return hljs.highlightAuto(code).value;
    }
  },
});

interface Props {
  content: string;
}

function MarkDownView(props: Props): ReactElement {

  return (
    <div>
      <div className="content">
        <div
          id="content"
          className="article-detail"
          dangerouslySetInnerHTML={{
            __html: props.content ? marked(props.content) : null
          }}
        />
      </div>
    </div>
  )
}

export default memo(MarkDownView);

