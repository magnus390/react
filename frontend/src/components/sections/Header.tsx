import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    Box,
    Flex,
    Text,
    Button,
    useColorMode,
    useDisclosure,
} from "@chakra-ui/react";
import Logo from "../ui/Logo";
import { isTokenValid } from "../auth/ProtectedRoute";
import Modal from "./Modal";
type menuItemProps = {
    children: React.ReactNode;
    to: string;
    isLast: any;
};
const MenuItem = ({ children, isLast, to = "/", ...rest }: any) => {
    return (
        <Text
            mb={{ base: isLast ? 0 : 8, sm: 0 }}
            mr={{ base: 0, sm: isLast ? 0 : 8 }}
            display="block"
            {...rest}
        >
            <Link to={to}>{children}</Link>
        </Text>
    );
};

const CloseIcon = () => (
    <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <title>Close</title>
        <path
            fill="white"
            d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
        />
    </svg>
);

const MenuIcon = () => (
    <svg
        width="24px"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
    >
        <title>Menu</title>
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
    </svg>
);

const Header = (props: any) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [show, setShow] = React.useState(false);
    const toggleMenu = () => setShow(!show);
    const location = useLocation();

    const user: any = JSON.parse(localStorage.getItem("user") || "{}");
    // console.log(user);

    const navigate = useNavigate();
    const handleLogout = () => {
        navigate("/");
        localStorage.clear();
    };

    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            mb={8}
            p={8}
            bg={["primary.500", "primary.500", "transparent", "transparent"]}
            color="blue"
            {...props}
        >
            <Flex align="center">
                <Logo
                    w="100px"
                    color={["white", "white", "primary.500", "primary.500"]}
                />
            </Flex>

            <Box display={{ base: "block", md: "none" }} onClick={toggleMenu}>
                {show ? <CloseIcon /> : <MenuIcon />}
            </Box>

            <Box
                display={{ base: show ? "block" : "none", md: "block" }}
                flexBasis={{ base: "100%", md: "auto" }}
            >
                <Flex
                    align="center"
                    justify={["center", "space-between", "flex-end", "flex-end"]}
                    direction={["column", "row", "row", "row"]}
                    pt={[4, 4, 0, 0]}
                >
                    {user != null && user.isAdmin ? (
                        // Admin menu
                        <>
                            <MenuItem to="/dashboard">Dashboard</MenuItem>
                            <MenuItem to="/user">User</MenuItem>
                            <MenuItem to="/category">Category</MenuItem>
                            <MenuItem to="/product">Product</MenuItem>
                            <MenuItem to="/order">Order</MenuItem>
                        </>
                    ) : (
                        // User menu
                        <>
                            <MenuItem to="/">Home</MenuItem>
                            <MenuItem to="/products">Products </MenuItem>
                            <MenuItem to="/wishlist">Wishlist </MenuItem>
                            <MenuItem to="/cart">Cart </MenuItem>
                        </>
                    )}

                    {isTokenValid() ? (
                        <MenuItem isLast>
                            <Button
                                size="sm"
                                rounded="md"
                                color={["primary.500", "primary.500", "white", "white"]}
                                bg="blue"
                                _hover={{
                                    bg: [
                                        "primary.100",
                                        "primary.100",
                                        "primary.600",
                                        "primary.600",
                                    ],
                                }}
                                onClick={handleLogout}
                            >
                                Log Out
                            </Button>
                        </MenuItem>
                    ) : (
                        <>
                            <MenuItem to="/login" isLast>
                                <Button
                                    size="sm"
                                    rounded="md"
                                    color={["primary.500", "primary.500", "white", "white"]}
                                    bg="blue"
                                    _hover={{
                                        bg: [
                                            "primary.100",
                                            "primary.100",
                                            "primary.600",
                                            "primary.600",
                                        ],
                                    }}
                                >
                                    Log In
                                </Button>
                            </MenuItem>

                            <MenuItem to="/signup" isLast>
                                <Button
                                    marginLeft={"10px"}
                                    size="sm"
                                    rounded="md"
                                    color={["primary.500", "primary.500", "white", "white"]}
                                    bg="blue"
                                    _hover={{
                                        bg: [
                                            "primary.100",
                                            "primary.100",
                                            "primary.600",
                                            "primary.600",
                                        ],
                                    }}
                                >
                                    Sign Up
                                </Button>
                            </MenuItem>
                        </>
                    )}

                    {/* <Stack align='center' direction='row'>
            <Switch size='md'  onChange={() => toggleColorMode()}/>
          </Stack> */}
                </Flex>
            </Box>
            <Modal onClose={onClose} onOpen={onOpen} isOpen={isOpen} />
        </Flex>
    );
};

export default Header;