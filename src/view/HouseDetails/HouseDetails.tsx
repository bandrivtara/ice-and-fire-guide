import { Box, Button, Card, CardContent, List, ListItem, Typography, alpha } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { API_ENDPOINTS, BASE_URL, PATHS } from '../../configs';
import { useEffect, useState, useCallback } from 'react';
import { House } from '../../types';
import axios from 'axios';

const HouseDetails = () => {
    const { houseId } = useParams();
    const [houseDetails, setHouseDetails] = useState<House | null>(null);

    useEffect(() => {
        const getHouseDetails = async () => {
            const res = await axios.get(`${BASE_URL}${API_ENDPOINTS.houseDetails}/${houseId}`);
            setHouseDetails(res.data);
            console.log(res.data);
        };
        getHouseDetails();

        return (()=> {
            setHouseDetails(null)
        })
    }, [houseId]);

    const getHouseDetails = useCallback(() => {
        return [
            {
                label: 'Region',
                value: houseDetails?.region,
            },
            {
                label: 'Coat of Arms',
                value: houseDetails?.coatOfArms,
            },
            {
                label: 'Words',
                value: houseDetails?.words,
            },
            {
                label: 'Titles',
                value: houseDetails?.titles,
                isArray: true,
            },
            {
                label: 'Seats',
                value: houseDetails?.seats,
                isArray: true,
            },
            {
                label: 'Has died out',
                value: houseDetails?.diedOut ? 'Yes' : 'No',
            },
            {
                label: 'Has overlord',
                value: houseDetails?.overlord ? 'Yes' : 'No',
            },
            {
                label: 'Number of Cadet Branches',
                value: houseDetails?.cadetBranches.length,
            },
        ];
    }, [houseDetails]);

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    padding: 2,
                }}
            >
                <Typography variant="h1" sx={{ fontSize: 26 }}>
                    <Box component="i" sx={{ color: 'primary.main' }}>
                        {houseDetails && houseDetails.name}
                    </Box>
                </Typography>
                <Button
                    component={RouterLink}
                    to={PATHS.charactersList}
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                >
                    Back to list
                </Button>
            </Box>
            <Card>
                <CardContent sx={{ p: 0 }}>
                    {getHouseDetails().map((house, index) => (
                        <Box
                            key={index}
                            sx={(theme) => ({
                                display: 'flex',
                                justifyContent: 'space-between',
                                px: 2, py: 1,
                                '&:nth-of-type(2n-1)': {
                                    background: alpha(theme.palette.primary.main, 0.1),
                                },
                            })}
                        >
                            <Typography>{house.label}</Typography>
                            {house.isArray ? (
                                <List>
                                    {house.value?.map((value, index) => (
                                        <ListItem
                                            sx={{ display: 'flex', justifyContent: 'end' }}
                                            disablePadding
                                            key={index}
                                        >
                                            <Typography>{value}</Typography>
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                <Typography>{house.value}</Typography>
                            )}
                        </Box>
                    ))}
                </CardContent>
            </Card>
        </>
    );
};

export default HouseDetails;
