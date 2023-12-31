import './App.css';
import HomeScreen from './screens/HomeScreen';
import ResultsScreen from './screens/ResultsScreen';
import NoPage from './screens/NoPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserCard from './components/UserCard'; // make sure to import it correctly based on your directory structure


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path='/results' element={<ResultsScreen />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
