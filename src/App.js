import './App.css';
import MainDashBoard from './components/DashBoardComponents/MainDashBoard';
import Login from './components/Login/Login';
import AddQuestionModal from './components/Modals/AddQuestionModal';
// import DeleteAnalysisModal from './components/Modals/DeleteTaskModal';
// import QuizInterFaceModal from './components/Modals/QuizInterFaceModal';
// import QuizTypeModal from './components/Modals/QuizTypeModal';
// import CompletedQuizmodal from './components/Modals/CompletedQuizmoda
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './components/Main/Main';
import { ToastContainer } from 'react-toastify';
import SharedTaskPage from './components/sharedPage/SharedTaskPage';
// require('dotenv').config()


function App() {
  return (
    <div className="App">
      {/* // Route in your React application to display the shared task */}
{/* <Route path="/shared-task" element={<SharedTaskPage/>} /> */}

       {/* <BrowserRouter> */}
    {/* <Login/> */}
    {/* <MainDashBoard/> */}
    {/* <DeleteAnalysisModal/> */}
    {/* <QuizTypeModal/> */}
    {/* <AddQuestionModal/> */}
    {/* <QuizInterFaceModal/> */}
{/* <CompletedQuizmodal/>     */}
<Main/>
<ToastContainer/>
{/* </BrowserRouter> */}
    </div>
  );
}

export default App;
