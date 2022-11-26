import { Button, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import MainLayout from '../../components/main-layout/MainLayout';
import { useTranslation } from 'react-i18next';
import OfficeListItem from '../../components/office-list-item/OfficeListItem';
import { useAppSelector } from '../../store/hooks';
import { Add } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import OfficeNameDialog from '../../components/office-name-popup/OfficeNameDialog';
import { selectOffices } from '../../store/office/office-slice';
import styles from './OfficeManagement.module.css';
import { OfficeDto } from '../../models/office/OfficeDto';
import Search from '../../components/search/Search';

const OfficeManagement = (): JSX.Element => {
    const offices = useAppSelector(selectOffices);
    const { t } = useTranslation();
    const [isNameDialogOpen, setNameDialogOpen] = useState<boolean>(false);

    const [searchString, setSearchString] = useState<string>('');
    const [filteredOffices, setFilteredOffices] = useState<OfficeDto[]>([]);

    useEffect(() => {
        let filteredOffices = [...offices];

        if (searchString) {
            const lowerCaseSearch = searchString.toLowerCase();
            filteredOffices = filteredOffices.filter((it) =>
                `${it.name}`.toLowerCase().includes(lowerCaseSearch)
            );
        }

        setFilteredOffices(filteredOffices);
    }, [searchString, offices]);

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
                    <Grid2 xs={12} md={8} className={styles.searchFilter}>
                        <Search
                            value={searchString}
                            onChange={(e) => setSearchString(e.target.value)}
                            fullWidth
                        />
                    </Grid2>
                    <Grid2
                        xs={12}
                        md={4}
                        className="flex-center"
                        sx={{
                            marginTop: '1rem',
                            marginBottom: '1rem',
                            display: 'flex',
                            justifyContent: { xs: 'center', md: 'flex-end' },
                        }}
                    >
                        <Button
                            startIcon={<Add />}
                            variant="contained"
                            onClick={() => setNameDialogOpen(true)}
                        >
                            {t('actions.add_new_office')}
                        </Button>
                    </Grid2>
                    <Grid2 xs={12}>
                        {filteredOffices.map((office, i) => (
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
