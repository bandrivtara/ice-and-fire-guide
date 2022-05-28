import { Box, IconButton, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import FirstPageOutlinedIcon from '@mui/icons-material/FirstPageOutlined';
import LastPageOutlinedIcon from '@mui/icons-material/LastPageOutlined';
import { PaginationData } from './CharactersTable';
import {useCallback} from 'react'
import { PAGINATION_CONFIG } from '../../configs';

type PaginationProps = {
    paginationData: PaginationData;
    setPaginationData: (paginationData: PaginationData) => void;
    lastPage: number
};

const Pagination = ({ paginationData, setPaginationData, lastPage }: PaginationProps) => {
    const handleFirstPageButtonClick = () => {
        setPaginationData({ ...paginationData, page: 1 });
    };

    const handleBackButtonClick = () => {
        setPaginationData({ ...paginationData, page: paginationData.page - 1 });
    };

    const handleNextButtonClick = () => {
        setPaginationData({ ...paginationData, page: paginationData.page + 1 });
    };

    const handleLastPageButtonClick = useCallback(() => {
        setPaginationData({ ...paginationData, page: lastPage });
    }, [lastPage, paginationData, setPaginationData]);

    const handleRowPerPage = (event: SelectChangeEvent<number>) => {
        setPaginationData({ ...paginationData, page: 1, rowsPerPage: event.target.value as number });
    };

    return (
        <Box sx={{ flexShrink: 0, px: 2, py: 1, justifyContent: 'end', display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: 4 }}>Page {paginationData.page} of {lastPage}</Typography>
            <Typography sx={{ mr: 4 }}>
                {paginationData.page * paginationData.rowsPerPage - paginationData.rowsPerPage + 1} - {' '}
                {paginationData.page * paginationData.rowsPerPage}
            </Typography>
            <Select
                variant="standard"
                sx={{ minWidth: '60px' }}
                value={paginationData.rowsPerPage}
                onChange={handleRowPerPage}
                displayEmpty
            >
                {PAGINATION_CONFIG.rowPerPageOptions.map((rowPerPageOption) => (
                    <MenuItem key={rowPerPageOption} value={rowPerPageOption}>
                        {rowPerPageOption}
                    </MenuItem>
                ))}
            </Select>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={paginationData.page === 1}
                aria-label="first page"
            >
                <FirstPageOutlinedIcon />
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={paginationData.page === 1} aria-label="previous page">
                <KeyboardArrowLeft />
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={paginationData.page === lastPage}
                aria-label="next page"
            >
                <KeyboardArrowRight />
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={paginationData.page === lastPage}
                aria-label="last page"
            >
                <LastPageOutlinedIcon />
            </IconButton>
        </Box>
    );
};

export default Pagination;
