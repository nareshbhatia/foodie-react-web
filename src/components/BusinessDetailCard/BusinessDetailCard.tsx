import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import { HorizontalContainer } from '@nareshbhatia/react-force';
import { BusinessQuery_business } from '../../queries';

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

interface BusinessDetailCardProps {
    business: BusinessQuery_business;
}

export const BusinessDetailCard = ({ business }: BusinessDetailCardProps) => {
    const classes = useStyles();

    if (!business.name) return null;

    const {
        name,
        display_phone,
        categories,
        location,
        photos,
        price,
        rating,
        review_count
    } = business;

    const photo =
        photos && photos[0]
            ? photos[0]
            : 'https://source.unsplash.com/zeFy-oCUhV8/150x150';

    const priceString = price ? price : '';

    const categoriesStr = categories
        ? categories
              .map(category => (category ? category.title : null))
              .join(', ')
        : '';
    const separator =
        priceString.length > 0 && categoriesStr.length > 0 ? ' • ' : '';

    return (
        <Card className={classes.card}>
            <img className={classes.img} src={photo} alt={name} title={name} />
            <CardContent className={classes.content}>
                <Typography
                    className={classes.name}
                    variant="h6"
                    component="h1"
                >
                    {name}
                </Typography>
                <HorizontalContainer>
                    <Rating
                        className={classes.rating}
                        name="rating"
                        value={rating}
                        precision={0.5}
                        size="small"
                        readOnly
                    />
                    <Typography
                        gutterBottom
                        variant="body2"
                        color="textSecondary"
                    >
                        {review_count}
                    </Typography>
                </HorizontalContainer>
                <Typography variant="body2" color="textSecondary">
                    {priceString}
                    {separator}
                    {categoriesStr}
                </Typography>
                {location && location.address1 && (
                    <Typography variant="body2" color="textSecondary">
                        {location.address1}
                    </Typography>
                )}
                {location && location.address2 && (
                    <Typography variant="body2" color="textSecondary">
                        {location.address2}
                    </Typography>
                )}
                {location && location.city && (
                    <Typography variant="body2" color="textSecondary">
                        {location.city} {location.state} {location.postal_code}
                    </Typography>
                )}
                <Typography variant="body2" color="textSecondary">
                    {display_phone}
                </Typography>
            </CardContent>
        </Card>
    );
};
