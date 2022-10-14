import { useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';

const LikeIcon = (): JSX.Element => {
    const [isFilled, setIsFilled] = useState(false);
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const toggleFilledIcon = () => setIsFilled(!isFilled);
    return (
        <div className="like">
            <div className="emailRow__options">
                <IconButton onClick={toggleFilledIcon}>
                    {isFilled ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
            </div>
        </div>
    );
};

export default LikeIcon;
