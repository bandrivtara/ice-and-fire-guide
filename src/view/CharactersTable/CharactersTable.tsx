import { List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { Character } from '../../types';
import FiltersPanel from './FiltersPanel';
import Pagination from './Pagination';

export type TableFilters = {
    gender: string;
    culture: string;
};

export type PaginationData = {
    page: number;
    rowsPerPage: number;
    lastPage: number;
};

const CharactersTable = () => {
    const [charactersList, setCharactersList] = useState<Array<Character>>([]);
    const [filters, setFilters] = useState<TableFilters>({ gender: '', culture: '' });
    const [paginationData, setPaginationData] = useState<PaginationData>({
        page: 1,
        rowsPerPage: 25,
        lastPage: 0,
    });

    useEffect(() => {
        const getCharactersList = async () => {
            const res = await axios.get(
                `https://anapioficeandfire.com/api/characters?page=${paginationData.page}&pageSize=${paginationData.rowsPerPage}`,
                {
                    params: {
                        gender: filters.gender,
                        culture: filters.culture,
                    },
                },
            );

            const lastPageRel = res.headers.link.split(',').filter((rel) => rel.includes('last'))[0];
            const lastPage = lastPageRel.substring(lastPageRel.indexOf('page=') + 5, lastPageRel.lastIndexOf('&'));
            parseInt(lastPage) !== paginationData.lastPage &&
                setPaginationData({ ...paginationData, lastPage: parseInt(lastPage) });

            setCharactersList(res.data);
        };

        getCharactersList();
    }, [filters, paginationData]);

    const getCharacterNames = useCallback(
        (name: string, aliasesList: Array<string>) => `${name && name + ', '}${aliasesList.join(', ')}`,
        [],
    );

    const getCharacterAlive = useCallback((born: string, died: string) => {
        if (!died && !born) {
            return 'Unknown';
        }

        if (!born) {
            return 'No';
        } else if (!died) {
            return 'Yes';
        }

        // TO DO
        return 'Died in';
    }, []);

    const getHouseId = useCallback((houseUrl: string) => houseUrl.split('/').pop(), []);

    return (
        <Paper>
            <FiltersPanel filters={filters} setFilters={setFilters} />
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
                </Table>
            </TableContainer>
            <Pagination paginationData={paginationData} setPaginationData={setPaginationData} />
        </Paper>
    );
};

export default CharactersTable;
