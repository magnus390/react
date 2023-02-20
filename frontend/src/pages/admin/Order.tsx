import { CheckCircleIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Tr, Td, Button, Box, Image, Tooltip, Badge } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LandingLayout from "../../components/layouts/LandingLayout";
import DataTable from "../../components/sections/DataTable";

type orderProps = {

}

const Order = (props: orderProps) => {

    const navigate = useNavigate();

    const [orders, setOrders] = useState<any[]>([]);

    const getOrders = async () => {
        await axios.get(
            `${process.env.REACT_APP_BACKEND}api/order`
        ).then((res) => {
            setOrders(res.data);
        }).catch((error) => {
            console.log(error);
        });

    }

    const handleRejectButtonClick = async (id: string) => {
        await axios.put(
            `${process.env.REACT_APP_BACKEND}api/order/updateStatus/${id}`,
            {
                status: 3
            }
        ).then((res) => {
            getOrders();
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleAcceptButtonClick = async (id: string) => {
        await axios.put(
            `${process.env.REACT_APP_BACKEND}api/order/updateStatus/${id}`,
            {
                status: 1
            }
        ).then((res) => {
            getOrders();
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleFullfillButtonClick = async (id: string) => {
        await axios.put(
            `${process.env.REACT_APP_BACKEND}api/order/updateStatus/${id}`,
            {
                status: 2
            }
        ).then((res) => {
            getOrders();
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <LandingLayout>
            <DataTable title="Order" thead={['NAME', 'Address', 'ORDER DATE', 'DELIVERY DATE', 'STATUS', 'TOTAL', 'ACTION']} addButtonLink="">
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
                        <Td>
                            {data.status === 0 ?
                                <>
                                    <Tooltip label="Accept"><Button onClick={() => handleAcceptButtonClick(data._id)} leftIcon={<CheckIcon />} colorScheme='green'></Button></Tooltip> &nbsp;
                                    <Tooltip label="Reject"><Button onClick={() => handleRejectButtonClick(data._id)} leftIcon={<CloseIcon />} colorScheme='red'></Button></Tooltip>
                                </> : ""
                            }
                            {data.status === 1 ?
                                <>
                                    <Tooltip label="Fullfill"><Button onClick={() => handleFullfillButtonClick(data._id)} leftIcon={<CheckCircleIcon />} colorScheme='green'>Fullfill</Button></Tooltip> &nbsp;
                                </> : ""
                            }
                        </Td>
                    </Tr>
                ))}
            </DataTable>
        </LandingLayout>
    );
}

export default Order;