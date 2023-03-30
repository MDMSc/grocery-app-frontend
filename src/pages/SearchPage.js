import { Container } from "@chakra-ui/react";
import React, { useState } from "react";
import Header from "../components/Header";
import ItemList from "../components/ItemList";

export default function SearchPage() {
  const [search, setSearch] = useState("");

  return (
    <Container
      display="flex"
      flexDirection="column"
      maxW="xxl"
      mx={{ base: "4vw", md: "15vw"}}
      px={{ base: "1vw", md: "5vw"}}
      pt="5vh"
    >
      <Header setSearch={setSearch} />
      <ItemList search={search} />
    </Container>
  );
}
