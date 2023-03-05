import React, { FC } from 'react'
import './successOrder.css'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const SuccessOrder: FC = () => {
   const navigate = useNavigate()
   return (
      <div className={'successOrder'}>
         <h1>Ваш заказ принят!</h1>
         <div className={'successButton'}>
            <Button variant={'contained'} onClick={() => navigate('/')}>
               Вернуться в главное меню
            </Button>
         </div>
      </div>
   )
}

export default SuccessOrder
