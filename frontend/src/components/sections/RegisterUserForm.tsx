import { useState } from "react";
import {
    Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    CircularProgress,
    Text,
} from "@chakra-ui/react";
import axios from "axios";

import AlertMessage from "./AlertMessage";
import LandingLayout from "../layouts/LandingLayout";
import { decode } from "punycode";

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [isSignedIn, setIsSignedIn] = useState(false);

    const [formValue, setformValue] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        gender: "",
        phone: "",
        photo: "",
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setformValue({
            ...formValue,
            [event.target.name]:
                event.target.type === "file" && event.target.files?.length
                    ? event.target.files[0]
                    : event.target.value,
        });
    };

    const userSignin = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);
        let formData = new FormData();

        formData.append("name", formValue.name);
        formData.append("username", formValue.username);
        formData.append("email", formValue.email);
        formData.append("password", formValue.password);
        formData.append("gender", formValue.gender);
        formData.append("phone", formValue.phone);
        formData.append("photo", formValue.photo);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND}api/users`,
                formData
            );
            setIsSignedIn(true);
            setIsLoading(false);

            if (response.data.token)
                localStorage.setItem("authorization", response.data.token);

            let { user }: any = decode(response.data.token);
            localStorage.setItem("user", JSON.stringify(user));
        } catch (err) {
            setError("Something Went Wrong!");
            setIsLoading(false);
            console.log(err);
        }
    };

    return (
        <>
            <LandingLayout />
            <Flex width="full" align="center" justifyContent="center">
                <Box
                    p={8}
                    maxWidth="500px"
                    borderWidth={1}
                    borderRadius={8}
                    boxShadow="lg"
                >
                    {isSignedIn ? (
                        <Box textAlign="center">
                            <Text>{formValue.username} Signed in!</Text>
                            <Button
                                // variantcolor="orange"
                                variant="outline"
                                width="full"
                                mt={4}
                                onClick={() => setIsSignedIn(false)}
                            >
                                Sign out
                            </Button>
                        </Box>
                    ) : (
                        <>
                            <Box textAlign="center">
                                <Heading>Sign Up</Heading>
                            </Box>
                            <Box my={4} textAlign="left">
                                <form onSubmit={userSignin}>
                                    {error && <AlertMessage message={error} />}
                                    <FormControl isRequired>
                                        <FormLabel>Name</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="Name"
                                            size="lg"
                                            name="name"
                                            value={formValue.name}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>User Name</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="Username"
                                            size="lg"
                                            name="username"
                                            value={formValue.username}
                                            onChange={handleChange}
                                        />
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>Email</FormLabel>
                                        <Input
                                            type="email"
                                            placeholder="test@test.com"
                                            size="lg"
                                            name="email"
                                            value={formValue.email}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                    <FormControl isRequired mt={6}>
                                        <FormLabel>Password</FormLabel>
                                        <Input
                                            type="password"
                                            placeholder="***"
                                            size="lg"
                                            name="password"
                                            value={formValue.password}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Gender</FormLabel>
                                        <Input
                                            type="text"
                                            // placeholder="Gender"
                                            size="lg"
                                            name="gender"
                                            placeholder="Male/Female"
                                            value={formValue.gender}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Phone</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="Phone"
                                            size="lg"
                                            name="phone"
                                            value={formValue.phone}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Upload Profile Picture</FormLabel>
                                        <Input
                                            type="file"
                                            placeholder="Upload a pic"
                                            size="lg"
                                            name="photo"
                                            multiple={false}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                    <Button variant="outline" type="submit" width="full" mt={4}>
                                        {isLoading ? (
                                            <CircularProgress
                                                isIndeterminate
                                                size="24px"
                                                color="teal"
                                            />
                                        ) : (
                                            "Sign Up"
                                        )}
                                    </Button>
                                </form>
                            </Box>
                        </>
                    )}
                </Box>
            </Flex>
        </>
    );
}