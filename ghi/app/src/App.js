import Nav from './Nav';
import Footer from './Footer';
import AttendeesList from './AttendeesList'
import LocationForm from './LocationForm'
import ConferenceForm from './ConferenceForm'

function App(props) {
  if(props.attendees === undefined) {
    return null;
  }

  return (
    <>
      <Nav />
      <div className="container">
        <ConferenceForm />
        {/* <LocationForm /> */}
        {/* <AttendeesList attendees={props.attendees}/> */}
      </div>
      <Footer />
    </>
  );
}

export default App;

