<script>
import { RouterLink, RouterView } from 'vue-router'
import Nav from '../components/Nav.vue'
import axios from "axios"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPersonRunning, faClock} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  data() {
    return {
      noviDatum: "",
      novoKolo: "",
      poslednjeKolo: [],
      poslednjaCetiri: [],
      kolo: null,
      popup: 0,
      id: 0,
    }
  },
  components: {
    Nav,
    FontAwesomeIcon,
  },
  methods: {
      async round($event) {
          this.kolo = parseInt($event.currentTarget.getAttribute("data-id")) + 1
          let round = this.kolo
          let res = await axios.get('http://238p123.mars2.mars-hosting.com/API/rezultati', {
              params: {
                  kolo: round
              }
          })
          this.rez = res.data.rezultati
          this.popup = this.kolo
      },
      formatDate(dateString) {
      const dateObject = new Date(dateString);
      const day = dateObject.getDate();
      const month = dateObject.getMonth() + 1; 
      const year = dateObject.getFullYear();

      const formattedDate = `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`;

      return formattedDate;
    }
  },
  async mounted() {
    localStorage.setItem('nav', 'pocetna')
    const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith("sid=")) {
          document.cookie = `${cookie};expires=Thu, 01 Jan 1970 00:00:01 GMT`;
      break;
      }}
    let res = await axios.get('http://238p123.mars2.mars-hosting.com/API/dodavanjeSledKolo')
    this.noviDatum = this.formatDate(res.data.odgovor[0].Datum)
    this.novoKolo = res.data.odgovor[0].novoKolo

    let rezultati = await axios.get('http://238p123.mars2.mars-hosting.com/API/rezultati')
    this.poslednjeKolo = rezultati.data.poslednjeKoloRezultati

    let kola = await axios.get('http://238p123.mars2.mars-hosting.com/API/svaKola')
    this.poslednjaCetiri = kola.data.poslednjaCetiri
    this.id = kola.data.poslednjaCetiri[0].rez_kolo

    let countDownDate = new Date("Oct 26, 2024 13:00:00").getTime();
    
    let x = setInterval(function() {

    let now = new Date().getTime();

    let distance = countDownDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    let countDown = document.querySelector(".countDown")
    if(countDown){
        countDown.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    }

    if (distance < 0) {
    clearInterval(x);
    document.querySelector(".countDown").innerHTML = "EXPIRED";
    }
}, 1000);

    document.querySelector(".rec1").classList.add("fromTop1")
    document.querySelector(".rec2").classList.add("fromTop2")
    document.querySelector(".rec3").classList.add("fromTop3")
  },
  created() {
    library.add(faPersonRunning, faClock)
  }
}
</script>

