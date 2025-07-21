import {Link, Route, Routes} from 'react-router-dom';
import ListStudent from './components/ListStudent';
import AddStudent from './components/AddStudent';
import DetailsStudent from './components/DetailsStudent';

function App() {
  return (<>
    <Link to={"/students"}>List Student</Link>
    <Link to={"/add-student"}>Add Student</Link>
    <Routes>
      <Route path="/students" element={<ListStudent />} />
      <Route path='/add-student' element={<AddStudent/>}/>
      <Route path='/view-student/:id' element={<DetailsStudent/>}/>
    </Routes>
  </>)
}

export default App;
