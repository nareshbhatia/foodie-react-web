import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { Form, Formik } from 'formik';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';
import * as yup from 'yup';
import { SearchAction, SearchState } from '../../reducers';
import { TextField } from '../Form';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        padding: '2px 8px',
        display: 'flex',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        '&:not(:first-child)': {
            marginLeft: '4px'
        }
    },
    divider: {
        height: 28,
        margin: 4
    }
}));

interface SearchBarProps {
    searchState: SearchState;
    searchDispatch: React.Dispatch<SearchAction>;
}

export const SearchBar = ({ searchState, searchDispatch }: SearchBarProps) => {
    const classes = useStyles();
    const validationSchema = yup.object().shape({
        location: yup.string().required()
    });

    return (
        <Formik
            initialValues={searchState}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
                searchDispatch({
                    type: 'SET_SEARCH_STATE',
                    term: values.term,
                    location: values.location
                });
                actions.setSubmitting(false);
            }}
        >
            {() => (
                <Form>
                    <Paper className={classes.root} square>
                        <TextField
                            className={classes.input}
                            name="term"
                            placeholder="tacos, cheap dinner, Max's"
                            inputProps={{ 'aria-label': 'search term' }}
                        />

                        <Divider
                            className={classes.divider}
                            orientation="vertical"
                        />

                        <TextField
                            className={classes.input}
                            name="location"
                            placeholder="address, neighborhood, city, state, zip"
                            inputProps={{ 'aria-label': 'search location' }}
                        />

                        <Divider
                            className={classes.divider}
                            orientation="vertical"
                        />

                        <IconButton
                            color="primary"
                            aria-label="search"
                            type="submit"
                        >
                            <SearchIcon />
                        </IconButton>

                        <Divider
                            className={classes.divider}
                            orientation="vertical"
                        />

                        <IconButton aria-label="expand">
                            <ExpandMoreIcon />
                        </IconButton>
                    </Paper>
                </Form>
            )}
        </Formik>
    );
};
