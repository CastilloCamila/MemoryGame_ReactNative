import React, { useContext, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Pressable, Animated } from "react-native";
import { Context } from "../context/context";

function Card({ children, index, isTurnedOver }) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const { setMoves, moves, setSelectedCards, selectedCards } =
    useContext(Context);
  useEffect(() => {
    console.log("renderizado");
  }, []);
  const handleOnPress = (index) => {
    if (selectedCards.length >= 2 || selectedCards.includes(index)) {
    }
    setSelectedCards([...selectedCards, index]);
    setMoves(moves + 1);
    Animated.timing(animatedValue, {
      toValue: 180,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
const interpolateFront= animatedValue.interpolate({
  inputRange:[0,180],
  outputRange:['0deg','180deg']
})
const interpolateBack= animatedValue.interpolate({
  inputRange:[0,180],
  outputRange:['180deg','360deg']
})


useEffect(()=>{
if(!isTurnedOver){
  Animated.timing(animatedValue, {
    toValue: 0,
    duration: 300,
    useNativeDriver: false,
  }).start();
}
},[selectedCards])
  return (
    <View style={style.cardContainer}>
      <View style={style.cardInner}>
        <Animated.View
          style={[
            style.card,
            {
              transform: [
                {
                  rotateY: interpolateFront,
                },
              ],
            },
          ]}
        >
          <Pressable
            onPressIn={() => handleOnPress(index)}
            style={[style.card]}
          >
            <Text style={style.text}>?</Text>
          </Pressable>
        </Animated.View>

        <Animated.View
          style={[
            style.card,
            style.cardBack,
            {
              transform: [
                {
                  rotateY: interpolateBack,
                },
              ],
            },
          ]}
        >
          <Pressable onPressIn={() => handleOnPress(index)}>
            <Text style={style.text}>{children}</Text>
          </Pressable>
        </Animated.View>
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
