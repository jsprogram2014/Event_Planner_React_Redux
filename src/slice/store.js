// store.js
import { configureStore } from '@reduxjs/toolkit';
import venueReducer from './VenueSlice';
import addonReducer from './AddOnSlice'
import mealReducer from './MealSlice'

export default configureStore({
  reducer: {
    venue: venueReducer,
    addon: addonReducer,
    meals:mealReducer,
  },
});