<template>
  <Nav />
  <section aria-label="Sekcija: Hero">
    <div class="heroWrapper">
      <h1 class="heroText"><span class="rec1">ZRENJANINSKA</span> <span class="rec2">LIGA</span> <span class="rec3">TRČANJA</span></h1>
    </div>
  </section>
  <section aria-label="Sekcija: Najava za sledeće kolo">
    <div class="najava">
      <h2>Pridružite nam se u trčanju!</h2>
      <p class="datumNajave">{{ novoKolo  }}. kolo: {{ noviDatum }}</p>
      <button class="prijavaBtn">Prijavi se</button>
    </div>
  </section>
  <section aria-label="Sekcija: Ukratko o nama">
    <div class="ukratkoOnama">
      <div class="ukratkoText">
        <h2>Da li je ova liga namenjena i za <span class="highlight">početnike?</span></h2>
        <p>Liga je otvorena za svakoga, bez obzira na to da li trčiš kao profesionalac ili si tek početnik. Ideja je jednostavna - trčimo, zabavljamo se i upoznajemo ljude koji imaju istu strast prema trčanju kao i mi sami. Tako da možeš trčati, ili čak i brzo hodati - nema presude. Različite staze od 1 km do 5 km su tu da svako nađe šta mu odgovara, mada je glavni cilj istrčati 5 km. Dakle, bez obzira da li ste prvi put obuli patike ili već imaš nekoliko medalja, dobrodošli ste!</p>
        <RouterLink class="linkOnama" aria-label="Link do stranice: O nama" to="/onama">Pročitaj više o nama i našim pravilima</RouterLink>
      </div>
      <img class="ukratkoImg" src="../assets/trcanje.jpg" alt="Trkači - slika">
    </div>
  </section>
  <section aria-label="Sekcija: Kako izgleda naš trening">
    <h2 class="fazeTreningaHeading">Evo kako izgleda jedan naš trening:</h2>
    <div class="fazeTreninga">
      <div class="faza">
        <FontAwesomeIcon class="fazaIcon" icon="fa-solid fa-clock"></FontAwesomeIcon>
        Dolaženje na trening 10-15 minuta ranije u sportskoj opremi
      </div>
      <div class="faza">
        <img class="fazaIcon" src="../assets/jumpingJacks.svg" alt="jumping jacks slika">
        Rađenje vežbi zagrevanja i razgibavanja
      </div>
      <div class="faza">
        <FontAwesomeIcon class="fazaIcon" icon="fa-solid fa-person-running"></FontAwesomeIcon>
        Trčanje u grupi 1km do 5km (cilj je istrčati 5km)
      </div>
      <div class="faza">
        <img class="fazaIcon" src="../assets/streching.svg" alt="jumping jacks slika">
        Istezanje i upisivanje rezultata na stranicu
      </div>
    </div>
  </section>
  <section aria-label="Sekcija: Rezultati poslednjeg kola">
    <h2 class="poslednjeKoloHeading">Rezultati iz poslednjeg kola</h2>
    <div class="poslednjeKolo" v-for="(res, index) in this.poslednjeKolo" :key="index">
      <img :src="res.rez_kategorija == 'm' ? '/men.svg' : '/women.svg'" alt="trkač slika"><p :class="res.rez_kategorija == 'm' ? 'menColumn' : 'womenColumn'"><span class="bold">{{ res.rez_ime }} {{ res.rez_prezime }}</span> je <span>{{ res.rez_kategorija == 'm' ? ('istrčao') : ("istrčala") }}</span> <span class="bold">{{ res.rez_vreme }}</span> u {{ res.rez_kolo }}. kolu Zrenjaninske Lige Trčanja</p>
    </div>
  </section>
  <section aria-label="Sekcija: Prethodna kola" id="kola">
    <h2>Prethodna kola</h2>
    <div class="kola">
        <div class="kolo" @click="round($event)" v-for="(kolo, index) in this.poslednjaCetiri" :key="index" :data-id="id - index - 1">
            <p>{{ kolo.rez_kolo }}. kolo</p>
            <p>{{ kolo.dat_datum }}</p>
        </div>
    </div>
    <div class="koloPopup" v-if="this.popup == this.kolo">
      <button @click="this.kolo = null">x</button>
      <p>{{ this.kolo }}. kolo</p>
      <table class="tabela">
          <thead>
          <tr>
              <th>Rank</th>
              <th>Ime i prezime</th>
              <th>Kategorija</th>
              <th>Vreme</th>
              <th>Tempo</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(result, index) in this.rez" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ result.rez_ime }}</td>
              <td>{{ result.rez_kategorija }}</td>
              <td>{{ result.rez_vreme }}</td>
              <td>{{ result.Tempo }}</td>
          </tr>
          </tbody>
        </table>
      </div>
  </section>
  <section aria-label="Sekcija: Najava za 4. Uličnu trku Ečka">
    <div class="ecka">
      <p class="eckaNajava">Primpremi se uz nas za <a href="https://ulicnatrkaecka.com/" aria-label="Link do web sajta ulicnatrkaecka.com">4. Uličnu trku Ečka</a></p>
      <div class="odbrojavanjeWrapper">
          <p class="countDown" aria-live="polite" aria-atomic="true"></p>
          <a class="countDownBtn" aria-label="Prijavi se za 4. Uličnu trku Ečka (otvara se u novom prozoru)" href="https://trka.rs/events/479/" target="_blank">Prijavi se za trku</a>
      </div>
      <div class="overlay"></div>
    </div>
  </section>
</template>

