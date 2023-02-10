import { useEffect, useState, useContext, ReactNode, FC } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../Providers/Auth";
import { AddTodo } from "../AddTodo/AddTodo";
import { Todo } from "../Model/Todo";
import {
  CardActions,
  CardContent,
  Card,
  ListItem,
  List,
  ListItemButton,
  ListItemText,
  Radio,
  Grid,
  Button,
  Box,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import useMediaQuery from "@mui/material/useMediaQuery";

type HomePageButtonProps = {
  isActive?: boolean;
  children: ReactNode;
  onClick?: () => void;
};
const HomePageButton: FC<HomePageButtonProps> = (props) => {
  const { isActive = false } = props;
  return (
    <Button
      sx={{ color: isActive ? "info.light" : "text.secondary" }}
      {...props}
    >
      {props.children}
    </Button>
  );
};

export const HomePage = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const { user } = useContext(AuthContext);
  

  const q = query(collection(db, "todos"), where("userId", "==", user));


  const subTodos = () => {
      return onSnapshot(q, (querySnapshot) => {
        const todos: Todo[] = [];
        querySnapshot.forEach((doc) => {
          const todoItem = {
            id: doc.id,
            ...doc.data(),
          };
          todos.push(todoItem as Todo);
        });
        setTodos(todos);
      });
  }

 
  useEffect(() => {

    const unsub = subTodos();
    return unsub;

  }, []);

  const handleRadioCheck = (todo: Todo) => {
    if (todo.id) {
      const docReference = doc(db, "todos", todo.id);

      updateDoc(docReference, {
        isCompleted: true,
      });
    }
  };

  const deleleteTodo = (todo: Todo) => {
    if (todo.id) {
      deleteDoc(doc(db, "todos", todo.id));
    }
  };

  const activeTodo = todos?.filter((todo) => !todo.isCompleted) ?? [];
  const CompletedTodos = todos?.filter((todo) => !todo.isCompleted) ?? [];

  const clearCompleted = () => {
    CompletedTodos.forEach(deleleteTodo);
  };

  const todosItems = todos?.map((todo: Todo) => (
    <ListItem
      disablePadding
      sx={{
        padding: 0,
        borderBottom: "1px solid black",
        "& .delete-icon": {
          visibility: "hidden",
        },
        ":hover .delete-icon": {
          visibility: "visible",
        },
      }}
    >
      <ListItemButton>
        {todo.isCompleted ? (
          <CheckIcon
            sx={{
              background: "linear-gradient(.25turn, red, 10%, blue)",
              borderRadius: "90px",
              color: "success.contrastText",
            }}
          />
        ) : (
          <Radio
            checked={false}
            onChange={() => handleRadioCheck(todo)}
            inputProps={{ "aria-label": todo.title }}
          />
        )}

        <ListItemText>
          <Grid container justifyContent={"space-between"} alignItems="center">
            <span>{todo.title}</span>
            <IconButton
              className="delete-icon"
              onClick={() => deleleteTodo(todo)}
            >
              <ClearIcon />
            </IconButton>
          </Grid>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  ));
  const isSmall = useMediaQuery("(max-width: 375px)");
  return (
    <>
      <AddTodo />
      <Card>
        <CardContent>
          <List>{todosItems}</List>
        </CardContent>
        <CardActions>
          <Grid
            container
            alignItems={"center"}
            justifyContent={"space-between"}
          >
           {!isSmall && (<Grid sx={{ display: "flex" }}>
              <Box>
                <span>{activeTodo?.length} items left</span>
                <HomePageButton isActive>All</HomePageButton>
                <HomePageButton>Active</HomePageButton>
                <HomePageButton onClick={clearCompleted}>
                  Completed
                </HomePageButton>
              </Box>

              <Box>
                <Button>Clear</Button>
              </Box>
            </Grid>)}
          </Grid>
        </CardActions>
      </Card>
      {isSmall && (
        <Card>
          <CardContent>
            <Box>
              <span>{activeTodo?.length} items left</span>
              <HomePageButton isActive>All</HomePageButton>
              <HomePageButton>Active</HomePageButton>
              <HomePageButton onClick={clearCompleted}>Completed</HomePageButton>
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  );
};
