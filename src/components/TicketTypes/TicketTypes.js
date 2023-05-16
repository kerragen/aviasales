import { useDispatch, useSelector } from 'react-redux'

import { changeType } from '../../store/typeSlice'

import classes from './TicketTypes.module.scss'

const TicketTypes = () => {
  const dispatch = useDispatch()
  const setType = (e) => dispatch(changeType(e.target.value))

  const typeValue = useSelector((state) => state.type.type)

  return (
    <div className={classes.types}>
      <ul className={classes.types__list}>
        <li className={classes.types__el}>
          <input
            className={classes.types__radio}
            id="cheap"
            value={'cheap'}
            onChange={setType}
            type="radio"
            name="type"
            checked={typeValue === 'cheap'}
          ></input>
          <label className={classes.types__label} htmlFor="cheap">
            САМЫЙ ДЕШЕВЫЙ
          </label>
        </li>
        <li className={classes.types__el}>
          <input
            className={classes.types__radio}
            id="fast"
            value={'fast'}
            onChange={setType}
            type="radio"
            name="type"
            checked={typeValue === 'fast'}
          ></input>
          <label className={classes.types__label} htmlFor="fast">
            САМЫЙ БЫСТРЫЙ
          </label>
        </li>
      </ul>
    </div>
  )
}

export default TicketTypes
