import React from "react";
import TableInner from "./TableInner";

const Table = (props) => {
  return (
    <>
      <h1>Пользователи</h1>
      <TableInner {...props} />
    </>
  );
};

export default Table;
