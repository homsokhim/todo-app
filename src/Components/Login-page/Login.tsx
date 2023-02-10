import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useContext, useState } from "react";
import { Button, TextField, Card, CardContent, CardActions } from "@mui/material";
import { AuthContext } from "../../Providers/Auth";
import { useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider();
const auth = getAuth();
export const Login = () => {
  // const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const singInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        if (user && setUser) {
          setUser(user);
          navigate('/');
        }
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.log(error);
        // ...
      });
  };

  const Signup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user && setUser) {
          setUser(user);
          navigate('/');
        }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const signinWithEmailAndPassword = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user && setUser) {
          setUser(user);
          navigate('/');
        }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  return (
    <Card>
      <CardContent sx={{'& .MuiScopedCssBaseline-root': {mb: 2}}}>
        <TextField
          id="filled-basic"
          label="Email"
          value={email}
          fullWidth
          onChange={handleEmail}
          variant="filled"
        />
        <TextField
          id="filled-basic"
          label="Password"
          type="password"
          value={password}
          fullWidth
          sx={{mt: 2}}
          onChange={handlePassword}
          variant="filled"
          
        />
      </CardContent>
      <CardActions>
      <Button variant="text" color="secondary" onClick={Signup}>
        Signup
      </Button>
      <Button variant="text" onClick={signinWithEmailAndPassword}>
        Sign In
      </Button>
      <Button variant="text" onClick={singInWithGoogle}>
        Login with Google
      </Button>
      </CardActions>
      {user && <h2>{user.displayName}</h2>}
    </Card>
  );
};
