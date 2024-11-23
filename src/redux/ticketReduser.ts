import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export  interface Ticket {
    flightId: number | null,
    flightClassId: number | null,
    passenger: number | null;

};
export  interface Tickets {
    departureTicket?: Ticket | null;
    returnTicket?: Ticket | null;

};

interface TicketData {
  data: Tickets | null
}

const initialState: TicketData = {
  data: null,
}

export const ticketDataSlice = createSlice({
  name: 'ticketData',
  initialState,
  reducers: {

      setDepartureTicket: (state, action: PayloadAction<Ticket | null>) => {
        if (!state.data) {
            state.data = { departureTicket: action.payload }; // Initialize if null
        } else {
            state.data.departureTicket = action.payload;
        }
      },
      setReturnTicketData: (state, action: PayloadAction<Ticket | null>) => {
        if (!state.data) {
            state.data = { returnTicket: action.payload }; // Initialize if null
        } else {
            state.data.returnTicket = action.payload;
        }
      },
      clearDepartureTicket: (state) => {
        if (state.data) {
          state.data.departureTicket = null; // Clear departure ticket
      }
      },
      clearReturnTicketData: (state) => {
        if (state.data) {
          state.data.returnTicket = null; // Clear return ticket
      }
      },
  },
})

export const { setDepartureTicket, setReturnTicketData, clearDepartureTicket, clearReturnTicketData } = ticketDataSlice.actions;

export default ticketDataSlice.reducer