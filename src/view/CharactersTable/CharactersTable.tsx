import { Box, Table, TableContainer, Typography } from '@mui/material';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { fetchCharactersList } from '../../api';
import { PAGINATION_CONFIG } from '../../configs';
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
            const res = await fetchCharactersList(paginationData, filters);

            if (res) {
                setCharactersList(res.list);
                setLastPage(parseInt(res.lastPage));
            }
        };

        getCharactersList();
    }, [filters, paginationData]);

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

            <TableContainer>
                {/* TODO add preloader on data fetching */}
                <Table size="small" aria-label="characters table">
                    <TableHead />
                    {/* TODO if list empty show Empty image/label/component */}
                    <TableBody charactersList={charactersList} />
                </Table>
            </TableContainer>
            <Pagination paginationData={paginationData} setPaginationData={setPaginationData} lastPage={lastPage} />
        </>
    );
};

export default CharactersTable;
