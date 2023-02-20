import { Button, Td, Tr, Image, Box } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'

import axios from "axios";
import { useEffect, useState } from "react";
import LandingLayout from "../../components/layouts/LandingLayout";
import DataTable from "../../components/sections/DataTable";
import { useNavigate } from "react-router-dom";

const User = () => {
    const navigate = useNavigate();

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

    const deleteCatagory = async (id: string) => {
        await axios.delete(
            `${process.env.REACT_APP_BACKEND}api/users/${id}`
        ).then((res) => {
            getUsers();

        }).catch((error) => {
            console.log(error);
        })
    }

    const handleEditButtonClick = async (id: string) => {
        navigate(`edit/${id}`);
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <LandingLayout>
            <DataTable title="User" thead={['NAME', 'USERNAME', 'GENDER', 'EMIAL', 'PHONE']} addButtonLink="">
                {users.map((data) => (
                    <Tr key={data._id}>
                        <Td>
                            <Box style={{"display": "inline-flex"}}>
                                <Image
                                    borderRadius='full'
                                    boxSize='50px'
                                    src={`${process.env.REACT_APP_IMAGES_BACKEND}${data.photo}`}
                                    alt='Profile Picture' />
                                <span style={{"margin": "auto", "marginLeft": "5px"}}>{data.name}</span>
                            </Box>
                        </Td>
                        <Td>{data.username}</Td>
                        <Td>{data.gender}</Td>
                        <Td>{data.email}</Td>
                        <Td>{data.phone}</Td>
                    </Tr>
                ))}
            </DataTable>
        </LandingLayout>
    );
}

export default User;