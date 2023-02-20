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
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { removeFromWishlist } from "../../slices/wishlistSlices";

export type WishlitCardProps = {
    data: any;
};

const WishlistCard = (props: WishlitCardProps) => {
    const { colorMode } = useColorMode();

    const textColor = { light: "gray.500", dark: "gray.100" };

    const dispatch = useDispatch();

    const removeItemFromWishlist = () => {
        const productID = {
            id: props.data.id,
        };

        dispatch(removeFromWishlist(productID));
    };

    return (
        <Box
            w="300px"
            bg="#c5e3ec"
            rounded="20px"
            overflow="hidden"
            boxShadow="sm"
            height="auto"
        >
            <Image
                src={`${process.env.REACT_APP_IMAGES_BACKEND}${props.data.photo}`}
                alt="Course Cover"
                width="300px"
                height="168px"
            />

            <Box p={1}>
                <Stack isInline align="baseline">
                    <Badge variant="solid" rounded="full" px={2}>
                        {props.data.category.name}
                    </Badge>
                </Stack>
                <Flex>
                    {" "}
                    <Text color="blue" as="h2" fontWeight="semibold" fontSize="xl" my={2}>
                        {props.data.name}
                    </Text>{" "}
                    <Spacer />
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
                        size="lg"
                        mt={3}
                        boxShadow="sm"
                        _hover={{ boxShadow: "md" }}
                        _active={{ boxShadow: "lg" }}
                        onClick={removeItemFromWishlist}
                    >
                        Remove From Wishlist
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default WishlistCard