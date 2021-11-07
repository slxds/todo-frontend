import React, { useEffect, useState } from "react";
import { Context } from "./Context";
import axios from "axios";
import { useAuth } from "../auth";

export const Provider = ({ children }) => {
  const { jwt } = useAuth();

  const [todoLists, setTodoLists] = useState([]);

  const todo = axios.create({
    baseURL: process.env.REACT_APP_BASEURL,
    headers: { Authorization: "Bearer " + jwt },
  });

  useEffect(() => {
    if (!jwt) return;
    getMyToDoLists();
  }, [jwt]);

  const getMyToDoLists = () => {
    todo
      .get(`/v1.0/todo`)
      .then((res) => {
        setTodoLists(res.data);
      })
      .catch((err) => console.log(err));
  };

  const createNewToDoList = () => {
    return todo
      .post("/v1.0/todo")
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
      todo.patch(`/v1.0/todo/name/${listId}`, data),
    getToDoList: (listId) => todo.get(`/v1.0/todo/${listId}`),
    addToDoItem: (listId, data) => todo.post(`/v1.0/todo/${listId}`, data),
    checkToDoItem: (listId, itemId, done = false) =>
      todo.patch(`/v1.0/todo/${listId}/${itemId}`, { done: done }),
    deletetoDoList: (listId) => todo.delete(`/v1.0/todo/${listId}`),
    reportError: (data) => todo.post("/v1.0/issue", data),
    getMe: () => todo.get(`/v1.0/profile/me`),
    updateProfile: (data) => todo.patch(`/v1.0/profile/me`, data),
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
