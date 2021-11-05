import React, { useEffect, useState } from "react";
import { Context } from "./Context";
import axios from "axios";

export const Provider = ({ children }) => {
  const contextValue = {};

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
