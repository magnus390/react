import { FormControl, FormLabel, Input, Box, Heading, Textarea, Button, FormErrorMessage } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LandingLayout from "../../components/layouts/LandingLayout";

type categotyFromProps = {
    title: string
}

const CategoryForm = (props: categotyFromProps) => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [formValue, setformValue] = useState({
        name: "",
        description: ""
    });

    const getCategoryData = async () => {
        await axios.get(
            `${process.env.REACT_APP_BACKEND}api/category/${id}`
        ).then((res) => {
            console.log(res.data[0])
            setformValue(
                {
                    name: res.data[0].name,
                    description: res.data[0].description
                }
            )
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        if (id) {
            getCategoryData();
        }
    }, [])

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value,
        });
    };

    const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        if (id) {
            await axios.put(
                `${process.env.REACT_APP_BACKEND}api/category/${id}`,
                {
                    name: formValue.name,
                    description: formValue.description
                }
            ).then(() => {
                console.log("Navigate")
                navigate("/category");
            }).catch((error) => {
                console.log(error);
            })
        } else {
            await axios.post(
                `${process.env.REACT_APP_BACKEND}api/category`,
                {
                    name: formValue.name,
                    description: formValue.description
                }
            ).then(() => {
                navigate("/category");
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    const handleFormReset = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setformValue({
            name: "",
            description: ""
        });
    }

    return (
        <LandingLayout>
            <Box className="form" borderWidth='1px' borderRadius='lg'>
                <form onSubmit={handleOnSubmit}>
                    <Heading className="formHeading" as='h3' size='lg' noOfLines={1}>
                        {props.title} Category
                    </Heading>
                    <FormControl className="formControll">
                        <FormLabel htmlFor='text'>Name<span className="text-red">*</span></FormLabel>
                        <Input onChange={handleChangeInput} placeholder="Enter Category Name" name="name" value={formValue.name} />
                        <FormErrorMessage>Name is required.</FormErrorMessage>
                    </FormControl>
                    <FormControl className="formControll">
                        <FormLabel htmlFor='text'>Description<span className="text-red">*</span></FormLabel>
                        <Textarea onChange={handleChangeTextArea} resize={"vertical"} rows={10} placeholder="Enter Category Description" name="description" value={formValue.description} />
                        <FormErrorMessage>Description is required.</FormErrorMessage>
                    </FormControl>
                    <FormControl className="formControll" >
                        <Button colorScheme="green" type="submit">{props.title}</Button>
                        &nbsp;
                        <Button colorScheme="red" onClick={handleFormReset}>Clear</Button>
                    </FormControl>
                </form>
            </Box>
        </LandingLayout>
    );
}

export default CategoryForm;
