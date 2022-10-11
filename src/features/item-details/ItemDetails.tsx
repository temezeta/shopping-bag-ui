import { Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import MainLayout from '../../components/main-layout/MainLayout';

const ItemDetails = (): JSX.Element => {
    return (
        <MainLayout>
            <Grid2 container spacing={1}>
                <Grid2 xs={12} className="flex-center">
                    <Typography
                        variant="h1"
                        display="flex"
                        justifyContent="center"
                    >
                        Content
                    </Typography>
                </Grid2>
            </Grid2>
        </MainLayout>
    );
};

export default ItemDetails;
