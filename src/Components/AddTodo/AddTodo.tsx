import {CardContent, Card, Box, TextField } from "@mui/material";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { KeyboardEvent } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useContext } from "react";
import { AuthContext } from "../../Providers/Auth";


export const AddTodo = () => {
  // const [todoText, setTodosText] = useState(null);
  const { user } = useContext(AuthContext);
  
  const OnKeyPress = async (event: KeyboardEvent<HTMLInputElement>) => {
    const inputValue = (event.target as HTMLInputElement).value;
    if (event.key === 'Enter') {
      if (inputValue) {
        addDoc(collection(db, "todos"), {
          isCompleted: false,
          title: inputValue,
          userId: user?.uid,
        });
      }
    } 
  };
  return (
    <div>
      <Card sx={{mb: 5}}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <RadioButtonUncheckedIcon
              sx={{ color: "action.active", mr: 1, my: 0.5 }}
            />
            <TextField
              id="input-with-sx"
              label="Todos"
              fullWidth
              variant="standard"
              onKeyPress={OnKeyPress}
            />
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};
