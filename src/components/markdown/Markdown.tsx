import ReactMarkdown from 'react-markdown';
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
            skipHtml
        >
            {children}
        </ReactMarkdown>
    ) : null;
};

export default Markdown;
