import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { fetchDataFromApi } from './utils/api'

import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration, getGenres } from './store/homeSlice'


import {Header,Footer} from './components'
import {SearchResult,Home,Explore,Details,PageNotFound} from './pages'


function App() {

  const dispatch = useDispatch()
  const {url} = useSelector((state) => state.home)
  console.log(url)

useEffect(() => {
  fetchApiConfig();
  generesCall();
},[])

const fetchApiConfig = () => {
  fetchDataFromApi('/configuration')
  .then((res) => {
    // console.log(res)
    const url = {
      backdrop: res.images.secure_base_url + "original",
      poster: res.images.secure_base_url + "original",
      profile: res.images.secure_base_url + "original"
    }
    dispatch(getApiConfiguration(url))
  })
  .catch((err) => {
    console.log(err)
  })
}

//* Code for call genere api of two types TV and MOVIES using Promise.all
const generesCall = async () => {
  let promises = []
  let endPoints = ["tv","movie"]
  let allGeneres = {}

  endPoints.forEach((url) => {
    promises.push(fetchDataFromApi(`/genre/${url}/list`)) 
  })

  const data = await Promise.all(promises)
  data.map(({ genres }) => {
    return genres.map((item) => (allGeneres[item.id] = item))
  })

  //* storing data in a store

  dispatch(getGenres(allGeneres))
}

  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
