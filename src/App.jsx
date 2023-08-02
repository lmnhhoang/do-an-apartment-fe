import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Private from './components/private/Private'
import Login from './login/Login'
import ApartmentCreate from './pages/apartment/ApartmentCreate'
import ApartmentDetail from './pages/apartment/ApartmentDetail'
import ApartmentList from './pages/apartment/ApartmentList'
import ApartmentSearch from './pages/apartment/ApartmentSearch'
import BillCreate from './pages/bill/BillCreate'
import BillDetail from './pages/bill/BillDetail'
import BillList from './pages/bill/BillList'
import BillListByApartmentId from './pages/bill/BillListByApartmentId'
import PersonCreate from './pages/person/PersonCreate'
import PersonDetail from './pages/person/PersonDetail'
import PersonList from './pages/person/PersonList'
import PersonSearch from './pages/person/PersonSearch'
import FeeList from './pages/fee/FeeList'
import FeeDetail from './pages/fee/FeeDetail'

function App() {

  return (
    <Routes>
      <Route element={<Private />}>
        <Route path='/' element={<Layout />}>
          <Route path='apartments'>
            <Route index element={<ApartmentList />}/>
            <Route path='create' element={<ApartmentCreate />}/>
            <Route path=':apartmentId' element={<ApartmentDetail />}/>
            <Route path='search' element={<ApartmentSearch />}/>
          </Route>
          <Route path='person'>
            <Route index element={<PersonList />}/>
            <Route path='create' element={<PersonCreate />}/>
            <Route path=':personId' element={<PersonDetail />}/>
            <Route path='search' element={<PersonSearch />}/>
          </Route>
          <Route path='bills'>
            <Route index element={<BillList />}/>
            <Route path='create' element={<BillCreate />}/>
            <Route path=':billId' element={<BillDetail />}/>
            <Route path='apartment/:apartmentId' element={<BillListByApartmentId />}/>
          </Route>
          <Route path='fees'>
            <Route index element={<FeeList/>}/>
            <Route path=':feeId' element={<FeeDetail/>}/>
          </Route>
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
