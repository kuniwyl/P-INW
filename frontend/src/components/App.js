import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Main from "./Main";
import StartPage from "./StartPage"

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheckSquare, faCoffee)


const App = () => {

  return(
    <Router>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/" element={<StartPage />} />
      </Routes>
    </Router>
  )
}

export default App;