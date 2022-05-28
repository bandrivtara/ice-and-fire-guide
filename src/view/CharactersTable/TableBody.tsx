import { List, ListItem, TableBody, TableCell, TableRow } from '@mui/material';
import { useCallback } from 'react';
import { Character } from '../../types';

type CharactersTableBodyProps = {
    charactersList: Array<Character>;
};

const CharactersTableBody = ({ charactersList }: CharactersTableBodyProps) => {
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
        <TableBody>
            {charactersList.map((character, index) => (
                <TableRow key={index}>
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
                                        House {getHouseId(houseUrl)}
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            'No allegiances'
                        )}
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};

export default CharactersTableBody;
