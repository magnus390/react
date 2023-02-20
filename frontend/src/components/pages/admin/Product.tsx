import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Tr, Td, Button } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LandingLayout from "../../components/layouts/LandingLayout";
import DataTable from "../../components/sections/DataTable";

const Product = () => {

    const navigate = useNavigate();

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

    const deleteProduct = async (id: string) => {
        await axios.delete(
            `${process.env.REACT_APP_BACKEND}api/item/${id}`
        ).then((res) => {
            getProducts();

        }).catch((error) => {
            console.log(error);
        })
    }

    const handleEditButtonClick = async (id: string) => {
        navigate(`edit/${id}`);
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <LandingLayout>
            <DataTable title="Product" thead={['NAME', 'CATEGORY', 'DESCRIPTION', 'QUANTITY', 'DISCOUNT', 'PRICE', 'ACTION']} addButtonLink="/product/add">
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
                        <Td>
                            <Button onClick={() => handleEditButtonClick(data._id)} leftIcon={<EditIcon />} colorScheme='messenger'>Edit</Button> &nbsp;
                            <Button onClick={() => deleteProduct(data._id)} leftIcon={<DeleteIcon />} colorScheme='red'>Delete</Button>
                        </Td>
                    </Tr>
                ))}
            </DataTable>
        </LandingLayout>
    );
}

export default Product;