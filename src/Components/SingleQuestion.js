import { Box, Checkbox, Text } from "@chakra-ui/react";
import React from "react";
import { AppState } from "../Context/ContextProvider";

const SingleQuestion = ({ question }) => {
  const { setSelectedQuestionIds } = AppState();

  const handleCheckBoxChange = (label) => {
    setSelectedQuestionIds((prevselectedQuestionIds) => {
      if (prevselectedQuestionIds.includes(label)) {
        return prevselectedQuestionIds.filter((item) => item != label);
      } else {
        return [...prevselectedQuestionIds, label];
      }
    });
  };
  return (
    <Box display={"flex"} flexDirection={"row"}>
      <Checkbox
        value={question}
        onChange={() => handleCheckBoxChange(question)}
      >
        {question}
      </Checkbox>
    </Box>
  );
};

export default SingleQuestion;
