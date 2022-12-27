import { createContext, useState } from "react";
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
const cards = ["💋",
//  "👀", 
//  "🌺", 
//  "🧸",
  "🗽", 
  "🔥"];
export const Context = createContext();
export const ContextProvider = ({ children }) => {
  const [boardCards, setBoardCards] = useState(
    shuffleArray([...cards, ...cards])
  );

  const [matchedCards, setmatchedCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  return (
    <Context.Provider
      value={{
        boardCards,
        setBoardCards,
        matchedCards,
        setmatchedCards,
        selectedCards,
        setSelectedCards,
        moves,
        setMoves,
      }}
    >
      {children}
    </Context.Provider>
  );
};
