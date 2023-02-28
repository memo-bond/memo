import { Container, Grid, Typography } from '@mui/material';
import PlanCard from 'components/PlanCard';
import React from 'react'

const tiers = [
    {
        title: 'Free',
        price: '0',
        description: [
            'Only Public Memos'
        ],
        buttonText: 'Your Plan',
        buttonVariant: 'outlined',
    },
    {
        title: 'Pro',
        subheader: 'Most popular',
        price: '15',
        description: [
            'Public & Private Memos',
            'Team support',
            'Space support',
            'Help center access'
        ],
        buttonText: 'Get started',
        buttonVariant: 'contained',
    }
];

function SubscriptionSettingSection() {
    return (
        <>
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Pricing
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" component="p">
                    Choose your plan to get best support from us.
                </Typography>
            </Container>
            {/* End hero unit */}
            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end" justifyContent="center">
                    {tiers.map((tier, index) => (<PlanCard key={tier.title} tier={tier} />))}
                </Grid>
            </Container>
        </>
    )
}

export default SubscriptionSettingSection