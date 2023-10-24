import { Routes, Route, HashRouter } from 'react-router-dom';
import "./index.scss";
import Header from './views/global/header/Header';
import Footer from './views/global/footer/Footer';
import Sign from './views/global/sign/Sign';
import CandidateCompanies from './views/candidate/companies/CandidateCompanies'
import CandidateCompaniesDetail from './views/candidate/companies/companiesDetail/CandidateCompaniesDetail'
import Offers from './views/global/offers/Offers';
import EmployerHome from './views/employer/EmployerHome';
import FormEmployer from './views/employer/form-employer/FormEmployer';
import Concept from './views/global/About/Concept/Concept';
import About_us from './views/global/About/About_us/About_us';
import Help_Center from './views/global/About/Help_Center/Help_Center';
import Newsletter from './views/global/Newsletter/Newsletter';
import AdminHome from './views/admin/companies/AdminHome';
import AdminUsers from './views/admin/users/AdminUsers';
import AdminOffers from './views/admin/offers/AdminOffers';
import FormCompany from './views/admin/companies/FormCompany';
import CandidateSignUp from './views/candidate/sign-up/CandidateSignUp';
import CreationOffer from './views/employer/create_offer/CreateOffer';
import AdminOffercreation from './views/admin/offers/admin_create_offer/AdminOfferCreate';
import AdminFormUser from './views/admin/users/AdminCreateUsers/AdminCreateUsers';
import PersonalInfos from './views/global/personalInfos/PersonalInfos';

export default function App() {

  return (
    <>
      <div className='app-container'>
        <HashRouter>
          <Header />

          <Routes>
            <Route path='/' element={<Offers />}></Route>
            <Route path='/sign' element={<Sign />}></Route>
            <Route path='/candidate/sign-up' element={<CandidateSignUp />}></Route>
            <Route path='/companies' element={<CandidateCompanies />}></Route>
            <Route path='/company/:id' element={<CandidateCompaniesDetail />}></Route>
            <Route path='/form-employer' element={<FormEmployer />}></Route>
            <Route path='/employer' element={<EmployerHome />}></Route>
            <Route path='/Concept' element={<Concept />}></Route>
            <Route path='/personal-infos' element={<PersonalInfos />}></Route>
            <Route path='/Help_Center' element={<Help_Center />}></Route>
            <Route path='/About_us' element={<About_us />}></Route>
            <Route path='/Newsletter' element={<Newsletter />}></Route>
            <Route path='/admin/users' element={<AdminUsers />}></Route>
            <Route path='/admin' element={<AdminHome />}></Route>
            <Route path='/admin/FormCompany' element={<FormCompany />}></Route>
            <Route path='/admin/offers' element={<AdminOffers />}></Route>
            <Route path='/admin/offer/creation' element={<AdminOffercreation />}></Route>
            <Route path='/admin/form-user' element={<AdminFormUser />}></Route>
            <Route path='/employer/offer/creation' element={<CreationOffer />}></Route>
          </Routes>

          <Footer />
        </HashRouter>
      </div>

    </>
  )
}