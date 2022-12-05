import React, { Component, Suspense } from 'react'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import Login from './views/pages/login/Login'
import DefaultLayout from './layout/DefaultLayout'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers

// Pages

// class App extends Component {
//   render() {
//     return (
//       <HashRouter>
//         <Suspense fallback={loading}>
//           <Routes>
//             <Route exact path="/login" name="Login Page" element={<Login />} />
//             <Route exact path="/register" name="Register Page" element={<Register />} />
//             <Route exact path="/404" name="Page 404" element={<Page404 />} />
//             <Route exact path="/500" name="Page 500" element={<Page500 />} />
//             <Route path="*" name="Home" element={<DefaultLayout />} />
//           </Routes>
//         </Suspense>
//       </HashRouter>
//     )
//   }
// }

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="*" element={<DefaultLayout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
