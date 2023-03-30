import { Container } from "@chakra-ui/react";
import React from "react";
import CartList from "../components/CartList";
import Header from "../components/Header";

export default function CheckoutPage() {
  return (
    <Container
      display="flex"
      flexDirection="column"
      maxW="xxl"
      mx={{ base: "4vw", md: "15vw"}}
      px={{ base: "1vw", md: "5vw"}}
      pt="5vh"
    >
      <Header />
      <CartList />
    </Container>
  );
}
