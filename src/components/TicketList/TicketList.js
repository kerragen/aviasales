import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert } from 'antd'

import { changeNotFound, getSearchId, getTickets } from '../../store/ticketsSlice'
import Ticket from '../Ticket/Ticket'

import classes from './TicketList.module.scss'

const TicketList = () => {
  const [visibleCount, setVisibleCount] = useState(5)

  const dispatch = useDispatch()

  const searchId = useSelector((state) => state.tickets.searchId)
  const notFound = useSelector((state) => state.tickets.notFound)
  const tickets = useSelector((state) => state.tickets.tickets)
  const filter = useSelector((state) => state.filter)
  const typeValue = useSelector((state) => state.type.type)
  const firstLoading = useSelector((state) => state.tickets.firstLoading)
  const endLoading = useSelector((state) => state.tickets.endLoading)

  useEffect(() => {
    setVisibleCount(5)
  }, [filter, typeValue])

  useEffect(() => {
    dispatch(getSearchId())
  }, [dispatch])

  useEffect(() => {
    if (!searchId) {
      return
    }
    dispatch(getTickets(searchId))
  }, [dispatch, searchId])

  const typeTickets = (tickets, type) => {
    const typeArray = [...tickets]
    if (type === 'cheap') {
      return typeArray.sort((a, b) => a.price - b.price)
    } else if (type === 'fast') {
      return typeArray.sort((a, b) => {
        const first = a.segments[0].duration + a.segments[1].duration
        const second = b.segments[0].duration + b.segments[1].duration
        return first - second
      })
    }
  }

  const filteringTickets = (tickets, filter) => {
    let filterArray = [...tickets]
    if (!filter.noTransf) {
      filterArray = filterArray.filter((ticket) => ticket.segments[0].stops.length !== 0)
    }
    if (!filter.transf1) {
      filterArray = filterArray.filter((ticket) => ticket.segments[0].stops.length !== 1)
    }
    if (!filter.transf2) {
      filterArray = filterArray.filter((ticket) => ticket.segments[0].stops.length !== 2)
    }
    if (!filter.transf3) {
      filterArray = filterArray.filter((ticket) => ticket.segments[0].stops.length !== 3)
    }
    return filterArray
  }

  const visibleItems = filteringTickets(typeTickets(tickets, typeValue), filter)

  useEffect(() => {
    dispatch(changeNotFound(false))
    if (!visibleItems.length) {
      dispatch(changeNotFound(true))
    }
  }, [dispatch, filter, visibleItems])

  const els = visibleItems.slice(0, visibleCount).map((ticket) => {
    const first = ticket.segments[0]
    const second = ticket.segments[1]

    return (
      <li key={ticket.price + ticket.carrier + first.date}>
        <Ticket
          price={ticket.price}
          carrier={ticket.carrier}
          firstOrigin={first.origin}
          firstDestination={first.destination}
          firstDate={first.date}
          firstStops={first.stops}
          firstDuration={first.duration}
          secondOrigin={second.origin}
          secondDestination={second.destination}
          secondDate={second.date}
          secondStops={second.stops}
          secondDuration={second.duration}
        />
      </li>
    )
  })

  return (
    <div className={classes.list}>
      <ul className={classes.list__tickets}>
        {!firstLoading && els}
        {endLoading && notFound && (
          <Alert
            type="info"
            showIcon
            description="Рейсов, подходящих под заданные фильтры, не найдено"
            style={{ marginTop: '20px' }}
          />
        )}
      </ul>
      {!notFound && endLoading && (
        <button className={classes.list__button} onClick={() => setVisibleCount(visibleCount + 5)}>
          Показать ещё 5 билетов!
        </button>
      )}
    </div>
  )
}

export default TicketList
