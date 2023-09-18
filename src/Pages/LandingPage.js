import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  chakra,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { FaUserAlt } from "react-icons/fa";
import SingleQuestion from "../Components/SingleQuestion";
import { AppState } from "../Context/ContextProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CFaUserAlt = chakra(FaUserAlt);

const LandingPage = () => {
  const {
    setUserName,
    selectedQuestionIds,
    userName,
    setSelectedQuestions,
    testCompleted,
  } = AppState();
  const toast = useToast();
  const navigate = useNavigate();
  const questionIds = [
    "AreaUnderTheCurve_21",
    "BinomialTheorem_13",
    "BinomialTheorem_24",
    "AreaUnderTheCurve_15",
    "AreaUnderTheCurve_2",
    "BinomialTheorem_3",
    "BinomialTheorem_4",
    "AreaUnderTheCurve_5",
  ];
  const fetchData = async () => {
    const questionsList = [];
    for (const questionID of selectedQuestionIds) {
      const response = await axios
        .get(
          `https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${questionID}`
        )
        .then((response) => {
          console.log(`Question for ${questionID}:`, response.data[0]);
          const ques = response.data[0].Question;
          questionsList.push(ques);
        })
        .catch((error) =>
          console.error(`Error fetching question for ${questionID}:`, error)
        );
    }
    setSelectedQuestions(questionsList);
  };
  const handleSubmit = () => {
    if (userName.length === 0) {
      toast({
        title: "Please enter your name!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    fetchData();
    navigate("/test", { replace: true });
  };
  useEffect(() => {
    if (testCompleted == true) {
      window.location.reload();
    }
  }, []);
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="name"
                    placeholder="Enter your Name"
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                  />
                </InputGroup>
              </FormControl>
              {questionIds.map((question, index) => (
                <SingleQuestion question={question}></SingleQuestion>
              ))}
              <Button
                borderRadius={0}
                variant="solid"
                colorScheme="teal"
                width="full"
                isDisabled={selectedQuestionIds.length > 0 ? false : true}
                onClick={handleSubmit}
              >
                Start Test
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LandingPage;
