import { useState, createContext, useMemo } from 'react';
import { PAGINATION_CONFIG } from '../configs';
import { Character } from '../types';
import { Filters } from '../view/CharactersTable/FiltersPanel';
import { PaginationData } from '../view/CharactersTable/Pagination';

export type AppContextProps = {
    charactersList: Array<Character>
    filters: Filters
    paginationData: PaginationData
    lastPage: number
    setCharactersList: (charactersList: Array<Character>) => void
    setFilters: (filters: Filters) => void
    setPaginationData: (paginationData: PaginationData) => void
    setLastPage: (lastPage: number) => void
}

export const AppContext = createContext<AppContextProps | null>(null);

type AppContextProviderProps = {
    children: JSX.Element;
};

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
    const [charactersList, setCharactersList] = useState<Array<Character>>([]);

    const [filters, setFilters] = useState<Filters>({ gender: '', culture: '' });
    const [paginationData, setPaginationData] = useState<PaginationData>({
        page: 1,
        rowsPerPage: PAGINATION_CONFIG.initialRowPerPageOption,
    });
    const [lastPage, setLastPage] = useState(0);

    const providerValue = useMemo(
        () => ({
            charactersList,
            filters,
            paginationData,
            lastPage,
            setCharactersList,
            setFilters,
            setPaginationData,
            setLastPage,
        }),
        [charactersList, filters, lastPage, paginationData],
    );

    return <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
