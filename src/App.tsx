import CharactersTable from './view/CharactersTable/CharactersTable';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HouseDetails from './view/HouseDetails/HouseDetails';
import { Paper } from '@mui/material';
import { PATHS } from './configs';
import { AppContextProvider } from './context';

function App() {
    return (
        <AppContextProvider>
            <Router>
                <Paper sx={{ m: 4 }}>
                    <Routes>
                        <Route path={PATHS.charactersList} element={<CharactersTable />} />
                        <Route path={`${PATHS.houseDetails}/:houseId`} element={<HouseDetails />} />
                    </Routes>
                </Paper>
            </Router>
        </AppContextProvider>
    );
}

export default App;
