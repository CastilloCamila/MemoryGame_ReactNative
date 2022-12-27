import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Context } from "../context/context";
import Card from "./Card";

function Cards() {
  const { boardCards, selectedCards, matchedCards } = useContext(Context);
  return (
    <View style={style.container}>
      {boardCards?.map((card, index) => {
        const isTurnedOver =
          selectedCards.includes(index) || matchedCards.includes(index);
        return (
          <Card key={index} index={index} isTurnedOver={isTurnedOver}>
            {card}
          </Card>
        );
      })}
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    position:'relative',
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 20,
    zIndex:-1
  },
});
export default Cards;
