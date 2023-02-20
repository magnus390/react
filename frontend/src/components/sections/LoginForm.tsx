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
import decode from "jwt-decode";
import AlertMessage from "./AlertMessage";
import LandingLayout from "../layouts/LandingLayout";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [formValue, setformValue] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value,
        });
    };

    const userLogin = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        console.log(process.env.REACT_APP_BACKEND);
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND}api/auth`,
                {
                    email: formValue.email,
                    password: formValue.password,
                }
            );
            setIsLoggedIn(true);
            setIsLoading(false);
            if (response.data.token)
                localStorage.setItem("authorization", response.data.token);

            let { user }: any = decode(response.data.token);
            localStorage.setItem("user", JSON.stringify(user));
            if (user.isAdmin) {
                navigate("/dashboard");
            }


            axios.get(
                `${process.env.REACT_APP_BACKEND}api/users/${user.id}`
            ).then((res) => {

            }).catch((error) => {
                console.log(error);
            })

            //console.log(formValue);
        } catch (err) {
            setError("Invalid username or password");
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
                    {isLoggedIn ? (
                        <Box textAlign="center">
                            <Text>{formValue.email} logged in!</Text>
                            <Button
                                // variantcolor="orange"
                                variant="outline"
                                width="full"
                                mt={4}
                                onClick={() => setIsLoggedIn(false)}
                            >
                                Sign out
                            </Button>
                        </Box>
                    ) : (
                        <>
                            <Box textAlign="center">
                                <Heading>Login</Heading>
                            </Box>
                            <Box my={4} textAlign="left">
                                <form onSubmit={userLogin}>
                                    {error && <AlertMessage message={error} />}
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
                                            placeholder="****"
                                            size="lg"
                                            name="password"
                                            value={formValue.password}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                    <Button
                                        // variantcolor="teal"
                                        variant="outline"
                                        type="submit"
                                        width="full"
                                        mt={4}
                                    >
                                        {isLoading ? (
                                            <CircularProgress
                                                isIndeterminate
                                                size="24px"
                                                color="teal"
                                            />
                                        ) : (
                                            "Log In"
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