import React, { useEffect, useState } from "react";
import { Context } from "./Context";
import axios from "axios";
import { useAuth } from "../auth";

export const Provider = ({ children }) => {
  const { jwt } = useAuth();

  const [todoLists, setTodoLists] = useState([]);

  const todo = axios.create({
    baseURL: `http://localhost:4000/v1.0`,
    headers: { Authorization: "Bearer " + jwt },
  });

  useEffect(() => {
    if (!jwt) return;
    getMyToDoLists();
  }, [jwt]);

  const getMyToDoLists = () => {
    todo
      .get(`/todo`)
      .then((res) => {
        setTodoLists(res.data);
      })
      .catch((err) => console.log(err));
  };

  const createNewToDoList = () => {
    todo
      .post("/todo")
      .then((res) => {
        getMyToDoLists();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const contextValue = {
    myToDoLists: todoLists,
    refreshToDoList: getMyToDoLists,
    createNewToDoList: createNewToDoList,
    changeToDoListName: (listId, data) =>
      todo.patch(`/todo/name/${listId}`, data),
    getToDoList: (listId) => todo.get(`/todo/${listId}`),
    addToDoItem: (listId, data) => todo.post(`/todo/${listId}`, data),
    checkToDoItem: (listId, itemId, done = false) =>
      todo.patch(`/todo/${listId}/${itemId}`, { done: done }),
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};