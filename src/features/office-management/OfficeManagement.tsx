import { Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import MainLayout from '../../components/main-layout/MainLayout';
import { useTranslation } from 'react-i18next';
import OfficeListItem from '../../components/office-list-item/OfficeListItem';
import { useAppSelector } from '../../store/hooks';
import { selectOffices } from '../../store/office/office-slice';

const OfficeManagement = (): JSX.Element => {
    const { t } = useTranslation();
    const offices = useAppSelector(selectOffices);

    return (
        <MainLayout>
            <Grid2 container spacing={1}>
                <Grid2 xs={12} className="flex-center">
                    <Typography
                        variant="h1"
                        display="flex"
                        justifyContent="center"
                    >
                        {t('management.office_management')}
                    </Typography>
                </Grid2>
                <Grid2 xs={12} className="flex-center">
                    <Typography
                        variant="h3"
                        display="flex"
                        justifyContent="center"
                    ></Typography>
                </Grid2>
                <Grid2 xs={12}>
                    {offices.map((office, i) => (
                        <OfficeListItem office={office} key={i} />
                    ))}
                </Grid2>
            </Grid2>
        </MainLayout>
    );
};

export default OfficeManagement;
