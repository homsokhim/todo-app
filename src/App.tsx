import './App.css';
import {Header} from './Components/Headers/Header'
import { Outlet } from 'react-router-dom';
import {Container} from '@mui/material';

function App() {
  return (
    <Container maxWidth="sm">
      <Header />
      <main>
        <Outlet />
      </main>
      {/* <footer>&copy; 2023</footer> */}
    </Container>
  );
}

export default App;
