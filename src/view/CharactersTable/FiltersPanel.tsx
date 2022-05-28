import {
    Box,
    Input,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    InputAdornment,
    CircularProgress,
    FormControl,
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { FILTERS_CONFIG } from '../../configs';

export type Filters = {
    gender: string;
    culture: string;
};

type FiltersPanelProps = {
    filters: Filters;
    updateFilters: (filter: Filters) => void;
};

type Genders = 'any' | 'male' | 'female'

const FiltersPanel = ({ filters, updateFilters }: FiltersPanelProps) => {
    const [cultureValue, setCultureValue] = useState('');
    const [genderValue, setGenderValue] = useState<Genders>('any');
    const [isDebounce, setIsDebounce] = useState(false);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const isNewValue = filters.culture !== cultureValue;
            if (isNewValue) {
                updateFilters({ ...filters, culture: cultureValue });
            }

            setIsDebounce(false);
        }, FILTERS_CONFIG.inputDebouncedDelayMs);

        return () => clearTimeout(delayDebounceFn);
    }, [cultureValue, filters, updateFilters]);

    const handleGenderFilter = (event: SelectChangeEvent) => {
        const newValue = event.target.value
        setGenderValue(newValue as Genders)

        updateFilters({ ...filters, gender: newValue !== 'any' ? newValue : '' as string });
    };

    const handleChangeCultureFilter = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setIsDebounce(true);
        setCultureValue(event.target.value);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'end' }}>
            <FormControl  variant="standard">
                <InputLabel htmlFor="culture-filter">Filter by culture</InputLabel>
                <Input
                    id="culture-filter"
                    sx={{ marginRight: 2, width: '200px' }}
                    value={cultureValue}
                    onChange={handleChangeCultureFilter}
                    endAdornment={
                        <InputAdornment position="end">{isDebounce && <CircularProgress size={20} />}</InputAdornment>
                    }
                />
            </FormControl>
            <FormControl  variant="standard">
                <InputLabel htmlFor="gender-filter">Filter by gender</InputLabel>
                <Select
                    id="gender-filter"
                    variant="standard"
                    sx={{ minWidth: '200px' }}
                    value={genderValue}
                    onChange={handleGenderFilter}
                    displayEmpty
                >
                    <MenuItem value="any">Any</MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default FiltersPanel;
