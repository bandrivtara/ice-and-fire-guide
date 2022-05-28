import axios from "axios";
import { API_ENDPOINTS, BASE_URL } from "../configs";
import { Filters } from "../view/CharactersTable/FiltersPanel";
import { PaginationData } from "../view/CharactersTable/Pagination";

export const fetchCharactersList = async (paginationData: PaginationData, filters: Filters) => {
    try {
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

        return { list: res.data, lastPage: newLastPage }
    } catch (error) {
        // TODO handle error and display for ex. in toast
        console.error(error)
    }
}

export const fetchHouseDetails = async (houseId: string) => {
    try {
        return await axios.get(`${BASE_URL}${API_ENDPOINTS.houseDetails}/${houseId}`);
    } catch (error) {
        // TODO handle error and display for ex. in toast
        console.error(error)
    }
}