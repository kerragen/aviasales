import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Progress, notification, Button } from 'antd'

import TicketTypes from '../TicketTypes/TicketTypes'
import TransferFilter from '../TransferFilter/TransferFilter'
import TicketList from '../TicketList/TicketList'
import { getSearchId } from '../../store/ticketsSlice'

import Logo from './Logo.svg'
import classes from './App.module.scss'

const App = () => {
  const dispatch = useDispatch()
  const progress = useSelector((state) => state.tickets.progress)
  const loading = useSelector((state) => state.tickets.loading)
  const error = useSelector((state) => state.tickets.error)
  const status = useSelector((state) => state.tickets.status)

  const [api, contextHolder] = notification.useNotification()
  const openNotification = useCallback(() => {
    const btn = (
      <Button
        type="primary"
        size="small"
        onClick={() => {
          api.destroy()
          dispatch(getSearchId())
        }}
      >
        Попробовать ещё раз
      </Button>
    )
    api.error({
      message: 'Ошибка',
      description: 'Произошла ошибка во время поиска билетов. Попробуйте ещё раз или обновите страницу.',
      btn,
      placement: 'top',
      duration: 0,
    })
  }, [api, dispatch])

  useEffect(() => {
    if (error) {
      setTimeout(() => openNotification(), 1000)
    }
  }, [error, openNotification])

  return (
    <div className={classes.app}>
      {contextHolder}
      {loading && (
        <div className={classes.loader}>
          <Progress
            className={classes.loader__line}
            percent={progress}
            showInfo={false}
            status={status}
            strokeLinecap="butt"
          />
        </div>
      )}
      <div className={classes.header}>
        <img className={classes.header__logo} src={Logo} alt="logo"></img>
      </div>
      <main className={classes.main}>
        <div className={classes.main__left}>
          <TransferFilter />
        </div>
        <div className={classes.main__right}>
          <TicketTypes />
          <TicketList />
        </div>
      </main>
    </div>
  )
}

export default App
