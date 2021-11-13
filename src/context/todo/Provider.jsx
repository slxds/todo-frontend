import React, { useEffect, useState } from "react";
import { Context } from "./Context";
import axios from "axios";
import { useAuth } from "../auth";

export const Provider = ({ children }) => {
  const { jwt } = useAuth();

  const [todoLists, setTodoLists] = useState([]);
  const [me, setMe] = useState(null);

  const todo = axios.create({
    baseURL: process.env.REACT_APP_BASEURL,
    headers: { Authorization: "Bearer " + jwt },
  });

  useEffect(() => {
    if (!jwt) return;
    getMe();
    console.log(jwt);
    getMyToDoLists();
  }, [jwt]);

  const getMyToDoLists = () => {
    todo
      .get(`/v1/todo`)
      .then((res) => {
        setTodoLists(res.data);
      })
      .catch((err) => console.log(err));
  };

  const createNewToDoList = () => {
    return todo
      .post("/v1/todo")
      .then((res) => {
        getMyToDoLists();
        return res.data._id;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMe = () => {
    todo
      .get(`/v1/profile/me`)
      .then((res) => {
        setMe(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const contextValue = {
    myToDoLists: todoLists,
    me: me,
    refreshToDoList: getMyToDoLists,
    createNewToDoList: createNewToDoList,
    changeToDoListName: (listId, data) =>
      todo.patch(`/v1/todo/name/${listId}`, data),
    getToDoList: (listId) => todo.get(`/v1/todo/${listId}`),
    addToDoItem: (listId, data) => todo.post(`/v1/todo/${listId}`, data),
    editToDoItem: (listId, itemId, data) =>
      todo.patch(`/v1/todo/details/${listId}/${itemId}`, data),
    checkToDoItem: (listId, itemId, done = false) =>
      todo.patch(`/v1/todo/check/${listId}/${itemId}`, { done: done }),
    deletetoDoList: (listId) => todo.delete(`/v1/todo/${listId}`),
    reportError: (data) => todo.post("/v1/issue", data),
    getProfileImage: (userId) => todo.get(`/v1/profile/${userId}/image`),
    updateProfile: (data) =>
      todo.patch(`/v1/profile/me`, data, {
        headers: {
          Authorization: "Bearer " + jwt,
          "Content-Type": "multipart/form-data",
        },
      }),
    updateMe: () => getMe(),
    shareList: (listId, data) => todo.post(`/v1/todo/share/${listId}`, data),
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
