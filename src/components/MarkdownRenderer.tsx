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
    <div className={cn("prose prose-zinc max-w-none prose-p:leading-relaxed prose-headings:font-serif prose-headings:text-mckinsey-navy prose-strong:text-mckinsey-navy prose-a:text-mckinsey-blue", className)}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          ul: ({node, ...props}) => <ul className="list-disc pl-5 my-2 space-y-1 text-zinc-700" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal pl-5 my-2 space-y-1 text-zinc-700" {...props} />,
          li: ({node, ...props}) => <li className="pl-1" {...props} />,
          h1: ({node, ...props}) => <h1 className="text-2xl font-bold mt-6 mb-4 text-mckinsey-navy font-serif" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-xl font-semibold mt-5 mb-3 text-mckinsey-navy font-serif" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-lg font-medium mt-4 mb-2 text-mckinsey-navy font-serif" {...props} />,
          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-mckinsey-blue pl-4 italic text-zinc-600 my-4 bg-zinc-50 py-2 pr-2" {...props} />,
          code: ({node, ...props}) => {
             // @ts-ignore
             const {inline, className, children} = props;
             const match = /language-(\w+)/.exec(className || '')
             return !inline ? (
                <code className={cn("block bg-zinc-100 p-3 rounded-md text-sm font-mono overflow-x-auto text-zinc-800 border border-zinc-200", className)} {...props}>
                  {children}
                </code>
              ) : (
                <code className="bg-zinc-100 px-1.5 py-0.5 rounded text-sm font-mono text-mckinsey-blue border border-zinc-200" {...props}>
                  {children}
                </code>
              )
          },
          p: ({node, ...props}) => <p className="text-zinc-700 leading-7 mb-4" {...props} />
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
