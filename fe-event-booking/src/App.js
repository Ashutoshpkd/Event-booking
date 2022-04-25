import { connect } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom'
import NavBar from './components/Navigation/NavBar';
import Auth from './pages/Auth/Auth';
import Bookings from './pages/Bookings/Bookings';
import Events from './pages/Events/Event';

function App(props) {
  const {
    token,
    login,
    logout,
  } = props;

  return (
    <>
    <NavBar 
      title={"Easy Steps"}
      authenticate='Authenticate'
      bookings='Bookings'
      events='Events'
      token={token}
    />
      <Routes>
        {!token && (<Route path="/" element={<Navigate to="/auth" replace/>}/>)}
        {token && (<Route path="/auth" element={<Navigate to="/events" replace/>}/>)}
        {!token && (<Route path="/auth" element={<Auth loginHandler={login} logout={logout}/>}/>)}
        {!token && (<Route path="/bookings" element={<Bookings />}/>)}
        <Route path="/events" element={<Events />}/>
      </Routes>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    token: state.token,
    userId: state.userId,
  }
};

const dispatchToProps = (dispatch) => {
  return {
    login: (payload) => dispatch({payload, type:'LOGIN'}),
    logout: () => dispatch({type: 'LOGOUT'}),
  }
};

export default connect(mapStateToProps, dispatchToProps)(App);
