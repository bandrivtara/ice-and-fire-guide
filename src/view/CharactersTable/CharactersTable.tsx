import { Box, Table, TableContainer,  Typography } from '@mui/material';
import axios from 'axios';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { API_ENDPOINTS, BASE_URL, PAGINATION_CONFIG } from '../../configs';
import { Character } from '../../types';
import FiltersPanel, { Filters } from './FiltersPanel';
import Pagination, { PaginationData } from './Pagination';
import TableBody from './TableBody';
import TableHead from './TableHead';

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
                <Typography variant="h1" sx={{ fontSize: 26, color: 'primary.main' }}>
                    Characters table
                </Typography>
                <FiltersPanel filters={filters} updateFilters={updateFilters} />
            </Box>
            <TableContainer sx={{mt: 1}}>
                <Table size="small" aria-label="characters table">
                    <TableHead />
                    <TableBody charactersList={charactersList} />
                </Table>
            </TableContainer>
            <Pagination paginationData={paginationData} setPaginationData={setPaginationData} lastPage={lastPage} />
        </>
    );
};

export default CharactersTable;
