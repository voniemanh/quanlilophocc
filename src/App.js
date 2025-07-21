import {Link, Route, Routes} from 'react-router-dom';
import ListStudent from './components/ListStudent';
import AddStudent from './components/AddStudent';

function App() {
  return (<>
    <Link to={"/students"}>List Student</Link>
    <Link to={"/add-student"}>Add Student</Link>
    <Routes>
      <Route path="/students" element={<ListStudent />} />
      <Route path='/add-student' element={<AddStudent/>}/>
    </Routes>
  </>)
}

export default App;
