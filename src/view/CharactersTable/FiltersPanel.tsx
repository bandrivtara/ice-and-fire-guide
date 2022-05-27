import {
    Box,
    Input,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    InputAdornment,
    CircularProgress,
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { TableFilters } from './CharactersTable';

type FiltersPanelProps = {
    filters: TableFilters;
    setFilters: (filter: TableFilters) => void;
};

const DELAY_DEBOUNCE_TIME_MS = 2000;

const FiltersPanel = ({ filters, setFilters }: FiltersPanelProps) => {
    const [cultureValue, setCultureValue] = useState('');
    const [isDebounce, setIsDebounce] = useState(false);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const isNewValue = filters.culture !== cultureValue
            isNewValue && setFilters({ ...filters, culture: cultureValue });
            setIsDebounce(false);
        }, DELAY_DEBOUNCE_TIME_MS);

        return () => clearTimeout(delayDebounceFn);
    }, [cultureValue, filters, setFilters]);

    const handleGenderFilter = (event: SelectChangeEvent) => {
        setFilters({ ...filters, gender: event.target.value as string });
    };

    const handleChangeCultureFilter = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setIsDebounce(true);
        setCultureValue(event.target.value);
    };

    return (
        <Box sx={{ padding: 2, display: 'flex', justifyContent: 'end', alignItems: 'end' }}>
            <Input
                sx={{ marginRight: 2, width: '200px' }}
                value={cultureValue}
                placeholder="Filter by culture"
                onChange={handleChangeCultureFilter}
                endAdornment={
                    <InputAdornment position="end">{isDebounce && <CircularProgress size={20} />}</InputAdornment>
                }
            />
            <Box>
                <InputLabel id="gender-filter">Filter by gender</InputLabel>
                <Select
                    labelId="gender-filter"
                    variant="standard"
                    sx={{ minWidth: '200px' }}
                    value={filters.gender}
                    onChange={handleGenderFilter}
                    displayEmpty
                >
                    <MenuItem value="">Any</MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                </Select>
            </Box>
        </Box>
    );
};

export default FiltersPanel;
