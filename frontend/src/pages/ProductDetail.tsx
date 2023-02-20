import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  StackDivider,
  useColorModeValue,
  Text,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Route, useParams } from "react-router-dom";
import LandingLayout from "../components/layouts/LandingLayout";
import Review from "../components/sections/Review";
import ReviewFormComponent from "../components/sections/ReviewForm";

type ProductDetailProp = {};

const ProductDetail = (props: ProductDetailProp) => {
  const [productData, setProductData] = useState({
    name: "",
    price: 0,
    photo: "",
    offer: {},
    quantity: 0,
    description: "",
    category: {},
    reviews: [],
  });

  const { id } = useParams();

  const getProductData = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND}api/item/${id}`)
      .then((res) => {
        setProductData(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <LandingLayout>
      <Container maxW={"7xl"}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, md: 10 }}>
          <Flex>
            <Image
              rounded={"md"}
              alt={"product image"}
              src={`${process.env.REACT_APP_IMAGES_BACKEND}${productData.photo}`}
              fit={"fill"}
              align={"center"}
              w={"100%"}
              h={"450px"}
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={"header"}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
              >
                {productData.name}
              </Heading>
              <Text
                color={useColorModeValue("gray.900", "gray.400")}
                fontWeight={300}
                fontSize={"2xl"}
              >
                ${productData.price} CAD / LB
              </Text>
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={"column"}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.200", "gray.600")}
                />
              }
            >
              <Box minH="220px">
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={useColorModeValue("yellow.500", "yellow.300")}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Product Details
                </Text>
                <Text>{productData.description}</Text>
              </Box>
            </Stack>

            <Button
              rounded={"none"}
              w={"full"}
              mt={8}
              size={"lg"}
              py={"7"}
              bg={useColorModeValue("gray.900", "gray.50")}
              color={useColorModeValue("white", "gray.900")}
              textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
            >
              Add To Cart
            </Button>
          </Stack>
          <Review
            firstName="John"
            lastName="Doe"
            profilePic="https://images.pexels.com/photos/7129713/pexels-photo-7129713.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            stars={5}
            comment="This is a product review"
            timestamp={3}
            productDetail={productData}
          />
          <ReviewFormComponent currentItem={id} />
        </SimpleGrid>
      </Container>
    </LandingLayout>
  );
};

export default ProductDetail;
