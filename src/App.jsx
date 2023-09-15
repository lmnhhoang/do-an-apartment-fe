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
import NewsList from './pages/news/NewsList'
import NewsDetail from './pages/news/NewsDetail'
import NewsCreate from './pages/news/NewsCreate'
import DevicesList from './pages/devices/DevicesList'
import DevicesDetail from './pages/devices/DevicesDetail'
import DevicesCreate from './pages/devices/DevicesCreate'
import ServicesCreate from './pages/services/ServicesCreate'
import ServicesDetail from './pages/services/ServicesDetail'
import ServicesList from './pages/services/ServicesList'
import UsersCreate from './pages/user/UsersCreate'
import UsersList from './pages/user/UsersList'

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
          <Route path='news'>
            <Route index element={<NewsList />}/>
            <Route path='create' element={<NewsCreate />}/>
            <Route path=':newsId' element={<NewsDetail />}/>
          </Route>
          <Route path='services'>
            <Route index element={<ServicesList />}/>
            <Route path='create' element={<ServicesCreate />}/>
            <Route path=':servicesId' element={<ServicesDetail />}/>
          </Route>
          <Route path='devices'>
            <Route index element={<DevicesList />}/>
            <Route path='create' element={<DevicesCreate />}/>
            <Route path=':devicesId' element={<DevicesDetail />}/>
          </Route>
          <Route path='users'>
            <Route index element={<UsersList />}/>
            <Route path='create' element={<UsersCreate />}/>
          </Route>
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
