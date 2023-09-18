import { Box, Heading, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import React from "react";
import { AppState } from "../Context/ContextProvider";
import { CheckCircleIcon } from "@chakra-ui/icons";

const FinishPage = () => {
  const { selectedQuestionIds, questionTimes, userName, totalElapsedTime } =
    AppState();
  return (
    <Box textAlign="center" py={10} px={6}>
      <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Thank you for taking the test, {userName}
      </Heading>
      <Box color={"gray.500"}>
        <Text mb={2} fontSize={"2xl"} fontWeight={"medium"}>
          Total time taken : {totalElapsedTime} seconds
        </Text>
        Question wise times are as follows
        {selectedQuestionIds?.map((id, index) => (
          <Text key={index}>
            {id} : {questionTimes[index]} seconds
          </Text>
        ))}
      </Box>
    </Box>
  );
};

export default FinishPage;
