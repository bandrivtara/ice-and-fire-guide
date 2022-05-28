import { Box, Table, TableContainer, Typography } from '@mui/material';
import _ from 'lodash';
import { useEffect, useContext } from 'react';
import { fetchCharactersList } from '../../api';
import FiltersPanel, { Filters } from './FiltersPanel';
import Pagination from './Pagination';
import TableBody from './TableBody';
import TableHead from './TableHead';
import { AppContext, AppContextProps } from '../../context/index';

const CharactersTable = () => {
    const {
        setCharactersList,
        charactersList,
        filters,
        lastPage,
        paginationData,
        setFilters,
        setLastPage,
        setPaginationData,
    } = useContext(AppContext) as AppContextProps;

    useEffect(() => {
        const getCharactersList = async () => {
            const res = await fetchCharactersList(paginationData, filters);

            if (res) {
                setCharactersList(res.list);
                setLastPage(parseInt(res.lastPage));
            }
        };

        getCharactersList();
    }, [filters, paginationData, setCharactersList, setLastPage]);

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
