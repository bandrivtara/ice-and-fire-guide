import { List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Select, MenuItem, SelectChangeEvent, InputLabel } from '@mui/material';
import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { Character } from '../../types';

const CharactersTable = () => {
    const [charactersList, setCharactersList] = useState<Array<Character>>([])
    const [filter, setFilter] = useState({ gender: '', culture: '' })

    useEffect(() => {
        const getCharactersList = async () => {
            const res = await axios.get('https://anapioficeandfire.com/api/characters');
            setCharactersList(res.data)
        }

        getCharactersList()
    }, [])

    const getCharacterNames = useCallback((name: string, aliasesList: Array<string>) =>
        `${name && name + ', '}${aliasesList.join(', ')}`, [])

    const getCharacterAlive = useCallback((born: string, died: string) => {
        if (!died && !born) {
            return 'Unknown'
        }

        if (!born) {
            return 'No'
        } else if (!died) {
            return 'Yes'
        }


        // TO DO
        return 'Died in'

    }, [])

    const getHouseId = useCallback((houseUrl: string) =>
        houseUrl.split('/').pop(), []);

    const handleGenderFilter = (event: SelectChangeEvent) => {
        setFilter({ ...filter, gender: event.target.value as string })
    }

    return (
        <Paper>
            <Box sx={{ padding: 2, display: 'flex', justifyContent: 'end' }}>
                <Select
                    variant='standard'
                    sx={{ 'minWidth': '200px' }}
                    value={filter.gender}
                    onChange={handleGenderFilter}
                    displayEmpty
                >
                    <MenuItem value=''>Any</MenuItem>
                    <MenuItem value='male'>Male</MenuItem>
                    <MenuItem value='female'>Female</MenuItem>
                </Select>
            </Box>
            <TableContainer>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Character</TableCell>
                            <TableCell>Alive</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Culture</TableCell>
                            <TableCell>Allegiances</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {charactersList.map((character, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {getCharacterNames(character.name, character.aliases)}
                                </TableCell>
                                <TableCell>{getCharacterAlive(character.born, character.died)}</TableCell>
                                <TableCell>{character.gender}</TableCell>
                                <TableCell>{character.culture ? character.culture : 'Unknown'}</TableCell>
                                <TableCell>{character.allegiances[0] ? <List>
                                    {character.allegiances.map(houseUrl => (
                                        <ListItem disablePadding>
                                            House {getHouseId(houseUrl)}
                                        </ListItem>
                                    ))}</List> : 'No allegiances'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default CharactersTable
