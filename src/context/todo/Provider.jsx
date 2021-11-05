import React, { useEffect, useState } from "react";
import { Context } from "./Context";
import axios from "axios";
import { useAuth } from "../auth";

export const Provider = ({ children }) => {
  const { jwt } = useAuth();

  const [todoLists, setTodoLists] = useState([]);

  const todo = axios.create({
    baseURL: `https://api.sumser.dev/v1.0`,
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
    return todo
      .post("/todo")
      .then((res) => {
        getMyToDoLists();
        return res.data._id;
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
    deletetoDoList: (listId) => todo.delete(`/todo/${listId}`),
    reportError: (data) => todo.post("/issue", data),
    getMe: () => todo.get(`/profile/me`),
    updateProfile: (data) => todo.patch(`/profile/me`, data),
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
