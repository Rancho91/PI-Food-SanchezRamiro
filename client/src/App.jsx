import './App.css';
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import  FormRecipe  from "./component/insertRecipe/formRecipe"
import AllRecipe from "./component/allRecipe/allRecipe"
import RecipeDetail from "./component/detail/recipeDetail"
import Index from './component/inicio';
import {useState, useEffect} from "react"

function App() {
  return (
    <div className="App">
      <div className='henry'>
        <h1>Henry Food</h1>
      </div>
    <BrowserRouter>

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/form" element={<FormRecipe />} />
          <Route path="/home" element={<AllRecipe />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          
        </Routes>

      </BrowserRouter>
    </div>
  );

}

export default App;
