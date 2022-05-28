import axios, { AxiosResponse } from 'axios';
import { fetchCharactersList } from './';
import { Filters } from '../view/CharactersTable/FiltersPanel';
import { PaginationData } from '../view/CharactersTable/Pagination';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

type CharacterMock = {
    name: string;
    culture: string;
    gender: string;
};

describe('api', () => {
    const charactersList: Array<CharacterMock> = [
        {
            name: 'John',
            culture: 'Winterfell',
            gender: 'Male',
        },
        {
            name: 'Aria',
            culture: 'Winterfell',
            gender: 'Female',
        },
    ];

    const paginationMock: PaginationData = {
        page: 1,
        rowsPerPage: 25,
    };

    const filterMock: Filters = {
        culture: '',
        gender: '',
    };

    const maxPages = '55';

    const linkMock = `<https://anapioficeandfire.com/api/characters?page=2&pageSize=25>; rel="next", <https://anapioficeandfire.com/api/characters?page=1&pageSize=25>; rel="first", <https://anapioficeandfire.com/api/characters?page=${maxPages}&pageSize=25>; rel="last"`;

    const mockedResponse: AxiosResponse = {
        data: charactersList,
        status: 200,
        statusText: 'OK',
        headers: {
            link: linkMock,
        },
        config: {},
    };

    test('should return characters list with last page', async () => {
        const expectedData = {
            list: charactersList,
            lastPage: maxPages,
        };

        mockedAxios.get.mockResolvedValueOnce(mockedResponse);
        expect(mockedAxios.get).not.toHaveBeenCalled();

        const data = await fetchCharactersList(paginationMock, filterMock);

        expect(mockedAxios.get).toHaveBeenCalled();
        expect(data).toEqual(expectedData);
    });
});
