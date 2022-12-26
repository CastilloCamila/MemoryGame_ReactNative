import React, { useContext, useEffect, useRef } from "react";
import { View, StyleSheet, Text, Button, Animated, Pressable } from "react-native";
import Constants from "expo-constants";
import Cards from "./src/components/Cards";
import { Context } from "./src/context/context";
import ConfettiExplosion from "react-confetti-explosion";

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
      <View style={style.textContainer}>
        <Text style={style.title}>
          {playerWin() ? (
            <>
              Congratulations!!{" "}
              <View style={style.Containerconfetti}>
             
                <ConfettiExplosion />
              </View>
            </>
          ) : (
            "Memory Game"
          )}
        </Text>
      </View>
      <Text style={style.text}>Moves: {moves}</Text>
      <Cards />
      {!playerWin() ? <></> : <></>}
      <Pressable style={style.button} onPress={() => resetGame()}>
        <Text style={{color:'#fff'}}>Reset Game</Text>
    
    </Pressable></View>
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
  Containerconfetti: {
    height: "100%",
    width: "100%", 
    position:'absolute',
    justifyContent: "center",
    alignItems:'center',
   left:0,
   zIndex:'99999999999'
  },button:{
    zIndex:-10,
    backgroundColor:'#370073',
    borderRadius:4,
    padding:10

  }
  
});

export default Main;
