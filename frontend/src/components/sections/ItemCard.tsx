import {
    Box,
    Image,
    Badge,
    Text,
    Stack,
    Button,
    useColorMode,
    Flex,
    Spacer,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../slices/wishlistSlices";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { addToCart } from "../../slices/cartSlice";

export type ItemCardProps = {
    data: any;
};

const ItemCard = (props: ItemCardProps) => {
    const { colorMode } = useColorMode();
    const bgColor = { light: "gray.200", dark: "gray.700" };
    const textColor = { light: "gray.500", dark: "gray.100" };
    const [isWishlist, SetIsWishlist] = useState(false);
    const dispatch = useDispatch();

    const addItemToWishlist = () => {
        const product = {
            photo: props.data.photo,
            id: props.data._id,
            category: props.data.name,
            price: props.data.price,
            name: props.data.name
        };

        //Sending the product as an action to the Redux Store .. the basket slice
        dispatch(addToWishlist(product));
        SetIsWishlist((current) => !current);
    };

    const addItemToCart = () => {
        dispatch(addToCart(props.data));
    };

    const removeItemFromWishlist = () => {
        const productID = {
            id: props.data._id,
        }; // Remove item from redux
        dispatch(removeFromWishlist(productID));
        SetIsWishlist((current) => !current);
    };

    return (
        <Box
            w="300px"
            rounded="20px"
            overflow="hidden"
            boxShadow="sm"
            bg="#c5e3ec"
            height="auto"
        >
            <NavLink to={`/product/${props.data._id}`}>
                <Image
                    src={`${process.env.REACT_APP_IMAGES_BACKEND}${props.data.photo}`}
                    alt="Course Cover"
                    width="300px"
                    height="168px"
                />
            </NavLink>
            <Box p={1}>
                <Stack isInline align="baseline">
                    <Badge variant="solid" rounded="full" px={2}>
                        {props.data.name}
                    </Badge>
                </Stack>
                <Flex>
                    {" "}
                    <Text color="blue" as="h2" fontWeight="semibold" fontSize="xl" my={2}>
                        {props.data.name}
                    </Text>{" "}
                    <Spacer />
                    {!isWishlist && (
                        <Button variant="outline" size="lg" onClick={addItemToWishlist}>

                            <AiOutlineHeart />
                        </Button>
                    )}
                    {isWishlist && (
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={removeItemFromWishlist}
                        >

                            <AiFillHeart />
                        </Button>
                    )}
                </Flex>

                <Stack isInline justify="space-between" color={textColor[colorMode]}>
                    <Text color="blue" fontWeight="semibold" fontSize="lg">
                        ${props.data.price} / LB
                    </Text>
                    <Box>
                        <Box as="span">
                            {Array(4)
                                .fill("")
                                .map((_, i) => (
                                    <StarIcon name="star" color="teal.500" key={i} />
                                ))}
                            <StarIcon name="star" mr="2" />
                        </Box>
                        <Text color="blue" as="h3" fontSize="lg" fontWeight="semibold">
                            34 Reviews
                        </Text>
                    </Box>
                </Stack>
                <Box textAlign="center">
                    <Button
                        // variantcolor="teal"
                        size="lg"

                        mt={3}
                        boxShadow="sm"
                        _hover={{ boxShadow: "md" }}
                        _active={{ boxShadow: "lg" }}
                        onClick={addItemToCart}
                    >
                        Add To Cart
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default ItemCard;