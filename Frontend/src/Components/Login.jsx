import React, { useState } from 'react'
import { Button, FormControl, FormLabel, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleClick = () => setShow(!show);
  const submitHandler = () => {}

  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)}/>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
        <Input placeholder="Enter your Password" type={show? 'text' : 'password'} onChange={(e)=>setPassword(e.target.value)}/>
        <InputRightElement width="3.5rem">
        <Button h="1.7rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
        </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
      colorScheme="blue"
      width={"100%"}
      style={{marginTop:15}}
      onClick={submitHandler}>
      Login
      </Button>
      <Button
      variant="solid"
      colorScheme="red"
      width={"100%"}
      onClick={()=> {
        setEmail("abc123@gnail.com");
        setPassword("abc123");
      }}>
      Get Guest User Credentials
      </Button>
    </VStack>
  )
}

export default Login
