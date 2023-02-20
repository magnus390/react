import {
    Box,
    HStack,
    Icon,
    Image,
    Link,
    Stack,
    Text,
    useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react';



export const CartProductMeta = (props: any) => {
    // const { isGiftWrapping = true, image, name, description } = props
    return (
        <Stack direction="row" spacing="5" width="full">
            <Image
                rounded="lg"
                width="120px"
                height="120px"
                fit="cover"
                src={`${process.env.REACT_APP_IMAGES_BACKEND}${props.image}`}
                alt={props.name}
                draggable="false"
                loading="lazy"
            />
            <Box pt="4">
                <Stack spacing="0.5">
                    <Text fontWeight="medium">{props.name}</Text>
                    <Text color={mode('gray.600', 'gray.400')} fontSize="sm">
                        {props.description}
                    </Text>
                </Stack>

            </Box>
        </Stack>
    )
}