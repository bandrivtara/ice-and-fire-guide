import { Box, IconButton, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import FirstPageOutlinedIcon from '@mui/icons-material/FirstPageOutlined';
import LastPageOutlinedIcon from '@mui/icons-material/LastPageOutlined';
import { PaginationData } from './CharactersTable';

const ROWS_PER_PAGE_OPTIONS = [10, 25, 50];

type PaginationProps = {
    paginationData: PaginationData;
    setPaginationData: (paginationData: PaginationData) => void;
};

const Pagination = ({ paginationData, setPaginationData }: PaginationProps) => {
    const handleFirstPageButtonClick = () => {
        setPaginationData({ ...paginationData, page: 1 });
    };

    const handleBackButtonClick = () => {
        setPaginationData({ ...paginationData, page: paginationData.page - 1 });
    };

    const handleNextButtonClick = () => {
        setPaginationData({ ...paginationData, page: paginationData.page + 1 });
    };

    const handleLastPageButtonClick = () => {
        setPaginationData({ ...paginationData, page: paginationData.lastPage });
    };

    const handleRowPerPage = (event: SelectChangeEvent<number>) => {
        setPaginationData({ ...paginationData, page: 1, rowsPerPage: event.target.value as number });
    };

    return (
        <Box sx={{ flexShrink: 0, px: 2, py: 1, justifyContent: 'end', display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: 4 }}>Page {paginationData.page}</Typography>
            <Typography sx={{ mr: 4 }}>
                {paginationData.page * paginationData.rowsPerPage - paginationData.rowsPerPage + 1} - {' '}
                {paginationData.page * paginationData.rowsPerPage}
            </Typography>
            <Select
                labelId="gender-filter"
                variant="standard"
                sx={{ minWidth: '60px' }}
                value={paginationData.rowsPerPage}
                onChange={handleRowPerPage}
                displayEmpty
            >
                {ROWS_PER_PAGE_OPTIONS.map((rowPerPageOption) => (
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
                disabled={paginationData.page === paginationData.lastPage}
                aria-label="next page"
            >
                <KeyboardArrowRight />
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={paginationData.page === paginationData.lastPage}
                aria-label="last page"
            >
                <LastPageOutlinedIcon />
            </IconButton>
        </Box>
    );
};

export default Pagination;
