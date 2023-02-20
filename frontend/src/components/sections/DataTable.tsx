import { AddIcon } from "@chakra-ui/icons";
import { Table, Thead, Tr, Th, Tbody, Heading, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type DataTableProp = {
    title?: string,
    thead: string[],
    children: any,
    addButtonLink: string
}

const DataTable = (props: DataTableProp) => {

    const navigate = useNavigate();

    const addButtonHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        navigate(props.addButtonLink);
    }

    return (
        <>
            <div style={{ "display": "flex", "marginBottom": "10px" }}>
                <Heading width="-webkit-fit-content" as='h2' size="lg">{props.title}</Heading>
                {
                    props.addButtonLink ? (
                        <Button onClick={addButtonHandler} marginLeft="auto" leftIcon={<AddIcon />} width="100px" colorScheme="whatsapp">Add</Button>
                    ) : (
                        <></>
                    )
                }
            </div>
            <Table size={"md"} variant='striped' colorScheme='gray'>
                <Thead>
                    <Tr>
                        {props.thead.map((heading, index) => (
                            <Th key={index}>{heading}</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {props.children}
                </Tbody>
            </Table>
        </>
    );
}

export default DataTable;