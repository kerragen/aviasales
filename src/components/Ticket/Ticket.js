import { dates, time, stopsDescription, stopsValue } from '../../utils/timeAndStops'

import classes from './Ticket.module.scss'

const Ticket = ({
  price,
  carrier,
  firstDate,
  firstDestination,
  firstDuration,
  firstOrigin,
  firstStops,
  secondDate,
  secondDestination,
  secondDuration,
  secondOrigin,
  secondStops,
}) => {
  return (
    <div className={classes.ticket}>
      <div className={classes.ticket__header}>
        <p className={classes.ticket__price}>{`${price} P`}</p>
        <div className={classes.ticket__image}>
          <img
            className={classes.ticket__img}
            src={`https://pics.avs.io/99/36/${carrier}.png`}
            alt="Логотип авиакомпании"
          />
        </div>
      </div>
      <div className={classes.ticket__table}>
        <div className={classes.ticket__col}>
          <div className={classes.ticket__cell}>
            <p className={classes.fontLight}>{`${firstOrigin} - ${firstDestination}`}</p>
            <p className={classes.fontDark}>{dates(firstDate, firstDuration)}</p>
          </div>
          <div className={classes.ticket__cell}>
            <p className={classes.fontLight}>В пути</p>
            <p className={classes.fontDark}>{time(firstDuration)}</p>
          </div>
          <div className={classes.ticket__cell}>
            <p className={classes.fontLight}>{stopsDescription(firstStops)}</p>
            <p className={classes.fontDark}>{stopsValue(firstStops)}</p>
          </div>
        </div>
        <div className={classes.ticket__col}>
          <div className={classes.ticket__cell}>
            <p className={classes.fontLight}>{`${secondOrigin} - ${secondDestination}`}</p>
            <p className={classes.fontDark}>{dates(secondDate, secondDuration)}</p>
          </div>
          <div className={classes.ticket__cell}>
            <p className={classes.fontLight}>В пути</p>
            <p className={classes.fontDark}>{time(secondDuration)}</p>
          </div>
          <div className={classes.ticket__cell}>
            <p className={classes.fontLight}>{stopsDescription(secondStops)}</p>
            <p className={classes.fontDark}>{stopsValue(secondStops)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ticket
