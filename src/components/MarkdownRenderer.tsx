import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '../lib/utils';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={cn("prose prose-invert prose-p:leading-relaxed prose-pre:bg-zinc-900 max-w-none", className)}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          ul: ({node, ...props}) => <ul className="list-disc pl-5 my-2 space-y-1" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal pl-5 my-2 space-y-1" {...props} />,
          li: ({node, ...props}) => <li className="pl-1" {...props} />,
          h1: ({node, ...props}) => <h1 className="text-2xl font-bold mt-6 mb-4 text-white" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-xl font-semibold mt-5 mb-3 text-indigo-300" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-lg font-medium mt-4 mb-2 text-indigo-200" {...props} />,
          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-zinc-400 my-4" {...props} />,
          code: ({node, ...props}) => {
             // @ts-ignore
             const {inline, className, children} = props;
             const match = /language-(\w+)/.exec(className || '')
             return !inline ? (
                <code className={cn("block bg-zinc-900 p-3 rounded-md text-sm font-mono overflow-x-auto", className)} {...props}>
                  {children}
                </code>
              ) : (
                <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono text-indigo-300" {...props}>
                  {children}
                </code>
              )
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
