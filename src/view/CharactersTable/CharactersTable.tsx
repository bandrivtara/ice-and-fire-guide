import { Box, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { API_ENDPOINTS, BASE_URL, PAGINATION_CONFIG } from '../../configs';
import { Character } from '../../types';
import FiltersPanel from './FiltersPanel';
import Pagination from './Pagination';
import CharactersTableBody from './TableBody';

export type Filters = {
    gender: string;
    culture: string;
};

export type PaginationData = {
    page: number;
    rowsPerPage: number;
};

const CharactersTable = () => {
    const [charactersList, setCharactersList] = useState<Array<Character>>([]);
    const [filters, setFilters] = useState<Filters>({ gender: '', culture: '' });
    const [paginationData, setPaginationData] = useState<PaginationData>({
        page: 1,
        rowsPerPage: PAGINATION_CONFIG.initialRowPerPageOption,
    });
    const [lastPage, setLastPage] = useState(0);

    useEffect(() => {
        const getCharactersList = async () => {
            const res = await axios.get(
                `${BASE_URL}${API_ENDPOINTS.characters}?page=${paginationData.page}&pageSize=${paginationData.rowsPerPage}`,
                {
                    params: {
                        gender: filters.gender ? filters.gender : null,
                        culture: filters.culture ? filters.culture : null,
                    },
                },
            );

            const lastPageRel = res.headers.link.split(',').filter((rel) => rel.includes('last'))[0];
            const newLastPage = lastPageRel.substring(lastPageRel.indexOf('page=') + 5, lastPageRel.lastIndexOf('&'));

            setLastPage(parseInt(newLastPage));
            setCharactersList(res.data);
        };

        getCharactersList();
    }, [filters.culture, filters.gender, paginationData.page, paginationData.rowsPerPage]);

    const updateFilters = (newFilters: Filters) => {
        if (!_.isEqual(filters, newFilters)) {
            setFilters(newFilters);
            setPaginationData({ ...paginationData, page: 1 });
        }
    };

    return (
        <Paper sx={{m:4}}>
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
                    Characters table
                </Typography>
                <FiltersPanel filters={filters} updateFilters={updateFilters} />
            </Box>
            <TableContainer>
                <Table size="small" aria-label="characters table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Character</TableCell>
                            <TableCell>Alive</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Culture</TableCell>
                            <TableCell>Allegiances</TableCell>
                        </TableRow>
                    </TableHead>
                    <CharactersTableBody charactersList={charactersList} />
                </Table>
            </TableContainer>
            <Pagination paginationData={paginationData} setPaginationData={setPaginationData} lastPage={lastPage} />
        </Paper>
    );
};

export default CharactersTable;
