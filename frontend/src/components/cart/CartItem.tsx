import {
    CloseButton,
    Flex,
    Link,
    Select,
    SelectProps,
    useColorModeValue,
} from "@chakra-ui/react";
import { PriceTag } from "./PriceTag";
import { CartProductMeta } from "./CartProductMeta";
import { useDispatch } from "react-redux";
import { onChangeQuantity, removeFromCart } from "../../slices/cartSlice";
import { useState } from "react";

type CartItemProps = {
    isGiftWrapping?: boolean;
    name: string;
    description: string;
    quantity: number;
    price: number;
    currency: string;
    imageUrl: string;
    onChangeQuantity?: (quantity: number) => void;
    onClickGiftWrapping?: () => void;
    onClickDelete?: () => void;
};

const QuantitySelect = (props: SelectProps) => {
    return (
        <Select
            maxW="64px"
            aria-label="Select quantity"
            focusBorderColor={useColorModeValue("blue.500", "blue.200")}
            {...props}
        >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </Select>
    );
};

export const CartItem = (props: any) => {
    const dispatch = useDispatch();
    const [itemCount, setItemCount] = useState(1);

    return (
        <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align="center"
        >
            <CartProductMeta
                name={props.name}
                description={props.description}
                image={props.photo}
            // isGiftWrapping={isGiftWrapping}
            />

            {/* Desktop */}
            <Flex
                width="full"
                justify="space-between"
                display={{ base: "none", md: "flex" }}
            >
                <QuantitySelect
                    value={itemCount}
                    onChange={(e) => {
                        setItemCount(parseInt(e.currentTarget.value));
                        dispatch(
                            onChangeQuantity({
                                id: props._id,
                                quantity: e.currentTarget.value,
                            })
                        );
                    }}
                />
                <PriceTag price={parseInt(props.price) * props.quantity} />
                <CloseButton
                    aria-label={`Delete ${props.name} from cart`}
                    // )
                    onClick={() =>
                        dispatch(
                            removeFromCart({
                                id: props._id,
                            })
                        )
                    }
                />
            </Flex>

            {/* Mobile */}
            <Flex
                mt="4"
                align="center"
                width="full"
                justify="space-between"
                display={{ base: "flex", md: "none" }}
            >
                <Link fontSize="sm" textDecor="underline">
                    Delete
                </Link>
                <QuantitySelect
                    value={props.quantity}
                    onChange={(e) => {
                        props.onChangeQuantity?.(+e.currentTarget.value);
                    }}
                />
                <PriceTag price={props.price} />
            </Flex>
        </Flex>
    );
};