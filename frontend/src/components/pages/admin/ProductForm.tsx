import { Box, Heading, FormControl, FormLabel, Input, FormErrorMessage, Textarea, Button, Select } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LandingLayout from "../../components/layouts/LandingLayout";

type productFormProp = {
    title: string
}

const ProductForm = (props: productFormProp) => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [formValue, setformValue] = useState({
        name: "",
        price: 0,
        photo: "",
        discount: 0,
        quantity: 0,
        description: "",
        category: {
            _id: "",
            name: ""
        }

    });

    const getProductData = async () => {
        await axios.get(
            `${process.env.REACT_APP_BACKEND}api/item/${id}`
        ).then((res) => {
            console.log(res.data[0])
            setformValue(
                {
                    name: res.data[0].name,
                    price: res.data[0].price,
                    //photo: "",
                    photo: res.data[0].photo,
                    discount: res.data[0].discount,
                    quantity: res.data[0].quantity,
                    description: res.data[0].description,
                    category: {
                        _id: res.data[0].category,
                        name: ""
                    }
                }
            )
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        if (id) {
            getProductData();
        }
        getCategories();
    }, [])

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value
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
                `${process.env.REACT_APP_BACKEND}api/item/${id}`,
                {
                    name: formValue.name,
                    price: formValue.price,
                    photo: formValue.photo,
                    discount: formValue.discount,
                    quantity: formValue.quantity,
                    description: formValue.description,
                    category: formValue.category
                }
            ).then(() => {
                console.log("Navigate")
                navigate("/product");
            }).catch((error) => {
                console.log(error);
            })
        } else {
            await axios.post(
                `${process.env.REACT_APP_BACKEND}api/item`,
                {
                    name: formValue.name,
                    price: formValue.price,
                    photo: formValue.photo,
                    discount: formValue.discount,
                    quantity: formValue.quantity,
                    description: formValue.description,
                    category: formValue.category
                }
            ).then(() => {
                navigate("/product");
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    const handleFormReset = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setformValue({
            name: "",
            price: 0,
            photo: "",
            discount: 0,
            quantity: 0,
            description: "",
            category: {
                _id: "",
                name: ""
            }
        });
    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setformValue({
            ...formValue,
            category: {
                _id: event.target.value,
                name: ""
            }
        });
    }

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

    return (
        <LandingLayout>
            <Box className="form" borderWidth='1px' borderRadius='lg'>
                <form onSubmit={handleOnSubmit}>
                    <Heading className="formHeading" as='h3' size='lg' noOfLines={1}>
                        {props.title} Product
                    </Heading>
                    <FormControl className="formControll">
                        <FormLabel htmlFor='name'>Name<span className="text-red">*</span></FormLabel>
                        <Input onChange={handleChangeInput} placeholder="Enter Product Name" id="name" name="name" value={formValue.name} />
                        <FormErrorMessage>Name is required.</FormErrorMessage>
                    </FormControl>
                    <FormControl className="formControll">
                        <FormLabel htmlFor='price'>price<span className="text-red">*</span></FormLabel>
                        <Input type="number" step=".01" min="0" onChange={handleChangeInput} placeholder="Enter Price" id="price" name="price" value={formValue.price} />
                        <FormErrorMessage>Price is required.</FormErrorMessage>
                    </FormControl>
                    <FormControl className="formControll">
                        <FormLabel htmlFor='photo'>Photo<span className="text-red">*</span></FormLabel>
                        <Input type="file" accept="image/*" onChange={handleChangeInput} id="photo" name="photo" />
                        <FormErrorMessage>Price is required.</FormErrorMessage>
                    </FormControl>
                    <FormControl className="formControll">
                        <FormLabel htmlFor='discount'>Discount %</FormLabel>
                        <Input type="number" min="0" onChange={handleChangeInput} placeholder="Enter Discount in %" id="discount" name="discount" value={formValue.discount} />
                    </FormControl>
                    <FormControl className="formControll">
                        <FormLabel htmlFor='quantity'>Quantity<span className="text-red">*</span></FormLabel>
                        <Input type="number" min="0" onChange={handleChangeInput} placeholder="Enter Quantity" id="quantity" name="quantity" value={formValue.quantity} />
                        <FormErrorMessage>Quantity is required.</FormErrorMessage>
                    </FormControl>
                    <FormControl className="formControll">
                        <FormLabel htmlFor='category'>Category<span className="text-red">*</span></FormLabel>
                        <Select onChange={handleSelectChange} name="category" placeholder='Select Category'>
                            {categories.map((category)=>(
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className="formControll">
                        <FormLabel htmlFor='description'>Description<span className="text-red">*</span></FormLabel>
                        <Textarea onChange={handleChangeTextArea} resize={"vertical"} rows={10} placeholder="Enter Category Description" id="description" name="description" value={formValue.description} />
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

export default ProductForm;