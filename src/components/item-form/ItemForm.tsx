import { Button, Checkbox, FormLabel, TextField } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AddItemDto } from '../../models/shopping-list/AddItemDto';
import styles from './ItemForm.module.css';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { oneFieldRequired } from '../../utility/validation-helper';
import { ItemDto } from '../../models/shopping-list/ItemDto';
import { useEffect } from 'react';

interface ItemFormProps {
    initialValues?: ItemDto;
    onSubmit?: SubmitHandler<AddItemDto>;
}

const ItemForm = (props: ItemFormProps): JSX.Element => {
    const { t } = useTranslation();
    const { initialValues } = props;

    const defaultValues: Partial<AddItemDto> = initialValues ?? {
        name: '',
        shopName: '',
        url: '',
        comment: '',
    };

    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { isValid },
    } = useForm<AddItemDto>({
        defaultValues,
        mode: 'onChange',
    });

    useEffect(() => {
        reset(defaultValues);
    }, [initialValues]);

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
                <Grid2 xs={initialValues ? 12 : 10}>
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
                {!initialValues && (
                    <Grid2 xs={2} className="flex-center">
                        <Checkbox
                            icon={<FavoriteBorder />}
                            checkedIcon={<Favorite />}
                        />
                    </Grid2>
                )}

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
                        {initialValues
                            ? t('list.edit-item')
                            : t('actions.add_item')}
                    </Button>
                </Grid2>
            </Grid2>
        </form>
    );
};
export default ItemForm;
