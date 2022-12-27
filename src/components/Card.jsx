import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Context } from "../context/context";

function Card({ children, index, isTurnedOver }) {
  const { setMoves, moves, setSelectedCards, selectedCards } =
    useContext(Context);
useEffect(()=>{
  console.log("renderizado")
},[])
  const handleOnPress = (index) => {
    requestAnimationFrame(() => {
       if (selectedCards.length >= 2 || selectedCards.includes(index)) return;
      setSelectedCards([...selectedCards, index]);
      setMoves(moves + 1);
    });
  };

  return (
    <View style={style.cardContainer}>
      <View style={style.cardInner}>
        <View
          style={[
            style.card,
            isTurnedOver && { transform: [{ rotateY: "180deg" }] },
          ]}
        >
          <Pressable onPressIn={() => handleOnPress(index)} style={[style.card]}>
            <Text style={style.text}>?</Text>
          </Pressable>
        </View>

        <View
          style={[
            style.card,
            style.cardBack,
            !isTurnedOver && { transform: [{ rotateY: "180deg" }] },
          ]}
        >
          <Pressable onPressIn={() => handleOnPress(index)}>
            <Text style={style.text}>{children}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  cardContainer: {
    width: 100,
    height: 100,
    perspective: "400",
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
  },
  cardInner: {
    position: "relative",
    width: "100%",
    height: "100%",
    textAlign: "center",
    transition: "transform 0.8s",
    transformmStyle: " preserve-3d",
  },
  cardBack: {
    borderColor: "#782CF7",
    borderWidth: 5,
  },
  // transition: { transform: [{rotateY:"(180deg)"}] },
  card: {
    backgroundColor: "#370073",
    borderRadius: 10,
    transition: " transform 0.8s",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    backfaceVisibility: "hidden",
  },

  text: {
    color: "#fff",
    fontSize: 25,
    textAlign: "center",
  },
});

export default Card;
