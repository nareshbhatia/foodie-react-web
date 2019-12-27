import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { SearchAction, SearchState } from '../../reducers';

const SortByOptions = [
    { id: 'best_match', name: 'Best Match' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'review_count', name: 'Most Reviewed' },
    { id: 'distance', name: 'Distance' }
];

const PriceFilterOptions = [
    { id: '1', name: '$' },
    { id: '2', name: '$$' },
    { id: '3', name: '$$$' },
    { id: '4', name: '$$$$' }
];

const CategoryOptions = [
    { id: 'bars', name: 'Bars' },
    { id: 'breakfast_brunch', name: 'Breakfast & Brunch' },
    { id: 'grocery', name: 'Grocery' },
    { id: 'restaurants', name: 'Restaurants' },
    { id: 'vegetarian', name: 'Vegetarian' }
];

const AttributeOptions = [
    { id: 'hot_and_new', name: 'Hot & New' },
    { id: 'waitlist_reservation', name: 'Reservations' }
];

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        padding: '2px 8px',
        display: 'flex'
    },
    formControl: {
        '&:not(:first-child)': {
            marginLeft: theme.spacing(4)
        }
    }
}));

interface FilterPanelProps {
    searchState: SearchState;
    searchDispatch: React.Dispatch<SearchAction>;
}

export const FilterPanel = ({
    searchState,
    searchDispatch
}: FilterPanelProps) => {
    const classes = useStyles();
    const {
        sortBy,
        attributeFilter,
        categoryFilter,
        openNow,
        priceFilter
    } = searchState;

    const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        searchDispatch({
            type: 'SET_SORT_BY',
            sortBy: event.target.value as string
        });
    };

    const handlePriceChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        checked: boolean
    ) => {
        searchDispatch({
            type: 'SET_PRICE_FILTER',
            key: event.target.value,
            value: checked
        });
    };

    const handleCategoryChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        checked: boolean
    ) => {
        searchDispatch({
            type: 'SET_CATEGORY_FILTER',
            key: event.target.value,
            value: checked
        });
    };

    const handleAttributeChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        checked: boolean
    ) => {
        searchDispatch({
            type: 'SET_ATTRIBUTE_FILTER',
            key: event.target.value,
            value: checked
        });
    };

    const toggleOpenNow = () => {
        searchDispatch({
            type: 'TOGGLE_OPEN_NOW'
        });
    };

    return (
        <Paper className={classes.root} square>
            <FormControl className={classes.formControl}>
                <InputLabel id="sort-by-label">Sort By</InputLabel>
                <Select
                    labelId="sort-by-label"
                    id="sort-by"
                    value={sortBy}
                    onChange={handleSortChange}
                >
                    {SortByOptions.map(option => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Price</FormLabel>
                <FormGroup>
                    {PriceFilterOptions.map(option => (
                        <FormControlLabel
                            key={option.id}
                            control={
                                <Checkbox
                                    color="primary"
                                    value={option.id}
                                    checked={priceFilter[option.id]}
                                    onChange={handlePriceChange}
                                />
                            }
                            label={option.name}
                        />
                    ))}
                </FormGroup>
            </FormControl>

            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Features</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                color="primary"
                                value="openNow"
                                checked={openNow}
                                onChange={toggleOpenNow}
                            />
                        }
                        label="Open Now"
                    />
                    {AttributeOptions.map(option => (
                        <FormControlLabel
                            key={option.id}
                            control={
                                <Checkbox
                                    color="primary"
                                    value={option.id}
                                    checked={attributeFilter[option.id]}
                                    onChange={handleAttributeChange}
                                />
                            }
                            label={option.name}
                        />
                    ))}
                </FormGroup>
            </FormControl>

            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Categories</FormLabel>
                <FormGroup>
                    {CategoryOptions.map(option => (
                        <FormControlLabel
                            key={option.id}
                            control={
                                <Checkbox
                                    color="primary"
                                    value={option.id}
                                    checked={categoryFilter[option.id]}
                                    onChange={handleCategoryChange}
                                />
                            }
                            label={option.name}
                        />
                    ))}
                </FormGroup>
            </FormControl>
        </Paper>
    );
};
