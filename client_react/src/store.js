import { configureStore } from '@reduxjs/toolkit';
import reducer from './redux'

const store = configureStore({reducer})

export default store; 