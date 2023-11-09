import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './beckendAPI';

export const sliceContacts = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null
  },
  
  extraReducers: builder => {
    builder

      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
      })

      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })

      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(addContact.pending, state => {
        state.isLoading = true;
      })

      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = [action.payload, ...state.items];
      })

      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteContact.pending, state => {
        state.isLoading = true;
      })

      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          contact => contact.id === action.payload.id
        );
        state.items.splice(index, 1);
      })

      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer } = sliceContacts;
export default reducer;
