import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

export const LoadingCard = () => (
    <Card>
        <CardContent>
            <Typography variant="h6" component="h2">
                Loading
            </Typography>
        </CardContent>
    </Card>
);
