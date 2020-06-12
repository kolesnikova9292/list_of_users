import React, { useState, useEffect } from "react";
import { getAuthFlag, getToken } from "../providers/redux/auth";
import { connect } from "react-redux";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import "./Table.css";

const TableInner = (props) => {
  const { token, isAuthorized } = props;

  const [usersPrimal, setUsersPrimal] = useState([]);

  const [users, setUsers] = useState([]);

  const [order, setOrder] = React.useState("asc");

  const [searchInput, setSearchInput] = useState("");

  const getList = async (token) => {
    var result = await axios.get(
      "http://emphasoft-test-assignment.herokuapp.com/api/v1/users/",
      {
        headers: {
          Accept: "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    setUsersPrimal(result.data);
    setUsers(result.data);
  };

  useEffect(() => {
    getList(token);
  }, []);

  const handleRequestSort = (event) => {
    console.log(event);
    const isAsc = order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    sortArray(order);
  };

  const sortArray = (order) => {
    if (order === "asc") {
      users.sort((a, b) => (a.id > b.id ? 1 : -1));
    }
    if (order === "desc") {
      users.sort((a, b) => (a.id < b.id ? 1 : -1));
    }
  };

  const handleChangeSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const filterUsers = (e) => {
    let newArr = [...usersPrimal];
    setUsers(newArr);
    setUsers(
      newArr.filter(
        (x) => x.username.toLowerCase().indexOf(searchInput.toLowerCase()) > -1
      )
    );
  };

  return (
    <>
      <TableContainer className="tableConteiner" component={Paper}>
        <TableSortLabel
          active={true}
          direction={order}
          onClick={handleRequestSort}
          className="button-for-mobile"
        >
          Сортировать по номеру
        </TableSortLabel>
        <InputBase
          placeholder="Фильтр по логину"
          inputProps={{ "aria-label": "search google maps" }}
          value={searchInput}
          onChange={handleChangeSearchInput}
        />
        <IconButton aria-label="search" onClick={filterUsers}>
          <SearchIcon />
        </IconButton>
        <Table className="tableInner" aria-label="simple table">
          <TableHead className="table-head">
            <TableRow>
              <TableCell className="cell_header">
                <TableSortLabel
                  active={true}
                  direction={order}
                  onClick={handleRequestSort}
                >
                  №
                </TableSortLabel>
              </TableCell>
              <TableCell className="cell_header">Имя</TableCell>
              <TableCell className="cell_header">Фамилия</TableCell>
              <TableCell className="cell_header">Логин</TableCell>
              <TableCell className="cell_header">Активность</TableCell>
              <TableCell className="cell_header">Администратор</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow component="tr" key={row.id}>
                <TableCell className="cell" aria-label="Номер">
                  {row.id}
                </TableCell>
                <TableCell className="cell" aria-label="Имя">
                  {row.first_name}
                </TableCell>
                <TableCell className="cell" aria-label="Фамилия">
                  {row.last_name}
                </TableCell>
                <TableCell className="cell" aria-label="Логин">
                  {row.username}
                </TableCell>
                <TableCell className="cell" aria-label="Активность">
                  {row.is_active === true ? "yes" : "no"}
                </TableCell>
                <TableCell className="cell" aria-label="Администратор">
                  {row.is_superuser === true ? "yes" : "no"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthorized: getAuthFlag(state),
    token: getToken(state),
  };
};

export default connect(mapStateToProps)(TableInner);
