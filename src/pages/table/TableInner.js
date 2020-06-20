import React, { useState, useEffect } from "react";
import { getAuthFlag, getToken } from "../../providers/redux/auth";
import { connect } from "react-redux";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  InputBase,
  IconButton,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import "./Table.css";

const TableInner = (props) => {
  const { token } = props;

  const [usersPrimal, setUsersPrimal] = useState([]);

  const [users, setUsers] = useState([]);

  const [order, setOrder] = React.useState("asc");

  const [searchInput, setSearchInput] = useState("");

  const getList = async (token) => {
    var result = await axios.get(
      "https://emphasoft-test-assignment.herokuapp.com/api/v1/users/",
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
    if (token) {
      localStorage.setItem("token", token);
    }
    getList(token);
  }, []);

  const handleRequestSort = (event) => {
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

  const filterUsers = () => {
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
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              filterUsers();
            }
          }}
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
