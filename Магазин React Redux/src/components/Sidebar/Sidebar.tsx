import React, { FC, useState } from 'react'
import './sidebar.css'
import TextField from '@mui/material/TextField'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import { Alert, Slider } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
   filterByCategory,
   filterByPrice,
   searchFilter,
} from '../../store/products/products.slice'
import { findMaxPrice } from '../../utils'

const Sidebar: FC = () => {
   const { products } = useAppSelector((state) => state.productsReducer)
   const dispatch = useAppDispatch()
   const [searchTerm, setSearchTerm] = useState('')
   const [category, setCategory] = React.useState('')
   const [value, setValue] = React.useState([0, 0])

   const handleChange = (event: SelectChangeEvent) => {
      setCategory(event.target.value)
      dispatch(filterByCategory(event.target.value))
   }

   const changePrice = (event: Event, newValue: number | number[]) => {
      setValue(newValue as number[])
      dispatch(filterByPrice(newValue as number[]))
   }

   const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value)
      dispatch(searchFilter(event.target.value))
   }

   return (
      <div className={'sidebar'}>
         <Alert icon={false} variant="filled" severity="info">
            Фильтр
         </Alert>
         <div className={'searchInput'}>
            <TextField
               fullWidth={true}
               id="standard-search"
               label="Искать"
               type="search"
               variant="standard"
               value={searchTerm}
               onChange={onChangeSearch}
            />
         </div>
         <div className={'selectCategory'}>
            <FormControl variant="standard" sx={{ minWidth: 150 }}>
               <InputLabel id="demo-simple-select-standard-label">
                  Выбрать категорию
               </InputLabel>
               <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={category}
                  onChange={handleChange}
                  label="Select category"
               >
                  <MenuItem value={'All'}>
                     <em>Категории</em>
                  </MenuItem>
                  <MenuItem value={'electronics'}>Электроника</MenuItem>
                  <MenuItem value={'jewelery'}>Юв изделия</MenuItem>
                  <MenuItem value={"men's clothing"}>Мужская одежда</MenuItem>
                  <MenuItem value={"women's clothing"}>Женская Одежда</MenuItem>
               </Select>
            </FormControl>
         </div>
         <div className={'selectPrice'}>
            <p>Ценовой диапазон:</p>
            <Slider
               getAriaLabel={() => 'Temperature range'}
               value={value}
               onChange={changePrice}
               valueLabelDisplay="auto"
               min={0}
               max={products.length !== 0 ? findMaxPrice(products) : 0}
            />
            <div className={'selectPriceValues'}>
               <span>{value[0]} ₸</span>
               <span>{value[1]} ₸</span>
            </div>
         </div>
      </div>
   )
}

export default Sidebar
