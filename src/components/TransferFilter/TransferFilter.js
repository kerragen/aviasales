import { useSelector, useDispatch } from 'react-redux'

import { allCheckboxChange, checkedChange } from '../../store/filterSlice'

import classes from './TransferFilter.module.scss'

const TransferFilter = () => {
  const dispatch = useDispatch()
  const changeAllCheckbox = () => dispatch(allCheckboxChange())
  const changeChecked = (name) => dispatch(checkedChange(name))
  const filter = useSelector((state) => state.filter)

  return (
    <aside className={classes.filter}>
      <span className={classes.filter__title}>КОЛИЧЕСТВО ПЕРЕСАДОК</span>
      <div className={classes.filter__item}>
        <input
          type="checkbox"
          id="check-1"
          className={classes.filter__checkbox}
          onChange={changeAllCheckbox}
          checked={filter.allChecked}
        />
        <label className={classes.filter__text} htmlFor="check-1">
          Все
        </label>
      </div>
      <div className={classes.filter__item}>
        <input
          type="checkbox"
          id="check-2"
          className={classes.filter__checkbox}
          onChange={() => changeChecked('noTransf')}
          checked={filter.noTransf}
        />
        <label className={classes.filter__text} htmlFor="check-2">
          Без пересадок
        </label>
      </div>
      <div className={classes.filter__item}>
        <input
          type="checkbox"
          id="check-3"
          className={classes.filter__checkbox}
          onChange={() => changeChecked('transf1')}
          checked={filter.transf1}
        />
        <label className={classes.filter__text} htmlFor="check-3">
          1 пересадка
        </label>
      </div>
      <div className={classes.filter__item}>
        <input
          type="checkbox"
          id="check-4"
          className={classes.filter__checkbox}
          onChange={() => changeChecked('transf2')}
          checked={filter.transf2}
        />
        <label className={classes.filter__text} htmlFor="check-4">
          2 пересадки
        </label>
      </div>
      <div className={classes.filter__item}>
        <input
          type="checkbox"
          id="check-5"
          className={classes.filter__checkbox}
          onChange={() => changeChecked('transf3')}
          checked={filter.transf3}
        />
        <label className={classes.filter__text} htmlFor="check-5">
          3 пересадки
        </label>
      </div>
    </aside>
  )
}

export default TransferFilter
