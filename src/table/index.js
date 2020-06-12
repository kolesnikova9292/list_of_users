import React from "react";
import TableInner from "./Table";

export const Table = (props) => {
  return (
    <>
      <h1>Пользователи</h1>
      <TableInner {...props} />
    </>
  );
};
