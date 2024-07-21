import { BrowserRouter,Routes,Route } from 'react-router-dom';


import './App.css';






import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './components/Nav';

import SignUp from './components/SignUpForm';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/login';
import AddProduct from './components/AddProductForm';
import ChartComponent from './components/ChartComponent';
import Transaction from './components/Transaction'
import Landing from './components/Landing';
import Head from './components/Head';



function App() {
  return (
    <div className="App"><BrowserRouter>



    <Head />   
    <Nav />
    
    
     <Routes>
     <Route path='/' element={<Landing/>}></Route>
     <Route element={<PrivateComponent/>}>
     <Route path='/Home' element={<h1>Home</h1>}></Route>
     <Route path='/AddProduct' element={<AddProduct/>}></Route>
     <Route path='/ChartComponent' element={<ChartComponent/>}></Route>
     <Route path='/Transaction' element={<Transaction/>}></Route>
     <Route path='/Features' element={<h1>Features</h1>}></Route>
     <Route path='/Logout' element={<h1>logout</h1>}></Route>
      </Route>


     <Route path='/SignUp' element={<SignUp/>}></Route>
     <Route path='/Login' element={<Login/>}></Route>
     
     
     
     
     
     
     </Routes>
     
     </BrowserRouter>
     
    </div>
  );
}

export default App;
