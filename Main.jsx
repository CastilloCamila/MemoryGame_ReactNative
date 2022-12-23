import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import Constants from "expo-constants";
import Cards from "./src/components/Cards";
import { Context } from "./src/context/context";

function Main() {
  const {
    moves,
    setMoves,
    machedCards,
    boardCards,
    setMachedCards,
    selectedCards,
    setSelectedCards,
  } = useContext(Context);
  const playerWin = () => machedCards.length == boardCards.length;
  useEffect(() => {
    if (selectedCards.length < 2) return;
    if (boardCards[selectedCards[0]] == boardCards[selectedCards[1]]) {
      setMachedCards([...machedCards, ...selectedCards]);
      setSelectedCards([]);
    } else {
      const timeOut = setTimeout(() => {
        setSelectedCards([]);
      }, 1000);
      return () => clearTimeout(timeOut);
    }
  }, [selectedCards]);
  const resetGame = () => {
    setMachedCards([]);
    setMoves(0);
  };
  return (
    <View style={style.container}>
      <Text style={style.title}>
        {playerWin() ? "Congratulations🎊!!" : "Memory Game"}
      </Text>
      <Text style={style.text}>Moves :{moves}</Text>
      <Cards />
      {!playerWin() ? (
        <></>
      ) : (
        <></>
      )}<Button color="#370073" onPress={() => resetGame()} title="Reset Game" />
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
  },
  text: {
    color: "#fff",
    fontSize: 20,
  }
});

export default Main;
