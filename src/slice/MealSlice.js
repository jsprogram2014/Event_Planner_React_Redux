// mealsSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const MealSlice = createSlice({
  name: 'meals',
  initialState: [{ name: 'Breakfast', cost: 50, selected: false },
  { name: 'High Tea', cost: 25, selected: false },
  { name: 'Lunch', cost: 65, selected: false },
  { name: 'Dinner', cost: 70, selected: false },

  ],
  reducers: {
    toggleMealSelection: (state, action) => {
      state[action.payload].selected = !state[action.payload].selected;
},toggleEverythingoff:(state)=>{state.forEach(item=>item.selected=false)}
  },
});

export const { toggleMealSelection,toggleEverythingoff } = MealSlice.actions;

export default MealSlice.reducer;
