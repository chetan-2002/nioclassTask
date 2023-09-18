import React, { useContext, useState } from "react";

import { createContext } from "react";
const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [questionTimes, setQuestionTimes] = useState(
    Array(selectedQuestions.length).fill(0)
  );
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);
  return (
    <AppContext.Provider
      value={{
        userName,
        setUserName,
        selectedQuestionIds,
        setSelectedQuestionIds,
        selectedQuestions,
        setSelectedQuestions,
        questionTimes,
        setQuestionTimes,
        totalElapsedTime,
        setTotalElapsedTime,
        testCompleted,
        setTestCompleted,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const AppState = () => {
  return useContext(AppContext);
};

export default ContextProvider;
