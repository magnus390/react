import { EditIcon, DeleteIcon, CheckCircleIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Tr, Td, Image, Box, Heading } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge, Button, NavLink, Tooltip } from "reactstrap";
import LandingLayout from "../../components/layouts/LandingLayout";
import DataTable from "../../components/sections/DataTable";


function AdminDashboard() {
  const [categories, setCategories] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);


  useEffect(() => {
    getCategories();
    getOrders();
    getProducts();
    getUsers();
  }, []);

  const getCategories = async () => {
    await axios.get(
      `${process.env.REACT_APP_BACKEND}api/category`
    ).then((res) => {
      setCategories(res.data);
    }).catch((error) => {
      console.log(error);
    }
    )
  };

  const getOrders = async () => {
    await axios.get(
      `${process.env.REACT_APP_BACKEND}api/order`
    ).then((res) => {
      setOrders(res.data);
    }).catch((error) => {
      console.log(error);
    });

  }

  const [products, setProducts] = useState<any[]>([]);

  const getProducts = async () => {
    await axios.get(
      `${process.env.REACT_APP_BACKEND}api/item`
    ).then((res) => {
      setProducts(res.data);
    }).catch((error) => {
      console.log(error);
    });

  }

  const [users, setUsers] = useState<any[]>([]);

  const getUsers = async () => {
    await axios.get(
      `${process.env.REACT_APP_BACKEND}api/users`
    ).then((res) => {
      setUsers(res.data);
    }).catch((error) => {
      console.log(error);
    });

  }

  return (
    <LandingLayout>
      <Box>
        <Heading width="-webkit-fit-content" as='h2' size="lg">Dashboard</Heading>
      </Box>
      <Box marginTop={"20px"}>
        <DataTable title="Category" thead={['NAME', 'DESCRIPTION']} addButtonLink="">
          {categories.map((data) => (
            <Tr key={data._id}>
              <Td>{data.name}</Td>
              <Td>{data.description}</Td>
            </Tr>
          ))}
        </DataTable>
      </Box>
      <hr />
      <Box marginTop={"50px"}>
        <DataTable title="Order" thead={['NAME', 'Address', 'ORDER DATE', 'DELIVERY DATE', 'STATUS', 'TOTAL']} addButtonLink="">
          {orders.map((data) => (
            <Tr key={data._id}>
              <Td>
                <Box style={{ "display": "inline-flex" }}>
                  <Image
                    borderRadius='full'
                    boxSize='50px'
                    src={`${process.env.REACT_APP_IMAGES_BACKEND}${data.userid.photo}`}
                    alt='Profile Picture' />
                  <span style={{ "margin": "auto", "marginLeft": "5px" }}>{data.userid.name}</span>
                </Box>
              </Td>
              <Td>{data.address}</Td>
              <Td>{data.orderDate}</Td>
              <Td>{data.selectedDay}</Td>
              <Td>
                {data.status === 0 ? <Badge colorScheme='purple'>New</Badge> : ""}
                {data.status === 1 ? <Badge colorScheme='blue'>Approved</Badge> : ""}
                {data.status === 2 ? <Badge colorScheme='green'>Fullfilled</Badge> : ""}
                {data.status === 3 ? <Badge colorScheme='red'>Rejected</Badge> : ""}
              </Td>
              <Td>$ {data.total}</Td>
            </Tr>
          ))}
        </DataTable>
      </Box>
      <hr />
      <Box marginTop={"50px"}>
        <DataTable title="Product" thead={['NAME', 'CATEGORY', 'DESCRIPTION', 'QUANTITY', 'DISCOUNT', 'PRICE']} addButtonLink="">
          {products.map((data) => (
            <Tr key={data._id}>
              <Td>
                <NavLink to={data._id}>
                  {data.name}
                </NavLink>
              </Td>
              <Td>{data.category?.name}</Td>
              <Td>{data.description}</Td>
              <Td>{data.quantity}</Td>
              <Td>{data.discount}%</Td>
              <Td>{data.price}</Td>
            </Tr>
          ))}
        </DataTable>
      </Box>
      <hr />
      <Box marginTop={"50px"}>
        <DataTable title="User" thead={['NAME', 'USERNAME', 'GENDER', 'EMIAL', 'PHONE']} addButtonLink="">
          {users.map((data) => (
            <Tr key={data._id}>
              <Td>
                <Box style={{ "display": "inline-flex" }}>
                  <Image
                    borderRadius='full'
                    boxSize='50px'
                    src={`${process.env.REACT_APP_IMAGES_BACKEND}${data.photo}`}
                    alt='Profile Picture' />
                  <span style={{ "margin": "auto", "marginLeft": "5px" }}>{data.name}</span>
                </Box>
              </Td>
              <Td>{data.username}</Td>
              <Td>{data.gender}</Td>
              <Td>{data.email}</Td>
              <Td>{data.phone}</Td>
            </Tr>
          ))}
        </DataTable>
      </Box>
    </LandingLayout>
  );
}

export default AdminDashboard;