import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import { BusinessQuery_business_reviews } from '../../queries';

const useStyles = makeStyles((theme: Theme) => ({
    card: {
        display: 'flex',
        height: 150
    },
    content: {
        flex: 1,
        padding: '0 16px',
        '&:last-child': {
            paddingBottom: 0
        }
    },
    img: {
        width: 150,
        height: 150,
        minWidth: 150,
        minHeight: 150,
        objectFit: 'cover'
    },
    name: {
        flex: 1
    },
    rating: {
        marginRight: theme.spacing(1)
    }
}));

interface ReviewCardProps {
    review: BusinessQuery_business_reviews;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
    const classes = useStyles();

    const { text, rating, time_created, user } = review;

    return (
        <Card className={classes.card}>
            {user && user.image_url && (
                <img
                    className={classes.img}
                    src={user.image_url}
                    alt={user.name || 'photo'}
                />
            )}
            <CardContent className={classes.content}>
                {user && user.name && (
                    <Typography
                        className={classes.name}
                        variant="h6"
                        component="h1"
                    >
                        {user.name}
                    </Typography>
                )}
                <Rating
                    className={classes.rating}
                    name="reviewRating"
                    value={rating}
                    precision={0.5}
                    size="small"
                    readOnly
                />
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    {time_created}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {text}
                </Typography>
            </CardContent>
        </Card>
    );
};
