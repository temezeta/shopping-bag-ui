import { Button, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import MainLayout from '../../components/main-layout/MainLayout';
import { useTranslation } from 'react-i18next';
import OfficeListItem from '../../components/office-list-item/OfficeListItem';
import { useAppSelector } from '../../store/hooks';
import { Add } from '@mui/icons-material';
import { useState } from 'react';
import OfficeNameDialog from '../../components/office-name-popup/OfficeNameDialog';
import { selectOffices } from '../../store/office/office-slice';

const OfficeManagement = (): JSX.Element => {
    const offices = useAppSelector(selectOffices);
    const { t } = useTranslation();
    const [isNameDialogOpen, setNameDialogOpen] = useState<boolean>(false);

    return (
        <>
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
                    <Grid2
                        xs={12}
                        className="flex-center"
                        sx={{ marginTop: '2rem' }}
                    >
                        <Button
                            startIcon={<Add />}
                            variant="contained"
                            onClick={() => setNameDialogOpen(true)}
                        >
                            {t('actions.add_new_office')}
                        </Button>
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
            <OfficeNameDialog
                open={isNameDialogOpen}
                closeDialog={() => setNameDialogOpen(false)}
                title={t('actions.add_new_office')}
            ></OfficeNameDialog>
        </>
    );
};

export default OfficeManagement;
