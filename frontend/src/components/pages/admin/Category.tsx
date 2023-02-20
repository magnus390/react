import { Button, Td, Tr } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'

import axios from "axios";
import { useEffect, useState } from "react";
import LandingLayout from "../../components/layouts/LandingLayout";
import DataTable from "../../components/sections/DataTable";
import { useNavigate } from "react-router-dom";

const Category = () => {
    const navigate = useNavigate();

    const [categories, setCategories] = useState<any[]>([]);

    const getCategories = async () => {
        await axios.get(
            `${process.env.REACT_APP_BACKEND}api/category`
        ).then((res) => {
            setCategories(res.data);
        }).catch((error) => {
            console.log(error);
        });

    }

    const deleteCatagory = async (id: string) => {
        await axios.delete(
            `${process.env.REACT_APP_BACKEND}api/category/${id}`
        ).then((res) => {
            getCategories();            

        }).catch((error) => {
            console.log(error);
        })
    }

    const handleEditButtonClick = async (id: string) => {
       navigate(`edit/${id}`);
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <LandingLayout>
            <DataTable title="Category" thead={['NAME', 'DESCRIPTION', 'ACTION']} addButtonLink="/category/add">
                {categories.map((data) => (
                    <Tr key={data._id}>
                        <Td>{data.name}</Td>
                        <Td>{data.description}</Td>
                        <Td>
                            <Button onClick={() => handleEditButtonClick(data._id)} leftIcon={<EditIcon />} colorScheme='messenger'>Edit</Button> &nbsp;
                            <Button onClick={() => deleteCatagory(data._id)} leftIcon={<DeleteIcon />} colorScheme='red'>Delete</Button>
                        </Td>
                    </Tr>
                ))}
            </DataTable>
        </LandingLayout>
    );
}

export default Category;