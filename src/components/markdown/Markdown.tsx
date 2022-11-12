import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MarkdownComponents } from './MarkdownComponents';

interface MarkdownProps {
    children?: string;
}

const Markdown = (props: MarkdownProps): JSX.Element | null => {
    const { children } = props;
    return children ? (
        <ReactMarkdown
            className="full-width"
            components={MarkdownComponents}
            remarkPlugins={[remarkGfm]}
            linkTarget="_blank"
            skipHtml
        >
            {children}
        </ReactMarkdown>
    ) : null;
};

export default Markdown;
