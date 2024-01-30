import React from 'react';
import './Pocetna.css';
import { FaUser, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Importovanje ikonica

const Pocetna = () => {
  return (
    <div className="container">
      <header>
        <h1>Društvene Mreže i Njihov Značaj</h1>
      </header>
      <main>
        <section className="section1">
          <h2>Značaj Društvenih Mreža</h2>
          <p>
            Društvene mreže su postale središnji dio naših života. One nam omogućuju da se povežemo s prijateljima, obitelji i kolegama na globalnoj razini.
          </p>
          <p>
            Osim toga, društvene mreže su postale moćan alat za marketing i promociju proizvoda i usluga. 
          </p>
        </section>
        <section className="section2">
          <h2>Prednosti  Društvenih Mreža</h2>
          <ul>
            <li>Brza komunikacija s prijateljima i obitelji širom svijeta.</li>
            <li>Mogućnost dijeljenja slika i videozapisa s drugima.</li>
            <li>Pratite najnovije vijesti i informacije iz cijelog svijeta.</li>
            <li>Povećajte svoju profesionalnu mrežu i stvarajte poslovne kontakte.</li>
            <li>Prilika za učenje i istraživanje različitih interesa i hobija.</li>
          </ul>
        </section>
        <section className="section3">
          <a href="#" className="icon-link">
            <div className="icon-div">
              <FaUser className="user-icon" />
            </div>
          </a>
          <a href="#" className="icon-link">
            <div className="icon-div">
              <FaFacebook className="social-icon" />
            </div>
          </a>
          <a href="#" className="icon-link">
            <div className="icon-div">
              <FaTwitter className="social-icon" />
            </div>
          </a>
          <a href="#" className="icon-link">
            <div className="icon-div">
              <FaInstagram className="social-icon" />
            </div>
          </a>
        </section>
      </main>
    </div>
  );
}

export default Pocetna;
