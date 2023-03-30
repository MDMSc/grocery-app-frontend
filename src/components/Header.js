import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { GroceryState } from "../context/Context";
import {CiSliderHorizontal} from "react-icons/ci";

export default function Header({setSearch}) {

  const {wishlist, cartList} = GroceryState();
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      my={5}
    >
      <Text fontWeight="bold" mr={{base: 2, md: 3}}>
        GROCERIES
      </Text>

      <InputGroup display="flex" alignItems="center" justifyContent="center" mx={{base: 1, md: 5}}>
        <Input
          variant="outline"
          placeholder="Search"
          borderWidth="50%"
          size="lg"
          borderRadius="20px"
          boxShadow="0.5px 0.5px 4px"
          onChange={(e) => setSearch(e.target.value)}
        />
        <InputRightElement mr={3} my={1} children={<IconButton variant="ghost" size="xl" icon={<CiSliderHorizontal size={24} />} />} />
      </InputGroup>
      
      <Box
        ml={{base: 1, md: 3}}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Button
          variant="ghost"
          size="2xl"
          display="flex"
          alignItems="start"
          mx={3}
        >
          <i className="fa-solid fa-heart fa-2xl" style={{ color: "red" }} />
          {
            wishlist.length ? <Badge
            variant="solid"
            colorScheme="red"
            borderRadius="50px"
            ml={1}
          >
            {wishlist.length}
          </Badge> : <></>
          }
        </Button>

        <Avatar
          size="md"
          name="Murtaza Samim CHoudhury"
          src="https://bit.ly/broken-link"
          mx={2}
        />

        <Button
          variant="ghost"
          size="2xl"
          display="flex"
          alignItems="start"
          mx={3}
          onClick={() => navigate("/checkout")}
        >
          <i className="fa-solid fa-cart-shopping fa-2xl" />
          {
            cartList.length ? <Badge
            variant="solid"
            colorScheme="blue"
            borderRadius="50px"
            ml={1}
          >
            {cartList.length}
          </Badge> : <></>
          }
        </Button>
      </Box>
    </Box>
  );
}
