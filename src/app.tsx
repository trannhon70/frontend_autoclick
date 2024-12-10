// Modified from the create-react-app TypeScript template
// See: https://github.com/facebook/create-react-app/blob/main/packages/cra-template-typescript/template/src/App.tsx
import React from 'react';
import {  Routes, Route } from "react-router";
import Login from './pages/login';

export default class App extends React.Component {
  render() {
    return (
      <Routes>
      <Route index element={<Login />} />
      {/* <Route path="about" element={<About />} />
    
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    
      <Route path="concerts">
        <Route index element={<ConcertsHome />} />
        <Route path=":city" element={<City />} />
        <Route path="trending" element={<Trending />} />
      </Route> */}
    </Routes>
    );
  }
}
