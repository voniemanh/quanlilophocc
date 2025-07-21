import {Link, Route, Routes} from 'react-router-dom';
import ListStudent from './ListStudent';
import AddStudent from './AddStudent';

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
