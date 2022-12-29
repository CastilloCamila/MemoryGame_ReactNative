import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Text, Pressable  } from "react-native";
import Constants from "expo-constants";
import Cards from "./src/components/Cards";
import { Context } from "./src/context/context";
import ConfettiCannon from "react-native-confetti-cannon";
import { StatusBar } from "expo-status-bar";

function Main() {
  let explosion;
  const {
    moves,
    setMoves,
    matchedCards,
    boardCards,
    setmatchedCards,
    selectedCards,
    setSelectedCards,
  } = useContext(Context);
  const playerWin = () => matchedCards.length == boardCards.length;

  useEffect(() => {
    if (selectedCards.length < 2) return;
    if (boardCards[selectedCards[0]] == boardCards[selectedCards[1]]) {
      setmatchedCards([...matchedCards, ...selectedCards]);
      setSelectedCards([]);
    } else {
      const timeOut = setTimeout(() => {
        setSelectedCards([]);
      }, 1000);
      return () => clearTimeout(timeOut);
    }
  }, [selectedCards]);

  const resetGame = () => {
    setmatchedCards([]);
    setMoves(0);
  };

  return (
    <View style={style.container}>
      <StatusBar style="dark"/>
      {playerWin() ? (
        <View style={style.containerconfetti}>
          <ConfettiCannon
            count={200}
            origin={{ x: -10, y: 0 }}
            explosionSpeed={200}
            ref={(ref) => (explosion = ref)}
          />
        </View>
      ) : (
        <></>
      )}
      <View style={style.textContainer}>
        <Text style={style.title}>
          {playerWin() ? "Congratulations!!" : "Memory Game"}
        </Text>
      </View>
      <Text style={style.text}>Moves: {moves}</Text>
      <Cards />
      {playerWin()&& <Pressable style={style.button} onPress={()=>resetGame()}>
          <Text style={{ color: "#fff" }}>Reset Game</Text>
        </Pressable>
   
      }
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    backgroundColor: "#190033",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    flex: 1,
  },
  title: {
    color: "#fff",
    fontSize: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    display: "flex",
    color: "#fff",
    fontSize: 20,
    justifyContent: "center",
  },
  textContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  containerconfetti: {
height:'100%',
width:'100%',
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",

  },
  button: {
    position:'relative',
    backgroundColor: "#370073",
    borderRadius: 4,
    padding: 10,
  },
});

export default Main;
