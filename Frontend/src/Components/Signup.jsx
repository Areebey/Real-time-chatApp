import React, { useState, useRef } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  VStack,
  Input,
  useToast,
  Image,
} from "@chakra-ui/react";
import axios from "axios"
import {useNavigate} from "react-router-dom"

const Signup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const fileInputRef = useRef(null)
  const navigate = useNavigate()

  const handleClick = () => setShow(!show);
  const postDetails = (file) => {
    console.log("[Cloudinary] Upload start", file);
    setLoading(true);
    if (!file) {
      toast({
        title: "Please select an image",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (file.type !== "image/jpeg" && file.type !== "image/png" && file.type !== "image/jpg") {
      toast({
        title: "Unsupported format (use jpeg/png)",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "chat-app");
    data.append("cloud_name", "dcqcd51sz");
    fetch("https://api.cloudinary.com/v1_1/dcqcd51sz/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log("[Cloudinary] Raw response", resp);
        if (resp.error) {
          throw new Error(resp.error.message || "Upload failed");
        }
        const url = resp.secure_url || resp.url;
        console.log("[Cloudinary] Image URL:", url);
        setPic(url);
        toast({
          title: "Image uploaded",
          description: url,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      })
      .catch((err) => {
        console.error("[Cloudinary] Upload error", err);
        toast({
          title: "Image upload failed",
          description: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      })
      .finally(() => setLoading(false));
  };

  const submitHandler = async () => {
    console.log("[Signup] Submit payload", { name, email, password, confirmPassword, pic });
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please fill all fields",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
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
        "/api/user",
        { name, email, password, pic },
        config
      );
       toast({
        title: "Registration Successful",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
       localStorage.setItem("userInfo", JSON.stringify(data));
       setName("")
       setEmail("")
       setPassword("")
       setConfirmPassword("")
       setPic("");
       if (fileInputRef.current) fileInputRef.current.value = "";
       setLoading(false)
      //  navigate.push("/chats")
    } catch (error) {
      console.error('[Signup] registration error', error?.response || error);
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
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Enter your Password"
            value={password}
            type={show ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="3.5rem">
            <Button h="1.7rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Re-enter your Password"
            value={confirmPassword}
            type={show ? "text" : "password"}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="3.5rem">
            <Button h="1.7rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Profile Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept={"image/*"}
          ref={fileInputRef}
          onChange={(e) => postDetails(e.target.files[0])}
        />
        {pic && (
          <Image
            src={pic}
            alt="Profile preview"
            boxSize="100px"
            objectFit="cover"
            mt={2}
            borderRadius="md"
            border="1px solid #ccc"
          />
        )}
      </FormControl>
      <Button
        colorScheme="blue"
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
