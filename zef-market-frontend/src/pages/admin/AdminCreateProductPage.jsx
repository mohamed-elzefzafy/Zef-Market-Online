import { useState } from "react";
import {  Alert, Button, CloseButton, Col, Container, Form, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminCreateProductPageComponent from "./components/AdminCreateProductPageComponent";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../redux/actions/productActions";


const AdminCreateProductPage = () => {
  const dispatch = useDispatch();
  const {categories} = useSelector(state => state.getCategories);

  // const createNewProduct = async(fd) => {
  // const data =  await  dispatch(createProduct(fd));
  // return data
  // }

  return (
  <AdminCreateProductPageComponent categories={categories} />
  )
}

export default AdminCreateProductPage;