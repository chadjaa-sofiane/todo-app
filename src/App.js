import { useState } from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, Theme } from "./styles/theme";
import sunIcon from "./assets/images/icon-sun.svg";
import moonIcon from "./assets/images/icon-moon.svg";
import iconCross from "./assets/images/icon-cross.svg";
import iconCheck from "./assets/images/icon-check.svg";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [theme, setTheme] = useState("dark");
  function toggleTheme() {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  }
  function addTodo(e) {
    e.preventDefault();
    const isChecked = false;
    const isCompleted = false;
    const index = todos.length;
    const newTodo = { body: todoInput, isChecked, isCompleted, index };
    setTodos([newTodo, ...todos]);
    setTodoInput("");
  }
  function deleteTodo(index) {
    const newArray = todos.filter((e) => e.index !== index);
    setTodos([...newArray]);
  }
  function toggleCheck(index) {
    setTodos(
      todos.map((e) => {
        if (e.index === index) e.isChecked = !e.isChecked;
        return e;
      })
    );
  }
  function handelCompleted(status = false) {
    const newArray = todos.map((e) => {
      if (e.isChecked === true) e.isCompleted = status;
      return e;
    });
    setTodos([...newArray]);
  }
  function checkAll() {
    const newArray = todos;
    newArray.forEach((e) => {
      e.isChecked = true;
    });
    setTodos([...newArray]);
  }
  function clearCompletedTodos() {
    const newArray = todos.filter((e) => !e.isCompleted);
    setTodos(newArray);
  }
  return (
    <ThemeProvider theme={Theme[theme]}>
      <GlobalStyle />
      <AppWrapper>
        <TodosContainer>
          <TodoHeader>
            <Title> TODO </Title>
            <img
              onClick={toggleTheme}
              src={theme === "dark" ? sunIcon : moonIcon}
              alt="toggle-theme"
            />
          </TodoHeader>
          <br/>
          <AddTodoField>
            <input type="checkbox" id="checkBox" hidden />
            <TodoCheckBox htmlFor="checkBox">
              <img src={iconCheck} alt="cross" />
            </TodoCheckBox>
            <form style={{ flex: 1 }}>
              <TodoInput
                placeholder="create new todo.."
                value={todoInput}
                onChange={(e) => setTodoInput(e.target.value)}
              />
              <button hidden type="submit" onClick={addTodo}></button>
            </form>
          </AddTodoField>
          <TodosBody>
            {todos.length > 0 &&
              todos?.map((todo) => (
                <Todo
                  key={todo.index}
                  id={todo.index}
                  toggleCheck={toggleCheck}
                  deleteTodo={deleteTodo}
                  isChecked={todo.isChecked}
                  isCompleted={todo.isCompleted}
                >
                  {todo.body}
                </Todo>
              ))}
            <TodoMenu>
              <TodosCount>
                {todos.length > 0
                  ? todos?.reduce(
                      (p, c) => (p = p + (c.isCompleted ? 0 : 1)),
                      0
                    )
                  : 0}{" "}
                item left
              </TodosCount>
              <DesktopTodoActions
                checkAll={checkAll}
                handelCompleted={handelCompleted}
              />
              <div onClick={clearCompletedTodos}>Clear Completed</div>
            </TodoMenu>
          </TodosBody>
          <MobileTodoAction />
        </TodosContainer>
      </AppWrapper>
    </ThemeProvider>
  );
}

const TodoActions = ({ className, checkAll, handelCompleted }) => (
  <ul className={className}>
    <li onClick={checkAll}>All</li>
    <li onClick={() => handelCompleted(false)}>Active</li>
    <li onClick={() => handelCompleted(true)}>Completed</li>
  </ul>
);
const Todo = ({
  children,
  id,
  toggleCheck,
  deleteTodo,
  isChecked,
  isCompleted,
}) => {
  return (
    <>
      <TodoField>
        <input
          type="checkbox"
          id={id}
          hidden
          checked={isChecked}
          onChange={() => toggleCheck(id)}
        />
        <TodoCheckBox htmlFor={id}>
          <img src={iconCheck} alt="cross" />
        </TodoCheckBox>
        <TodoText isCompleted={isCompleted}>{children}</TodoText>
        <DeleteIcon
          src={iconCross}
          alt="delete icon"
          onClick={() => deleteTodo(id)}
        />
      </TodoField>
      <Line />
    </>
  );
};

