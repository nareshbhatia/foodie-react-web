import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { HorizontalContainer } from '@nareshbhatia/react-force';
import Rating from '@material-ui/lab/Rating';
import { RestaurantQuery_search_business } from '../../queries';

const useStyles = makeStyles((theme: Theme) => ({
    card: {
        display: 'flex'
    },
    content: {
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
    rating: {
        marginRight: theme.spacing(1)
    }
}));

interface RestaurantCardProps {
    business: RestaurantQuery_search_business;
    onItemClicked: (itemId: string) => void;
}

export const RestaurantCard = ({
    business,
    onItemClicked
}: RestaurantCardProps) => {
    const classes = useStyles();
    const {
        id,
        name,
        categories,
        photos,
        price,
        rating,
        review_count,
        reviews
    } = business;
    if (!id || !name) {
        return null;
    }

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

    const review = reviews && reviews[0] ? reviews[0].text : '';

    const handleClick = () => {
        onItemClicked(id);
    };

    // Don't use CardMedia - it forces 100% width
    return (
        <Card className={classes.card} onClick={handleClick}>
            <img className={classes.img} src={photo} alt={name} title={name} />
            <CardContent className={classes.content}>
                <Typography variant="h6" component="h2">
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
                <Typography gutterBottom variant="body2" color="textSecondary">
                    {priceString}
                    {separator}
                    {categoriesStr}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {review}
                </Typography>
            </CardContent>
        </Card>
    );
};
