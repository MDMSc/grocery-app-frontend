import { Box, Button, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { GroceryState } from "../context/Context";
import ItemCard from "./ItemCard";

export default function ItemList({search}) {
  const [filter, setFilter] = useState("all");

  const {list, setList} = GroceryState();

  const getData = () => {
    fetch(
      `https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s?category=${search ? search : filter}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setList(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getData();
  }, [filter, search]);

  return (
    <Box display="flex" flexDirection="column">
      <Box mt={2} mb={4}>
        <Button
          colorScheme="white"
          color="black"
          borderWidth="1px"
          borderRadius="40px"
          width="100px"
          boxShadow="0.5px 0.5px 2px"
          mr={3}
          onClick={() => setFilter("all")}
        >
          All items
        </Button>

        <Button
          colorScheme="white"
          color="black"
          borderWidth="1px"
          borderRadius="40px"
          width="100px"
          boxShadow="0.5px 0.5px 2px"
          mr={3}
          onClick={() => setFilter("drinks")}
        >
          Drinks
        </Button>

        <Button
          colorScheme="white"
          color="black"
          borderWidth="1px"
          borderRadius="40px"
          width="100px"
          boxShadow="0.5px 0.5px 2px"
          mr={3}
          onClick={() => setFilter("fruit")}
        >
          Fruit
        </Button>

        <Button
          colorScheme="white"
          color="black"
          borderWidth="1px"
          borderRadius="40px"
          width="100px"
          boxShadow="0.5px 0.5px 2px"
          mr={3}
          onClick={() => setFilter("bakery")}
        >
          Bakery
        </Button>
      </Box>

      <Text fontWeight="bold" fontSize={{ base: "23px", md: "28px" }}>
        Trending Items
      </Text>

      <SimpleGrid
        spacing={3}
        templateColumns="repeat(auto-fill, minmax(20em, 1fr))"
        my={5}
      >
        {
          list.length ? list.map((item, index) => (
            <ItemCard key={index} item={item} />
          )) : <p>Loading...</p>
        }
      </SimpleGrid>
    </Box>
  );
}