const Paper = styled.div`
  padding: 1rem;
  width: 100%;
`;

const AppWrapper = styled.div`
  width: 100vw;
  min-height: 90vh;
  display: flex;

  justify-content: center;
`;
const TodosContainer = styled.div`
  width: 33rem;
  margin-top: 4.5rem;
  padding: 0 1rem;
`;
const TodoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 1.5rem;
    cursor: pointer;
  }
`;
const Title = styled.h1`
  font-weight: bold;
  color: #fff;
  font-size: 2.5rem;
  letter-spacing: 0.9rem;
`;
const DeleteIcon = styled.img`
  transition: 200ms ease all;
  cursor: pointer;
  opacity: 0;
`;
const TodoField = styled(Paper)`
  display: flex;
  align-items: center;
  &:hover {
    ${DeleteIcon} {
      opacity: 1;
    }
  }
  input[type="checkbox"]:checked + label {
    background: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0.7) 5%,
      hsl(220, 98%, 61%)
    );
    img {
      display: block;
    }
  }
`;
const TodoText = styled.div`
  flex: 1;
  color: ${(p) => (p.isCompleted ? p.theme.todoCompliteColor : "inherit")};
  text-decoration: ${(p) => (p.isCompleted ? "line-through" : "none")};
`;
const AddTodoField = styled(TodoField)`
  background-color: ${(p) => p.theme.paperBackground};
  margin-top: 2rem;
  border-radius: 5px;
  overflow: hidden;
`;
const TodoCheckBox = styled.label`
  position: relative;
  margin-right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.12rem solid ${(p) => p.theme.checkboxColor};
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  background: none;
  cursor: pointer;
  img {
    position: absolute;
    display: none;
  }
  &:hover {
    border-color: hsl(220, 98%, 61%);
  }
`;
const TodoInput = styled.input`
  outline: none;
  border: none;
  padding: 0;
  width: 100%;
  font-weight: 500;
  font-size: 1.2rem;
  color: ${(p) => p.theme.fontColor};
  background-color: inherit;
  &::placeholder {
    color: ${(p) => p.theme.menuItemColor};
  }
`;

const TodosBody = styled.div`
  margin-top: 1.5rem;
  background: ${(p) => p.theme.paperBackground};
  border-radius: 5px;
  box-shadow: 0 0 50px 5px rgba(0, 0, 0, 0.2);
`;

const Line = styled.hr`
  border: none;
  border-top: 0.05rem solid ${(p) => p.theme.todoCompliteColor};
`;

const TodoMenu = styled(Paper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(p) => p.theme.menuItemColor};
  font-size: 0.95rem;
  div:hover {
    cursor: pointer;
    color: ${(p) => p.theme.menuItemHoverColor};
  }
`;

const TodosCount = styled.h5`
  font-size: 0.8rem;
`;

const TodoActionStyle = styled(TodoActions)`
  display: flex;
  justify-content: space-between;
  list-style: none;
  cursor: pointer;
  li {
    margin-left: 1rem;
    &:hover {
      color: ${(p) => p.theme.menuItemHoverColor};
    }
  }
`;
const DesktopTodoActions = styled(TodoActionStyle)`
  @media screen and (max-width: 420px) {
    display: none;
  }
`;
const MobileTodoAction = styled(TodoActionStyle)`
  justify-content: space-around;
  color: ${(p) => p.theme.menuItemColor};
  padding: 1rem 3rem;
  margin: auto;
  margin-top: 1rem;
  background-color: ${(p) => p.theme.paperBackground};
  @media screen and (min-width: 420px) {
    display: none;
  }
`;

export default App;
