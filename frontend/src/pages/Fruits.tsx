import { useState, useEffect } from "react";
import axios from "axios";
import { Box, SimpleGrid } from "@chakra-ui/react";
import LandingLayout from "../components/layouts/LandingLayout";
import ItemCard from "../components/sections/ItemCard";

type ItemData = {
  photo: string;
  _id: string;
};

const Fruits = () => {
  const [items, setItems] = useState<ItemData[]>([]);

  const getImage = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND}api/item`);
      res.data.forEach((element: any) => {
        element.quantity = 1;
      });
      setItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getImage();
    return () => {
      setItems([]);
    };
  }, []);

  return (
    <>
      <LandingLayout>
        <SimpleGrid columns={4} w="-webkit-fit-content" spacing={10}>
          {items.map((items) => (
            <Box>
              <ItemCard key={items._id} data={items} />
            </Box>
          ))}
        </SimpleGrid>
      </LandingLayout>
    </>
  );
};

export default Fruits;
