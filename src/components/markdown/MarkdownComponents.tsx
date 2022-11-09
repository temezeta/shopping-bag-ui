import {
    Typography,
    TypographyProps,
    Paper,
    Table,
    TableCell,
    TableRow,
    TableBody,
    TableHead,
    TableContainer,
} from '@mui/material';
import { ElementType, HTMLProps, ReactNode } from 'react';
import {
    HeadingProps,
    LiProps,
    TableCellProps,
    TableRowProps,
} from 'react-markdown/lib/ast-to-react';
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown';

// Headings
const MarkdownHeading = (props: HeadingProps): JSX.Element => {
    let variant: TypographyProps['variant'];
    switch (props.level) {
        case 1:
            variant = 'h1';
            break;
        case 2:
            variant = 'h2';
            break;
        case 3:
            variant = 'h3';
            break;
        case 4:
            variant = 'subtitle1';
            break;
        case 5:
            variant = 'subtitle2';
            break;
        default:
            variant = 'body2';
            break;
    }
    return <Typography variant={variant}>{props.children}</Typography>;
};

// List item
const MarkdownListItem = (props: LiProps): JSX.Element => {
    return (
        <li>
            <Typography component="span">{props.children}</Typography>
        </li>
    );
};

// Table
const MarkdownTable = (props: { children: ReactNode }): JSX.Element => {
    return (
        <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
                {props.children}
            </Table>
        </TableContainer>
    );
};

const MarkdownTableHead = (props: { children: ReactNode }): JSX.Element => {
    return <TableHead>{props.children}</TableHead>;
};

const MarkdownTableBody = (props: { children: ReactNode }): JSX.Element => {
    return <TableBody>{props.children}</TableBody>;
};

const MarkdownTableRow = (props: TableRowProps): JSX.Element => {
    return <TableRow>{props.children}</TableRow>;
};

const MarkdownTableCell = (props: TableCellProps): JSX.Element => {
    return (
        <TableCell>
            <Typography>{props.children}</Typography>
        </TableCell>
    );
};

// Other
const MarkdownTypography = (
    props: { children: ReactNode },
    component: ElementType<any>,
    variant?: TypographyProps['variant']
): JSX.Element => {
    return (
        <Typography component={component} variant={variant}>
            {props.children}
        </Typography>
    );
};

const MarkdownLink = (props: HTMLProps<HTMLAnchorElement>): JSX.Element => {
    return <a target="_blank" {...props} />;
};

export const MarkdownComponents: ReactMarkdownOptions['components'] = {
    /** Headings */
    h1: (props) => MarkdownHeading(props),
    h2: (props) => MarkdownHeading(props),
    h3: (props) => MarkdownHeading(props),
    h4: (props) => MarkdownHeading(props),
    h5: (props) => MarkdownHeading(props),
    h6: (props) => MarkdownHeading(props),
    /** List */
    li: (props) => MarkdownListItem(props),
    /** Table */
    table: (props) => MarkdownTable(props),
    thead: (props) => MarkdownTableHead(props),
    tbody: (props) => MarkdownTableBody(props),
    tr: (props) => MarkdownTableRow(props),
    td: (props) => MarkdownTableCell(props),
    th: (props) => MarkdownTableCell(props),
    /** Other */
    p: (props) => MarkdownTypography(props, 'p', 'body2'),
    em: (props) => MarkdownTypography(props, 'em'),
    a: (props) => MarkdownLink(props),
};
