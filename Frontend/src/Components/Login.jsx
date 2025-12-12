import React, { useState } from 'react'
import { useToast, Button, FormControl, FormLabel, InputGroup, InputRightElement, VStack, Input } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false)
  const toast = useToast();
  
  const navigate = useNavigate()

  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    console.log("[SignIn] Submit payload", { email, password});
    setLoading(true)
    if (!email || !password) {
      toast({
        title: "Please fill all fields",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false)
      return;
    }

    try {
      const config = {
        headers : {
          "Content-Type" : "application/json"
        },
      };

      setLoading(true)
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
       toast({
        title: "Login Successful",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
       localStorage.setItem("userInfo", JSON.stringify(data));
       setEmail("")
       setPassword("")
       setLoading(false)
       navigate("/chats")
    } catch (error) {
      console.error('[Signin] error', error?.response || error);
      toast({
        title: "Error Occurred",
        description: error?.response?.data?.message || error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false)
    }
  }
  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
        <Input placeholder="Enter your Password" value={password} type={show? 'text' : 'password'} onChange={(e)=>setPassword(e.target.value)}/>
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
      onClick={submitHandler}
      isLoading={loading}>
      Login
      </Button>
      <Button
      variant="solid"
      colorScheme="red"
      width={"100%"}
      onClick={()=> {
        setEmail("abc123@gmail.com");
        setPassword("abc123");
      }}>
      Get Guest User Credentials
      </Button>
    </VStack>
  )
}

export default Login
