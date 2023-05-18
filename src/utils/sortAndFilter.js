export const sortTickets = (tickets, typeValue) => {
  const sortedTickets = [...tickets]
  if (typeValue === 'cheap') {
    sortedTickets.sort((a, b) => a.price - b.price)
  } else if (typeValue === 'fast') {
    sortedTickets.sort((a, b) => {
      const first = a.segments[0].duration + a.segments[1].duration
      const second = b.segments[0].duration + b.segments[1].duration
      return first - second
    })
  }
  return sortedTickets
}

export const filterTickets = (tickets, filter) => {
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
