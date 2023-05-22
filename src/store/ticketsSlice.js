import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const _api = 'https://aviasales-test-api.kata.academy'

export const getSearchId = createAsyncThunk('ticket/getSearchId', async function () {
  const res = await fetch(`${_api}/search`)
  const data = await res.json()
  return data
})

export const getTickets = createAsyncThunk('tickets/getTickets', async function (searchId, { dispatch }) {
  let stop = false
  let errorsCount = 0
  let count = 0
  while (!stop) {
    try {
      const res = await fetch(`${_api}/tickets?searchId=${searchId}`)

      if (res.status === 500) {
        errorsCount += 1
        if (errorsCount > 20) {
          stop = true
          dispatch(changeStatus('exception'))
          setTimeout(() => dispatch(changeLoading(false)), 1000)
          throw new Error()
        }
        if (res.status === 200) {
          dispatch(changeProgress(10))
        }
        continue
      }

      count += 1
      let data
      try {
        data = await res.json()
      } catch (error) {
        console.error('Error JSON:', error)
        throw error
      }
      dispatch(changeTickets(data.tickets))
      if (count === 1) {
        dispatch(changeFirstLoading(false))
        dispatch(changeEndLoading(true))
      }
      dispatch(changeProgress(5))
      stop = data.stop
    } catch (error) {
      console.error('Error:', error)
      throw error
    }
  }

  setTimeout(() => dispatch(changeLoading(false)), 500)
})

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    searchId: '',
    loading: false,
    error: false,
    notFound: false,
    status: 'active',
    firstLoading: false,
    endLoading: false,
    progress: 0,
  },
  reducers: {
    changeTickets(state, action) {
      state.tickets.push(...action.payload)
    },
    changeLoading(state, action) {
      state.loading = action.payload
    },
    changeStatus(state, action) {
      state.status = action.payload
    },
    changeNotFound(state, action) {
      state.notFound = action.payload
    },
    changeProgress(state, action) {
      state.progress += action.payload
    },
    changeFirstLoading(state, action) {
      state.firstLoading = action.payload
    },
    changeEndLoading(state, action) {
      state.endLoading = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchId.pending, (state) => {
        state.error = false
      })
      .addCase(getSearchId.fulfilled, (state, action) => {
        state.searchId = action.payload.searchId
      })
      .addCase(getSearchId.rejected, (state) => {
        state.error = true
      })
      .addCase(getTickets.pending, (state) => {
        state.error = false
        state.loading = true
        state.firstLoading = true
        state.progress = 0
        state.status = 'active'
      })
      .addCase(getTickets.fulfilled, (state) => {
        state.status = 'ok'
      })
      .addCase(getTickets.rejected, (state) => {
        state.error = true
      })
  },
})

export const {
  changeTickets,
  changeLoading,
  changeStatus,
  changeNotFound,
  changeProgress,
  changeFirstLoading,
  changeEndLoading,
  changeError,
} = ticketsSlice.actions

export default ticketsSlice.reducer
