import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    allChecked: true,
    noTransf: true,
    transf1: true,
    transf2: true,
    transf3: true,
  },
  reducers: {
    allCheckboxChange(state) {
      const checks = { ...state }
      Object.keys(checks).forEach((key) => {
        checks[key] = !state.allChecked
      })

      return checks
    },
    checkedChange(state, action) {
      const checks = { ...state }
      checks[action.payload] = !checks[action.payload]
      delete checks.allChecked
      const isAllChecked = Object.values(checks).every((value) => value === true)
      checks.allChecked = isAllChecked

      return checks
    },
  },
})

export const { allCheckboxChange, checkedChange } = filterSlice.actions

export default filterSlice.reducer
