import { List, ListItem, TableBody as MuiTableBody, TableCell, TableRow, Link, alpha } from '@mui/material';
import { useCallback } from 'react';
import { PATHS } from '../../configs';
import { Character } from '../../types';
import { Link as RouterLink } from 'react-router-dom';

type TableBodyProps = {
    charactersList: Array<Character>;
};

const TableBody = ({ charactersList }: TableBodyProps) => {
    const getCharacterNames = useCallback(
        (name: string, aliasesList: Array<string>) =>
            `${name && name}${aliasesList[0] && name ? ', ' : ''}${aliasesList.join(', ')}`,
        [],
    );

    const getCharacterAlive = useCallback((born: string, died: string) => {
        const getYearsInterval = (yearsText: string) => {
            const splitText = yearsText.split(' ');

            const interval = splitText
                .map((string, index) => {
                    if (Number.isInteger(+string)) {
                        const isAfterAegons = splitText[index + 1].includes('AC');
                        return isAfterAegons ? +string : -string;
                    } else {
                        return null;
                    }
                })
                .filter((year) => year);

            return interval as Array<number>;
        };

        const bornInterval = born ? getYearsInterval(born) : [];
        const diedInterval = died ? getYearsInterval(died) : [];

        if (!diedInterval[0] && !bornInterval[0]) {
            return 'Unknown';
        }

        if (!bornInterval[0]) {
            return 'No';
        } else if (!diedInterval[0]) {
            return 'Yes';
        }

        const minBornAge = Math.min(...bornInterval);
        const maxBornAge = Math.max(...bornInterval);

        const minDieAge = Math.min(...diedInterval);
        const maxDieAge = Math.max(...diedInterval);

        const hasYearInaccuracy = minDieAge !== maxDieAge || minBornAge !== maxBornAge;

        const livedYears = hasYearInaccuracy
            ? [maxDieAge - maxBornAge, minDieAge - minBornAge].sort((a, b) => a - b).join(' - ')
            : minDieAge - minBornAge;

        return `No, died at ${livedYears} years old`;
    }, []);

    const getHouseId = useCallback((houseUrl: string) => houseUrl.split('/').pop(), []);

    return (
        <MuiTableBody>
            {charactersList.map((character, index) => (
                <TableRow  sx={(theme) => ({
                    '&:nth-of-type(2n-1)': {
                        background: alpha(theme.palette.primary.main, 0.1),
                    },
                })} key={index}>
                    <TableCell component="th" scope="row">
                        {getCharacterNames(character.name, character.aliases)}
                    </TableCell>
                    <TableCell>{getCharacterAlive(character.born, character.died)}</TableCell>
                    <TableCell>{character.gender}</TableCell>
                    <TableCell>{character.culture ? character.culture : 'Unknown'}</TableCell>
                    <TableCell>
                        {character.allegiances[0] ? (
                            <List>
                                {character.allegiances.map((houseUrl, index) => (
                                    <ListItem key={index} disablePadding>
                                        <Link
                                            underline="hover"
                                            component={RouterLink}
                                            to={`${PATHS.houseDetails}/${getHouseId(houseUrl)}`}
                                        >
                                            House {getHouseId(houseUrl)}
                                        </Link>
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            'No allegiances'
                        )}
                    </TableCell>
                </TableRow>
            ))}
        </MuiTableBody>
    );
};

export default TableBody;
