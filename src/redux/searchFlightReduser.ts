import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import SearchFlight from "../types/SearchFlight.ts"

interface SearchFlightData {
  data: SearchFlight | null
}

const initialState: SearchFlightData = {
  data: null,
}

export const searchFlightDataSlice = createSlice({
  name: 'searchFlightData',
  initialState,
  reducers: {

    setSearchFlightData: (state, action: PayloadAction<SearchFlight>) => {
        state.data = action.payload;
      },
      clearSearchFlightData: (state) => {
        state.data = {} as SearchFlight;
      },
  },
})

export const { setSearchFlightData, clearSearchFlightData } = searchFlightDataSlice.actions;
export default searchFlightDataSlice.reducer;