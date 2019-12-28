import React, { useContext } from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import {
    HorizontalContainer,
    VerticalContainer
} from '@nareshbhatia/react-force';
import Rating from '@material-ui/lab/Rating';
import numeral from 'numeral';
import { RootStoreContext } from '../../contexts';
import { RestaurantQuery_search_business } from '../../queries';

const METER_TO_FEET = 3.28084;
const METER_TO_MILES = 0.000621371;

const useStyles = makeStyles((theme: Theme) => ({
    card: {
        display: 'flex',
        height: 150,
        cursor: 'pointer'
    },
    content: {
        flex: 1,
        padding: '0 16px',
        '&:last-child': {
            paddingBottom: 0
        }
    },
    smallText: {
        fontSize: '0.75rem'
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
    },
    location: {
        display: 'none',
        '@media (min-width: 580px)': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            marginTop: '4px'
        }
    },
    locationBottom: {
        display: 'block',
        '@media (min-width: 580px)': {
            display: 'none'
        }
    },
    review: {
        display: 'none',
        '@media (min-width: 580px)': {
            display: 'block',
            marginTop: '6px'
        }
    }
}));

interface RestaurantCardProps {
    restaurant: RestaurantQuery_search_business;
    onItemClicked: (itemId: string) => void;
}

export const RestaurantCard = ({
    restaurant,
    onItemClicked
}: RestaurantCardProps) => {
    const classes = useStyles();
    const rootStore = useContext(RootStoreContext);
    const { routerStore } = rootStore;

    const {
        id,
        name,
        categories,
        distance,
        location,
        photos,
        price,
        rating,
        review_count,
        reviews
    } = restaurant;
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

    let distanceString = '';
    if (distance) {
        const feet = distance * METER_TO_FEET;
        const miles = distance * METER_TO_MILES;
        distanceString =
            feet < 1000
                ? `${numeral(feet).format('0')} ft`
                : miles < 10
                ? `${numeral(miles).format('0.0')} mi`
                : `${numeral(miles).format('0')} mi`;
    }

    const review = reviews && reviews[0] ? reviews[0].text : '';

    const handleClick = () => {
        routerStore.goTo('business', { id });
    };

    // Don't use CardMedia - it forces 100% width
    return (
        <Card className={classes.card} onClick={handleClick}>
            <img className={classes.img} src={photo} alt={name} title={name} />
            <CardContent className={classes.content}>
                <HorizontalContainer>
                    <VerticalContainer>
                        <Typography
                            className={classes.name}
                            variant="h6"
                            component="h2"
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
                        <div className={classes.locationBottom}>
                            {location && location.city && (
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    {location.city}
                                </Typography>
                            )}
                            <Typography variant="body2" color="textSecondary">
                                {distanceString}
                            </Typography>
                        </div>
                    </VerticalContainer>

                    <div className={classes.location}>
                        {location && location.city && (
                            <Typography
                                className={classes.smallText}
                                color="textSecondary"
                            >
                                {location.city}
                            </Typography>
                        )}
                        <Typography
                            className={classes.smallText}
                            color="textSecondary"
                        >
                            {distanceString}
                        </Typography>
                    </div>
                </HorizontalContainer>

                <Typography
                    className={classes.review}
                    variant="body2"
                    color="textSecondary"
                >
                    {review}
                </Typography>
            </CardContent>
        </Card>
    );
};
