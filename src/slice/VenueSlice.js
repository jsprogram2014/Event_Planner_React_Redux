// venueSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const venueSlice = createSlice({
  name: "venue",
  initialState: [
    {
      img: "https://media.istockphoto.com/id/1393803584/photo/interior-of-a-gamer-room.jpg?s=2048x2048&w=is&k=20&c=01sCKDXUsCj_Z479llZwZFWOdeRsVLhDDqIkHZ2CRJA=",
      name: "eSports Arena (Capacity:15)",
      cost: 3500,
      quantity: 0,
    },
    {
      img: "https://media.istockphoto.com/id/1990734665/photo/professional-esports-gamer.jpg?s=2048x2048&w=is&k=20&c=np5hDqKcgm97Oh4yEj5Psd3TkcddzysODV0VqvkItWU=",
      name: "LAN Battle Zone (Capacity:200)",
      cost: 5500,
      quantity: 0,
    },
    {
      img: "https://media.istockphoto.com/id/1187064129/photo/gamer-playing-computer-game.jpg?s=2048x2048&w=is&k=20&c=BPiPjOWk_wQLLEkEQIQiQufjlit6BB2lAo0bbNEA9IQ=",
      name: "VR Experience Room (Capacity:50)",
      cost: 700,
      quantity: 0,
    },
    {
      img: "https://cdn.pixabay.com/photo/2019/04/15/11/42/fortnite-4129124_1280.jpg",
      name: "Retro Arcade Lounge (Capacity:10)",
      cost: 900,
      quantity: 0,
    },
    {
      img: "https://cdn.pixabay.com/photo/2017/06/29/10/28/games-2453777_1280.jpg",
      name: "Streamer Studio Pod (Capacity:5)",
      cost: 1100,
      quantity: 0,
    },
  
  ],
  reducers: {
   
    incrementQuantity: (state, action) => {
      const { payload: index } = action;
      if (state[index]) {
        if (state[index].name === " Auditorium Hall (Capacity:200)" && state[index].quantity >= 3) {
          return;        }
        state[index].quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const { payload: index } = action;
      if (state[index] && state[index].quantity > 0) {
        state[index].quantity--;
      }
    },
  },
});

export const { incrementQuantity, decrementQuantity } = venueSlice.actions;

export default venueSlice.reducer;
