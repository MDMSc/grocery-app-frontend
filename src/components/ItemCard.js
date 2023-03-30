import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  Heading,
  HStack,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { GroceryState } from "../context/Context";
import { HiHeart, HiOutlineHeart, HiShoppingCart } from "react-icons/hi";

export default function ItemCard({ item }) {
  const [checkWishlist, setCheckWishlist] = useState(false);
  const [checkCart, setCheckCart] = useState(false);

  const { wishlist, setWishlist, cartList, setCartList } = GroceryState();

  const handleWishlist = () => {
    const filteredItem = wishlist.filter((i) => i.id === item.id);

    if (filteredItem.length) {
      setWishlist([...wishlist.filter((i) => i.id !== item.id)]);
      setCheckWishlist(false);
    } else {
      setWishlist([...wishlist, item]);
      setCheckWishlist(true);
    }
  };

  const handleAddCart = () => {
    const filteredItem = cartList.filter((i) => i.id === item.id);

    if (filteredItem.length) {
      setCartList([...cartList.filter((i) => i.id !== item.id)]);
      setCheckCart(false);
    } else {
      item.cartQuantity = 1;
      setCartList([...cartList, item]);
      setCheckCart(true);
    }
  };

  return (
    <Card
      direction={{ base: "column", md: "row" }}
      variant="outline"
      borderRadius="20px"
      boxShadow="0.5px 0.5px 2px"
    >
      <Image
        objectFit="scale-down"
        maxW={{ base: "80%", md: "11em" }}
        m="auto"
        src={item.img}
        alt={item.name}
      />

      <Stack width="100%">
        <CardBody>
          <Heading size={{ base: "xl", md: "md" }}>{item.name}</Heading>

          <Text
            py={2}
            mb={{base: 1, md: 5}}
            fontSize={{ base: "20px", md: "13px" }}
            height="5em"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "wrap",
            }}
          >
            {item.description}
          </Text>

          <Badge
            mt={{base: 1, md: 5}}
            p={1}
            textAlign="center"
            borderRadius="15px"
            variant="solid"
            bgColor={item.available >= 10 ? "green" : "#FFA96A"}
          >
            {item.available >= 10 ? (
              <span>Available</span>
            ) : (
              <span>Only {item.available} left</span>
            )}
          </Badge>
        </CardBody>

        <CardFooter
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Text fontWeight="bold" fontSize={{base: "20px", md: "15px"}}>{item.price}</Text>
          <HStack spacing={1}>
            <IconButton
              variant="ghost"
              size="xl"
              mx={3}
              icon={
                <HiShoppingCart size={28} color={checkCart ? "blue" : ""} />
              }
              onClick={handleAddCart}
            />

            {checkWishlist ? (
              <IconButton
                variant="ghost"
                size="xl"
                mx={3}
                icon={<HiHeart size={28} color="red" />}
                onClick={handleWishlist}
              />
            ) : (
              <IconButton
                variant="ghost"
                size="xl"
                mx={3}
                icon={<HiOutlineHeart size={28} />}
                onClick={handleWishlist}
              />
            )}
          </HStack>
        </CardFooter>
      </Stack>
    </Card>
  );
}
