import { Box, Button, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AppState } from "../Context/ContextProvider";
import axios from "axios";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useNavigate } from "react-router-dom";

const TestPage = () => {
  const {
    selectedQuestions,
    questionTimes,
    setQuestionTimes,
    totalElapsedTime,
    setTotalElapsedTime,
    setTestCompleted,
  } = AppState();
  const config = {
    loader: { load: ["[tex]/html"] },
    tex: {
      packages: { "[+]": ["html"] },
      inlineMath: [
        ["$", "$"],
        ["\\(", "\\)"],
      ],
      displayMath: [
        ["$$", "$$"],
        ["\\[", "\\]"],
      ],
    },
  };
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(0);
  const [timer, setTimer] = useState(null);
  const totalTestTime = 300 * selectedQuestions.length;
  const startTimer = () => {
    setTimer(
      setInterval(() => {
        setTotalElapsedTime((prevTime) => prevTime + 1);
      }, 1000)
    );
  };

  const stopTimer = () => {
    clearInterval(timer);
    setTimer(null);
  };

  const recordQuestionTime = () => {
    if (questionStartTime >= 0) {
      const elapsedTimeForQuestion = totalElapsedTime - questionStartTime;
      setQuestionTimes((prevTimes) => {
        const updatedTimes = [...prevTimes];
        updatedTimes[currentQuestionIndex] = elapsedTimeForQuestion;
        return updatedTimes;
      });
    }
  };

  const goToNextQuestion = () => {
    stopTimer();
    recordQuestionTime();

    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setQuestionStartTime(totalElapsedTime);
      startTimer();
    } else {
      setTestCompleted(true);
      navigate("/finish", { replace: true });
    }
  };

  useEffect(() => {
    startTimer();
    setQuestionStartTime(totalElapsedTime);
    return () => stopTimer();
  }, []);
  return (
    <Box m={3}>
      <MathJaxContext config={config}>
        <Box>
          <Text fontSize={"large"}>
            Duration : {totalTestTime / 60} minutes{" "}
          </Text>
          <Text fontSize={"large"}>
            Total Time Elapsed: {totalElapsedTime} seconds
          </Text>
        </Box>
        <Box fontSize={"xl"} mb={"2"}>
          <MathJax>
            Question :{" "}
            {selectedQuestions[currentQuestionIndex]?.replace("/$/g", "\\(")}
          </MathJax>
        </Box>
        <Box>
          <Button
            onClick={goToNextQuestion}
            disabled={totalElapsedTime >= totalTestTime}
            variant={"solid"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {currentQuestionIndex < selectedQuestions.length - 1 ? (
              <>Next</>
            ) : (
              <>Submit</>
            )}
          </Button>
        </Box>
      </MathJaxContext>
    </Box>
  );
};

export default TestPage;
