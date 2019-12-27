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
    { id: 'rating', name: 'Rating' },
    { id: 'review_count', name: 'Review Count' },
    { id: 'distance', name: 'Distance' }
];

const PriceFilterOptions = [
    { id: '1', name: '$' },
    { id: '2', name: '$$' },
    { id: '3', name: '$$$' },
    { id: '4', name: '$$$$' }
];

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        padding: '2px 8px',
        display: 'flex'
    },
    formControl: {
        minWidth: 120,
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
    const { sortBy, openNow, priceFilter } = searchState;

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
            </FormControl>
        </Paper>
    );
};
