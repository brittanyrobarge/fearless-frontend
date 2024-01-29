import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Nav from './Nav';
import Footer from './Footer';
import MainPage from './MainPage';
import AttendeesList from './AttendeesList'
import LocationForm from './LocationForm'
import ConferenceForm from './ConferenceForm'
import AttendConferenceForm from './AttendConferenceForm'
import PresentationForm from './PresentationForm';

function App(props) {
  if(props.attendees === undefined) {
    return null;
  }

  return (
    <>
      <BrowserRouter>
        <Nav />
        <div className="container">
          <Routes>
            <Route path="" element={<MainPage/>} />
            <Route path="conferences">
              <Route path="new" element={<ConferenceForm />} />
            </Route>
            <Route path="attendees">
              <Route path="" element={<AttendeesList attendees={props.attendees}/>} />
              <Route path="new" element={<AttendConferenceForm />} />
            </Route>
            <Route path="locations">
              <Route path="new" element={<LocationForm />} />
            </Route>
            <Route path="presentations">
              <Route path="new" element={<PresentationForm/>} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
