import React, { useEffect, useState } from "react";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
// import { FaTimes } from "react-icons/fa";

import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useProfileMutation } from "../slices/usersApiSlice";
// import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { setCredentials } from "../slices/authSlice";
// import { Link } from "react-router-dom";
const ProfileScreen = () => {
  return <div></div>;
};

export default ProfileScreen;
