import React, { useEffect, useState } from "react";
import Exercises from "../components/Exercises";
import SearchExercises from "../components/SearchExercises";
import { Box } from "@mui/material";
import { useGlobalContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const ExercisesPage = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState("all");
  const { user } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, []);
  return (
    <Box>
      <SearchExercises
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />
      <Exercises
        setExercises={setExercises}
        exercises={exercises}
        bodyPart={bodyPart}
      />
    </Box>
  );
};

export default ExercisesPage;
