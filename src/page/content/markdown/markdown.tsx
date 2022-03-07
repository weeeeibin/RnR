import React, { memo, ReactElement, useEffect, useMemo } from 'react';
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import styles from './markdown.scss';
// import markdownStyles from './github-markdown.scss'

interface Props {
    content: string;
    theme: string
}

function MarkDownView(props: Props): ReactElement {
    const { content, theme } = props;

    const markdownStyles = useMemo(() => {
        if(theme === "light"){
            return require('./github-markdown-light.scss').default
        }else{
            return require('./github-markdown-dark.scss').default
        }
    }, [theme])

    return (
        <div>
            <div className="content">
                <ReactMarkdown
                    className={`${markdownStyles["markdown-body"]} ${styles.content}`}
                    children={content}
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        code({ node, inline, className, children, ...props }: { node: any, inline: any, className: any, children: any }) {
                            const match = /language-(\w+)/.exec(className || '')
                            return !inline && match ? (
                                <SyntaxHighlighter
                                    children={String(children).replace(/\n$/, '')}
                                    style={atomOneDark}
                                    language={match[1]}
                                    PreTag="div"
                                    {...props}
                                />
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            )
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default memo(MarkDownView);

