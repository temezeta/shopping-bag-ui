import { Box, Button, Checkbox, FormLabel, TextField } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AddItemDto } from '../../models/shopping-list/AddItemDto';
import styles from './ItemForm.module.css';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { isUrl, oneFieldRequired } from '../../utility/validation-helper';
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
        like: true,
    };

    const {
        control,
        handleSubmit,
        reset,
        trigger,
        watch,
        formState: { isValid, errors },
    } = useForm<AddItemDto>({
        defaultValues,
        mode: 'onChange',
    });

    const watchNameAndUrl = watch(['name', 'url']);

    useEffect(() => {
        reset(defaultValues);
    }, [initialValues]);

    useEffect(() => {
        void trigger(['name', 'url']);
    }, [watchNameAndUrl[0], watchNameAndUrl[1]]);

    const onSubmit: SubmitHandler<AddItemDto> = (data) => {
        props.onSubmit?.(data);
    };
    return (
        <form
            id="Add-Item-Form"
            className={styles.addItem}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Grid2 container spacing={2}>
                <Grid2 xs={12}>
                    <Box className={styles.nameLabel}>
                        <FormLabel className={styles.label} id="item_name">
                            {t('item.name')}
                        </FormLabel>
                        {!initialValues && (
                            <Controller
                                name="like"
                                control={control}
                                render={({ field }) => (
                                    <Checkbox
                                        {...field}
                                        color="info"
                                        icon={<FavoriteBorder />}
                                        checkedIcon={<Favorite />}
                                        defaultChecked={true}
                                    />
                                )}
                            />
                        )}
                    </Box>
                    <Controller
                        name="name"
                        control={control}
                        rules={{
                            validate: {
                                validName: (value?: string) =>
                                    oneFieldRequired(
                                        value,
                                        watchNameAndUrl[1]
                                    ) || t('errors.one_value_required'),
                            },
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                error={!!errors.name}
                                aria-labelledby="item_name"
                                helperText={errors.name?.message}
                                size="small"
                                fullWidth
                            />
                        )}
                    />
                </Grid2>

                <Grid2 xs={12}>
                    <FormLabel className={styles.label} id="shopName">
                        {t('item.shopName')}
                    </FormLabel>
                    <Controller
                        name="shopName"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                error={!!errors.shopName}
                                aria-labelledby="shopName"
                                helperText={errors.shopName?.message}
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
                                    ) || t('errors.one_value_required'),
                                isUrl: (value?: string) =>
                                    !value ||
                                    isUrl(value) ||
                                    t('errors.url_not_valid'),
                            },
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                type="url"
                                error={!!errors.url}
                                aria-labelledby="url"
                                helperText={errors.url?.message}
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
                                error={!!errors.comment}
                                aria-labelledby="comment"
                                helperText={errors.comment?.message}
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
