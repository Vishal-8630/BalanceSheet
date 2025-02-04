import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import './main.scss';

import AllBalanceSheet from './components/AllBalanceSheet';
import BalanceSheetForm from './components/BalanceSheetForm';
import ViewBalanceSheet from './components/ViewBalanceSheet';
import AdminPage from './components/Admin';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
      <Route path='/' element={<AllBalanceSheet />} />
      <Route path='/add-balance-sheet' element={<BalanceSheetForm />} />
      <Route path='/edit-balance-sheet/:id' element={<BalanceSheetForm />} />
      <Route path='/view-balance-sheet/:id' element={<ViewBalanceSheet />} />
      <Route path='/admin-mode' element={<AdminPage />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
