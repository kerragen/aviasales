import { configureStore } from '@reduxjs/toolkit'

import filterReducer from './filterSlice'
import ticketsReducer from './ticketsSlice'
import typeReducer from './typeSlice'

export default configureStore({
  reducer: {
    filter: filterReducer,
    tickets: ticketsReducer,
    type: typeReducer,
  },
})
