import React from 'react';
import './App.css';
import Row from './components/row/Row';
import Banner from './components/banner/Banner';
import Nav from './components/nav/Nav';
import requests from './requests';

function App() {
  return (
    <div className="app">
      {/* NavBar */}
      <Nav />
      {/* Banner */}
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaires" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}

export default App;
