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
import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
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
            <Typography component="span" variant="body2">
                {props.children}
            </Typography>
        </li>
    );
};

// Table
const MarkdownTable = (
    props: ComponentPropsWithoutRef<'table'>
): JSX.Element => {
    return (
        <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table" {...props} />
        </TableContainer>
    );
};

const MarkdownTableHead = (
    props: ComponentPropsWithoutRef<'thead'>
): JSX.Element => {
    return <TableHead {...props} />;
};

const MarkdownTableBody = (
    props: ComponentPropsWithoutRef<'tbody'>
): JSX.Element => {
    return <TableBody {...props} />;
};

const MarkdownTableRow = (props: TableRowProps): JSX.Element => {
    const { isHeader, ...rest } = props;
    return <TableRow {...rest} />;
};

const MarkdownTableCell = (props: TableCellProps): JSX.Element => {
    let align: TableCellProps['align'];
    const textAlign = props.style?.textAlign;
    switch (textAlign) {
        case 'left':
            align = 'left';
            break;
        case 'center':
            align = 'center';
            break;
        case 'right':
            align = 'right';
            break;
        default:
            align = undefined;
            break;
    }

    return <TableCell align={align}>{props.children}</TableCell>;
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
};
