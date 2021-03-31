import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
const generateRandomNumberBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomNumberBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const GameScreen = (props) => {
  const { userChoice, onGameOver } = props;

  const [currentGuess, setCurrentGuess] = useState(
    generateRandomNumberBetween(1, 100, props.userChoice)
  );
  const [rounds, setRound] = useState(0);
  const currentLow = useRef(1);
  const cureentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't Lie", "You Know this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      cureentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomNumberBetween(
      currentLow.current,
      cureentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setRound((currentRound) => currentRound + 1);
  };
  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={nextGessHandler.bind(this, "lower")} />
        <Button
          title="GREATER"
          onPress={nextGessHandler.bind(this, "greater")}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: "80%",
  },
});

export default GameScreen;
