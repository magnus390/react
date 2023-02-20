import {
    Box,
    Flex,
    Heading,
    HStack,
    Link,
    Stack,
    useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../slices/cartSlice";
import { CartItem } from "./CartItem";
import { CartOrderSummary } from "./CartOrderSummary";

const Index = () => {
    const cartSelector: {
        data: any;
    }[] = useSelector(selectCartItems);

    const totalCartPrice = () => {
        return cartSelector.reduce(
            (current, item: any) =>
                current + parseFloat(item.price) * parseInt(item.quantity),
            0
        );
    };

    return (
        <Box
            maxW={{ base: "3xl", lg: "7xl" }}
            mx="auto"
            px={{ base: "4", md: "8", lg: "12" }}
            py={{ base: "6", md: "8", lg: "12" }}
        >
            <Stack
                direction={{ base: "column", lg: "row" }}
                align={{ lg: "flex-start" }}
                spacing={{ base: "8", md: "16" }}
            >
                <Stack spacing={{ base: "8", md: "10" }} flex="2">
                    <Heading fontSize="2xl" fontWeight="extrabold">
                        Shopping Cart ({cartSelector?.length} Items)
                    </Heading>

                    <Stack spacing="6">
                        {cartSelector.map((cartItem) => (
                            <CartItem {...cartItem} />
                        ))}
                    </Stack>
                </Stack>

                <Flex direction="column" align="center" flex="1">
                    <>
                        <CartOrderSummary totalCartPrice={totalCartPrice()} />
                    </>
                </Flex>
            </Stack>
        </Box>
    );
};
export default Index;