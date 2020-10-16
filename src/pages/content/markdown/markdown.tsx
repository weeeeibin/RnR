import React, {  ReactElement, useEffect } from 'react';
import marked from 'marked';
import "./markdown.scss";
import hljs from 'highlight.js';
import 'highlight.js/styles/tomorrow-night-eighties.css';

interface Props {
  content:string;
  color:string;
}

export default function MarkDownView(props: Props): ReactElement {

  useEffect(() => {
    marked.setOptions({
      highlight: function (code, lang) {
        try {
          return hljs.highlight(lang, code).value;
        } catch (e) {
          return hljs.highlightAuto(code).value;
        }
      },
      renderer: new marked.Renderer(),
      gfm: true,
      breaks: true,
      pedantic: true,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml:true
    });
  }, []);

  return (
    <div>
      <div className="content" style={{ paddingTop: "64px" }}>
        <div
          id="content"
          className="article-detail"
          style={{color:props.color}}
          dangerouslySetInnerHTML={{
            __html: props.content ? marked(props.content) : null
          }}
        />
      </div>
    </div>
  )
}

