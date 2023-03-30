import { Badge, Box, IconButton, Image, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { AddIcon, MinusIcon, CloseIcon } from "@chakra-ui/icons";
import { GroceryState } from "../context/Context";

export default function CartItemCard({ item, isDiscount, calculateAgain }) {
  const {
    list,
    cartList,
    setCartList,
    discountList,
    setDiscountList,
  } = GroceryState();

  const handleDecrement = () => {
    setCartList([
      ...cartList.map((i) => {
        if (i.id === item.id && i.cartQuantity > 1) {
          i.cartQuantity -= 1;
        }
        return i;
      }),
    ]);

    if (item.id === 642 || item.id === 532) {
      let remDiscItem = [];
      if (
        item.id === 642 &&
        Math.floor(item.cartQuantity / 6) <
          discountList.filter((i) => i.id === item.id).length
      ) {
        remDiscItem = discountList.filter((i) => i.id === item.id);
        remDiscItem.pop();
        setDiscountList([
          ...discountList.filter((i) => i.id !== item.id),
          ...remDiscItem,
        ]);
      }

      if (
        item.id === 532 &&
        Math.floor(item.cartQuantity / 3) <
          discountList.filter((i) => i.id === 641).length
      ) {
        remDiscItem = discountList.filter((i) => i.id === 641);
        remDiscItem.pop();
        setDiscountList([
          ...discountList.filter((i) => i.id !== 641),
          ...remDiscItem,
        ]);
      }
    }

  };

  const handleIncrement = () => {
    setCartList([
      ...cartList.map((i) => {
        if (i.id === item.id && i.cartQuantity < i.available) {
          i.cartQuantity += 1;
        }
        return i;
      }),
    ]);

    if (item.id === 642 || item.id === 532) {
      if (item.id === 642 && Math.floor(item.cartQuantity / 6) > 0) {
        if (
          Math.floor(item.cartQuantity / 6) >
          discountList.filter((i) => i.id === item.id).length
        ) {
          item.discountQty = 1;
          setDiscountList([...discountList, item]);
        }
      }

      if (item.id === 532 && Math.floor(item.cartQuantity / 3) > 0) {
        const coffee = list.filter((i) => i.id === 641);
        if (
          Math.floor(item.cartQuantity / 3) >
          discountList.filter((i) => i.id === 641).length
        ) {
          coffee[0].discountQty = 1;
          setDiscountList([...discountList, coffee[0]]);
        }
      }
    }
  };

  const handleRemove = () => {
    if (item.id === 642) {
      setDiscountList([...discountList.filter((i) => i.id !== item.id)]);
    }

    if (item.id === 532) {
      setDiscountList([...discountList.filter((i) => i.id !== 641)]);
    }

    setCartList([...cartList.filter((i) => i.id !== item.id)]);
  };

  useEffect(() => {
    calculateAgain();
  }, [cartList, discountList])

  return (
    <Box
      width="100%"
      height="13vh"
      style={{
        borderWidth: "1px",
        borderRadius: "20px",
        boxShadow: "0.5px 0.5px 2px",
      }}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
    >
      <Box width="20%" height="100%" p={1}>
        <Image
          w="100%"
          h="100%"
          src={item.img}
          alt={item.name}
          objectFit="cover"
        />
      </Box>

      <Box
        width="40%"
        height="100%"
        p={1}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="space-evenly"
      >
        <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
          {item.name}
        </Text>
        <Text fontSize="xs">Product id: {item.id}</Text>
      </Box>

      {isDiscount ? (
        <Box
          width="30%"
          height="100%"
          p={1}
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
        >
          <Text>Free</Text>
        </Box>
      ) : (
        <Box
          width="30%"
          height="100%"
          p={1}
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="space-evenly"
        >
          <Box width="6em" display="flex" justifyContent="space-between">
            <IconButton
              colorScheme="red"
              aria-label="Decrement quantity"
              size="xs"
              icon={<MinusIcon />}
              onClick={handleDecrement}
              isDisabled={item.cartQuantity === 1}
            />
            {item.cartQuantity}
            <IconButton
              colorScheme="green"
              aria-label="Increment quantity"
              size="xs"
              icon={<AddIcon />}
              onClick={handleIncrement}
              isDisabled={item.cartQuantity === item.available}
            />
          </Box>
          <Badge
            textAlign="center"
            borderRadius="20px"
            variant="solid"
            bgColor="#FFA96A"
            width="8em"
            display={item.available >= 10 ? "none" : "inline"}
          >
            Only {item.available} left
          </Badge>
        </Box>
      )}

      <Box
        width="30%"
        height="100%"
        p={3}
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box height="100%" display="flex" alignItems="center">
          <Text fontSize="sm" fontFamily="mono">
            {item.price}
          </Text>
        </Box>
        <IconButton
          colorScheme="green"
          aria-label="Decrement quantity"
          size="xs"
          icon={<CloseIcon />}
          onClick={handleRemove}
          isDisabled={isDiscount}
        />
      </Box>
    </Box>
  );
}
