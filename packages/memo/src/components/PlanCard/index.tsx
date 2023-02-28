import { Box, Button, Card, CardActions, CardContent, CardHeader, Container, Grid, Typography } from '@mui/material';
import React from 'react'

const PlanCard = ({tier}) => {
    return (
      <React.Fragment>
              <Grid
                item
                key={tier.title}
                xs={12}
                sm={6}
                md={4}
              >
                <Card>
                  <CardHeader
                    title={tier.title}
                    subheader={tier.subheader}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{
                      align: 'center',
                    }}
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                          ? theme.palette.grey[200]
                          : theme.palette.grey[700],
                    }}
                  />
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'baseline',
                        mb: 2,
                      }}
                    >
                      <Typography component="h2" variant="h3" color="text.primary">
                        ${tier.price}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        /month
                      </Typography>
                    </Box>
                    <ul>
                      {tier.description.map((line) => (
                        <Typography
                          component="li"
                          variant="subtitle1"
                          align="left"
                          key={line}
                        >
                          {line}
                        </Typography>
                      ))}
                    </ul>
                    {/* {4 - tier.description.length > 0? <><Typography/><Typography/><Typography/></>: null} */}
                  </CardContent>
                  <CardActions>
                    <Button
                      fullWidth
                      variant={tier.buttonVariant as 'outlined' | 'contained'}
                    >
                      {tier.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
      </React.Fragment>
    );
  }
  
export default PlanCard;