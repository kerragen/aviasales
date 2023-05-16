import { createSlice } from '@reduxjs/toolkit'

const typeSlice = createSlice({
  name: 'type',
  initialState: {
    type: 'cheap',
  },
  reducers: {
    changeType(state, action) {
      return { ...state, type: action.payload }
    },
  },
})

export const { changeType } = typeSlice.actions
export default typeSlice.reducer
