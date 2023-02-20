import { SimpleGrid } from "@chakra-ui/react";
import LandingLayout from "../components/layouts/LandingLayout";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/wishlistSlices";
import WishlistCard from "../components/sections/WishlistCard";

const Wishlist = () => {

  const wishList: {
   data: any;
  }[] = useSelector(selectItems);
 
  return (
    <LandingLayout>
      {wishList.length === 0 ? "Your Wishlist  Is Empty." : ""}
      {wishList.length > 0 && (
        <SimpleGrid
        columns={2} w="-webkit-fit-content" spacing={10}>
          {wishList.map((items, i) => (
            <WishlistCard  key={i} data={items} />
          ))}
        </SimpleGrid>
      )}
    </LandingLayout>
  );
};

export default Wishlist;
