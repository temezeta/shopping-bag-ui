import { Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface LinkTabProps {
    label: string;
    to: string;
}

const LinkTab = (props: LinkTabProps): JSX.Element => {
    const navigate = useNavigate();
    return (
        <Tab
            component="a"
            onClick={(
                event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
            ) => {
                event.preventDefault();
                navigate(props.to);
            }}
            {...props}
        />
    );
};

export default LinkTab;
