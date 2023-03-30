import { Container, Text } from '@chakra-ui/react'
import React from 'react'
import Header from '../components/Header'

export default function PaymentPage() {
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
      <Text fontWeight="bold" color="red.800">Payment Page is not a part of the problem statement. In Progress...</Text>
    </Container>
  )
}
