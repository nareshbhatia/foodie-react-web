import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { BusinessQuery_business_hours } from '../../queries';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const day2str = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const useStyles = makeStyles((theme: Theme) => ({
    '@global': {
        'table.hours': {
            lineHeight: 1.2
        },
        'table.hours th': {
            textAlign: 'left',
            width: 50
        },
        'table.hours td': {
            textAlign: 'right',
            width: 40
        }
    },
    subtitle: {
        fontWeight: theme.typography.fontWeightMedium
    }
}));

interface BusinessHoursProps {
    hours: (BusinessQuery_business_hours | null)[];
}

export const BusinessHours = ({ hours }: BusinessHoursProps) => {
    const classes = useStyles();

    // Create hour table
    let hoursTable = '';

    if (hours) {
        hours.forEach(hour => {
            if (hour && hour.open) {
                hour.open.forEach(open => {
                    if (open) {
                        const { day, start, end } = open;
                        hoursTable += `
<tr>
  <th>${day !== null ? day2str[day] : ''}</th>
  <td>${start}</td>
  <td>${end}</td>
</tr>
`;
                    }
                });
            }
        });
    }

    if (hoursTable.length === 0) {
        return null;
    }

    hoursTable = `<table class="hours">${hoursTable}</table>`;

    return (
        <Box mt={2}>
            <Typography
                variant="subtitle1"
                component="h2"
                className={classes.subtitle}
            >
                Hours
            </Typography>
            <Box dangerouslySetInnerHTML={{ __html: hoursTable }} />
        </Box>
    );
};