<style>
*{
  font-family: Kumbh Sans;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
/*------------------------------------------ HERO SECTION --------------------------------------*/
.heroWrapper{
  background-image: url('../assets/zltHero.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
}
.rec1, .rec2, .rec3{
    position: absolute;
    top: 20%;
    left: -10%;
    font-weight: 900;
    color: #fff;
    width: 8em;
    text-align: center;
}
.fromTop1{
    animation: rec1 2s forwards;
}
.fromTop2{
    animation: rec2 2s forwards 0.5s;
}
.fromTop3{
    animation: rec3 2s forwards 1s;
}
@keyframes rec1 {
    0%{
        left: -10%;
        /* font-size: 11em; */
    }
    100%{
        left: 10%;
        font-size: 4em;
    }
}
@keyframes rec2 {
    0%{
        left: -10%;
        /* font-size: 11em; */
    }
    100%{
        top: 40%;
        left: 10%;
        font-size: 4em;
    }
}
@keyframes rec3 {
    0%{
        left: -10%;
        /* font-size: 11em; */
    }
    100%{
      top: 60%;
        left: 10%;
        font-size: 4em;
    }
}

/*------------------------------------ END OF HERO SECTION --------------------------------------*/

/*----------------------------------------- NAJAVA SECTION --------------------------------------*/
.najava{
  background: linear-gradient(to right, #0b3c68, #ff0c46 );
  width: 50%;
  border-radius: 20px;
  margin: 4em auto;
  color: #fff;
  padding: 50px 0;
  text-align: center;
}
.datumNajave{
  font-size: 2em;
  padding: .5em 0;
}
.prijavaBtn{
  border: 2px solid #fff;
  border-radius: 20px;
  color: #fff;
  font-size: 1.5em;
  background-color: transparent;
  padding: 10px 20px;
  margin-top: .5em;
  cursor: pointer;
  font-weight: 700;
}
.prijavaBtn:hover{
  background-color: #fff;
  color: #0b3c68;
  transition: all .3s ease-in-out;

  /* color: transparent;
  background-image: linear-gradient(to right, #ff0c46,#0b3c68);
  -webkit-background-clip: text;
  background-clip: text; */
}
h2{
  font-size: 2.5em;
  font-weight: 900;
  margin: 0 auto;
  text-align: center;
}
/*----------------------------------------END OF NAJAVA SECTION --------------------------------*/


/*----------------------------------------UKRATKO O NAMA SECTION --------------------------------*/
.ukratkoOnama{
  width: 90%;
  display: flex;
  margin: 2em auto;
}
.ukratkoText{
  background-color: #0b3c68;
  color: #fff;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  padding: 30px;
  width: 55%;
}
.ukratkoText p{
  font-size: 1.3em;
  line-height: 1.5em;
  padding-top: .5em;
}
.linkOnama{
  color: #fff;
  font-size: 1.5em;
  text-decoration: none;
  background-color: #ff0c46;
  border-radius: 20px;
  padding: 10px;
  margin: 1em auto;
  display: flex;
  width: 60%;
  justify-content: center;
  font-weight: 700;
}
.highlight{
  color: #ff0c46;
}
.ukratkoImg{
  width: 45%;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
/*-----------------------------------END OF UKRATKO O NAMA SECTION --------------------------------*/


/*-----------------------------------FAZE TRENINGA SECTION --------------------------------*/
.fazeTreningaHeading{
  margin: 2em 0 1em 0;
  font-size: 3.5em;
}
.fazeTreninga{
    width: 90%;
    margin: 1em auto;
    display: flex;
    justify-content: space-between;
}
.faza{
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 22%;
  font-size: 1.5em;
}
.fazaIcon{
  height: 5em;
  margin-bottom: .5em;
  color: #0b3c68;
}

/*-----------------------------------END OF FAZE TRENINGA SECTION --------------------------------*/


/*-------------------------------------LAST ROUND RESULTS SECTION --------------------------------*/

.poslednjeKolo{
  width: 40%;
  margin: .5em auto;
  color: #fff;
  border-radius: 20px;
  text-align: center;
  display: flex;
}
.poslednjeKolo img{
  height: 3em;
  width: 3em;
}
/* .poslednjeKolo:first-of-type{
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
}
.poslednjeKolo:last-of-type{
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  margin-bottom: 2em;
} */
.poslednjeKoloHeading{
  margin: 2em 0 1em 0;
}
.bold{
  font-weight: 700;
}
.menColumn{
  background-color: rgb(11, 62, 106, .8);
  font-size: 1.3em;
  padding: 15px;
  border-radius: 20px;
  width: 100%;
}
.womenColumn{
  background-color: rgb(255, 10, 67, .8);
  font-size: 1.3em;
  padding: 15px;
  border-radius: 20px;
  width: 100%;
}
/*----------------------------------END OF LAST ROUND RESULTS SECTION ----------------------------*/


/*---------------------------------------LAST ROUNDS SECTION ----------------------------*/
#kola .kola{
  width: 80%;
  margin: 2em auto;
}
#kola .kolo{
  width: 20%;
}
/*-------------------------------------END OF LAST ROUNDS SECTION ----------------------------*/


/*-------------------------------------PRIJAVA ZA EČKU SECTION ----------------------------*/
.ecka{
  background-image: url('../trkaEcka.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 70vh;
  width: 60vw;
  margin: 0 auto;
  padding-top: 8em;
  position: relative;
  border-radius: 20px;
}
.eckaNajava{
  color: #fff;
  font-size: 3em;
  position: relative;
  z-index: 3;
  font-weight: 900;
  text-align: center;
  margin-top: 1em;
}
.eckaNajava a{
  color: #fff;
}
.countDown{
  color: #fff;
  font-size: 5em;
  position: relative;
  z-index: 3;
  font-weight: 900;
  text-align: center;
  margin-top: 1em;
}
.countDownBtn{
  display: flex;
  justify-content: center;
  border: 2px solid #fff;
  width: 40%;
  padding: 5px 0;
  border-radius: 20px;
  color: #fff;
  font-size: 2em;
  position: relative;
  z-index: 3;
  font-weight: 700;
  text-align: center;
  margin: 2em auto 0;
  text-decoration: none;
}
.countDownBtn:hover{
  background-color: #fff;
  color: #0b3c68;
}
.overlay {
content: "";
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.4);
z-index: 2;
display: flex;
justify-content: center;
align-items: center;
}
/*-------------------------------------END OF LAST ROUNDS SECTION ----------------------------*/

</style>