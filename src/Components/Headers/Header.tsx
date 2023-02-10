import { Link, useNavigate } from "react-router-dom";
import { Button, Grid, IconButton } from "@mui/material";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useContext } from "react";
import { AppThemeContext } from "../../Providers/Theme";
import { Theme } from "../../Theme";
import { AuthContext } from "../../Providers/Auth";
import Brightness5Icon from '@mui/icons-material/Brightness5';

export const Header = () => {
  const {currentTheme, setTheme} = useContext(AppThemeContext);
  const {user, signOut } = useContext(AuthContext);
  const Navigate = useNavigate();
  const _setCurrentTheme = () =>{
    const newTheme = currentTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    setTheme && setTheme(newTheme);
  }
  

  const logout = () => {
    signOut && signOut();
    Navigate('/login');
  }
  
 
  return (
    <header>
      <Grid container justifyContent={'space-between'}>
        {user ? (<Button onClick={logout}>Logout</Button>) : (<Button><Link to="login">Login</Link></Button>)}
        <Link to="/">Home</Link>
      </Grid>
      <Grid container justifyContent={'space-between'} mt={10} mb={5}>
        <h2>TODO</h2>
        <IconButton sx={{color: 'success.contrastText'}} aria-label="upload picture" onClick={_setCurrentTheme}>
        {currentTheme === Theme.DARK ? <Brightness5Icon /> : <DarkModeIcon />}
      </IconButton>
      </Grid>
    </header>
  );
};
