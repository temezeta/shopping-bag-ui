import { Button, Checkbox, FormLabel, TextField } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AddItemDto } from '../../models/lists/AddItemDto';
import styles from './AddItemForm.module.css';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { oneFieldRequired } from '../../utility/validation-helper';

interface AddItemFormProps {
    onSubmit?: SubmitHandler<AddItemDto>;
}

const AddItemForm = (props: AddItemFormProps): JSX.Element => {
    const { t } = useTranslation();
    const {
        control,
        handleSubmit,
        watch,
        formState: { isValid },
    } = useForm<AddItemDto>({
        defaultValues: {
            name: '',
            shopName: '',
            url: '',
            comment: '',
        },
        mode: 'onChange',
    });
    const onSubmit: SubmitHandler<AddItemDto> = (data) => {
        props.onSubmit?.(data);
    };
    const watchNameAndUrl = watch(['name', 'url']);

    return (
        <form
            id="Add-Item-Form"
            className={styles.addItem}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Grid2 container spacing={2}>
                <Grid2 xs={10}>
                    <FormLabel className={styles.label} id="item_name">
                        {t('item.name')}
                    </FormLabel>
                    <Controller
                        name="name"
                        control={control}
                        rules={{
                            validate: {
                                validName: (value?: string) =>
                                    oneFieldRequired(
                                        value,
                                        watchNameAndUrl[1]
                                    ) || t('errors.required'),
                            },
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                aria-labelledby="item_name"
                                size="small"
                                fullWidth
                            />
                        )}
                    />
                </Grid2>
                <Grid2 xs={2} className="flex-center">
                    <Checkbox
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                    />
                </Grid2>

                <Grid2 xs={12}>
                    <FormLabel className={styles.label} id="shopName ">
                        {t('item.shopName')}
                    </FormLabel>
                    <Controller
                        name="shopName"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                aria-labelledby="shopName "
                                size="small"
                                fullWidth
                            />
                        )}
                    />
                </Grid2>
                <Grid2 xs={12}>
                    <FormLabel className={styles.label} id="url">
                        {t('item.url')}
                    </FormLabel>
                    <Controller
                        name="url"
                        control={control}
                        rules={{
                            validate: {
                                validUrl: (value?: string) =>
                                    oneFieldRequired(
                                        value,
                                        watchNameAndUrl[0]
                                    ) || t('errors.required'),
                            },
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                aria-labelledby="url"
                                size="small"
                                fullWidth
                            />
                        )}
                    />
                </Grid2>
                <Grid2 xs={12}>
                    <FormLabel className={styles.label} id="comment">
                        {t('item.comment')}
                    </FormLabel>
                    <Controller
                        name="comment"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                aria-labelledby="comment"
                                size="small"
                                fullWidth
                            />
                        )}
                    />
                </Grid2>
                <Grid2 xs={12}>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={!isValid}
                        fullWidth
                    >
                        {t('actions.add_item')}
                    </Button>
                </Grid2>
            </Grid2>
        </form>
    );
};
export default AddItemForm;
