import { Button, FormLabel, TextField } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AddItemDto } from '../../models/auth/AddItemDto';
import styles from './AddItemForm.module.css';
import LikeIcon from '../icons/LikeIcon';

interface AddItemFormProps {
    onSubmit?: SubmitHandler<AddItemDto>;
}

const AddItemForm = (props: AddItemFormProps): JSX.Element => {
    const { t } = useTranslation();
    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm<AddItemDto>({
        defaultValues: {
            name: '',
            store: '',
            url: undefined,
            comment: '',
        },
        mode: 'onChange',
    });
    const onSubmit: SubmitHandler<AddItemDto> = (data) => {
        props.onSubmit?.(data);
    };

    // The labels are of a size too small idk why
    return (
        <Grid2 container spacing={2}>
            <form
                id="Add-Item-Form"
                className={styles.addItem}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Grid2 md={1} xs={10}>
                    <FormLabel className={styles.label} id="item_name">
                        {t('item.name')}
                    </FormLabel>
                    <Controller
                        name="name"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: t('errors.required'),
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
                <Grid2 md={2} xs={2} className="flex-center">
                    <LikeIcon></LikeIcon>
                </Grid2>
                <Grid2 xs={12}>
                    <FormLabel className={styles.label} id="store">
                        {t('item.store')}
                    </FormLabel>
                    <Controller
                        name="store"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: t('errors.required'),
                            },
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                aria-labelledby="store"
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
                            required: {
                                value: true,
                                message: t('errors.required'),
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
            </form>
        </Grid2>
    );
};
export default AddItemForm;
