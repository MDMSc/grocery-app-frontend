import { Box, Button, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GroceryState } from "../context/Context";
import CartItemCard from "./CartItemCard";

export default function CartList() {
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);

  const { cartList, discountList } = GroceryState();
  const navigate = useNavigate();

  const getSubtotal = () => {
    const subAmt = cartList.reduce((accum, i) => {
      accum += Number(i.price.split("£")[1]) * i.cartQuantity;
      return accum;
    }, 0);

    const discAmt = discountList.reduce((accum, i) => {
      accum += Number(i.price.split("£")[1]) * i.discountQty;
      return accum;
    }, 0);

    setSubtotal(subAmt + discAmt);
  };

  const getDiscount = () => {
    const discAmt = discountList.reduce((accum, i) => {
      accum += Number(i.price.split("£")[1]) * i.discountQty;
      return accum;
    }, 0);

    setDiscount(discAmt);
  };

  useEffect(() => {
    getSubtotal();
    getDiscount();
  }, []);

  const calculateAgain = () => {
    getSubtotal();
    getDiscount();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      width={{ base: "100%", md: "87%" }}
      mb={5}
    >
      <Text fontWeight="bold" fontSize={{ base: "23px", md: "28px" }} my={5}>
        Checkout
      </Text>

      <SimpleGrid
        spacing={3}
        templateRows="repeat(auto-fill, minmax(5em, 1fr))"
        my={5}
      >
        {cartList.length ? (
          cartList.map((i, index) => (
            <CartItemCard
              key={index}
              item={i}
              isDiscount={false}
              calculateAgain={calculateAgain}
            />
          ))
        ) : (
          <Text textAlign="center" fontSize="2xl" color="red.800">
            Cart is Empty...
          </Text>
        )}

        {discountList.length ? (
          discountList.map((i, index) => (
            <CartItemCard
              key={index}
              item={i}
              isDiscount={true}
              calculateAgain={calculateAgain}
            />
          ))
        ) : (
          <></>
        )}
      </SimpleGrid>

      <Box display="flex" flexDirection="column" width="100%" mt={4}>
        <Box height="5em" style={{ borderWidth: "1px 0px" }} display="flex">
          <Box
            width="60%"
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            mr={10}
            px={5}
          >
            <Text fontWeight="bold">Subtotal</Text>
          </Box>
          <Box
            width="40%"
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            ml={10}
            px={5}
          >
            <Text fontSize="lg" color="grey">
              {`£${subtotal.toFixed(2)}`}
            </Text>
          </Box>
        </Box>
        <Box height="5em" style={{ borderWidth: "1px 0px" }} display="flex">
          <Box
            width="60%"
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            mr={10}
            px={5}
          >
            <Text fontWeight="bold">Discount</Text>
          </Box>
          <Box
            width="40%"
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            ml={10}
            px={5}
          >
            <Text fontSize="lg" color="grey">
              {`£${discount.toFixed(2)}`}
            </Text>
          </Box>
        </Box>
        <Box
          height={{ base: "8em", md: "5em" }}
          style={{ borderWidth: "1px 0px" }}
          display="flex"
        >
          <Box
            width="60%"
            display="flex"
            justifyContent="flex-end"
            alignItems={{ base: "start", md: "center" }}
            mr={10}
            mt={{ base: 7, md: 0 }}
            px={5}
          >
            <Text fontWeight="bold">Total</Text>
          </Box>
          <Box
            width="40%"
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            justifyContent={{ base: "space-around", md: "space-between" }}
            alignItems={{ base: "flex-start", md: "center" }}
            ml={10}
            px={5}
          >
            <Text fontSize="lg" color="grey" mt={{ base: 4 }} mr={{ md: 2 }}>
              {`£${(subtotal - discount).toFixed(2)}`}
            </Text>
            <Button
              ml={{ md: 2 }}
              colorScheme="green"
              onClick={() => navigate("/payment")}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
