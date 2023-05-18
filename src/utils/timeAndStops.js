import { format, add } from 'date-fns'

export const stopsDescription = (stops) => {
  if (!stops.length) {
    return 'Без пересадок'
  } else if (stops.length === 1) {
    return '1 пересадка'
  } else if (stops.length === 2) {
    return '2 пересадки'
  } else {
    return '3 пересадки'
  }
}

export const stopsValue = (stops) => {
  if (!stops.length) {
    return 'Прямой'
  } else {
    return stops.join(', ')
  }
}

export const dates = (date, duration) => {
  const first = format(new Date(date), 'H:mm')
  const second = format(add(new Date(date), { minutes: duration }), 'H:mm')
  return `${first} - ${second}`
}

export const time = (mins) => {
  let hours = Math.trunc(mins / 60)
  let minutes = mins % 60
  return `${hours}ч ${minutes}м`
}
