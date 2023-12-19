<script>
import { RouterLink, RouterView } from 'vue-router'
import Nav from '../components/Nav.vue'
import axios from "axios"

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

    document.querySelector(".rec1").classList.add("fromTop1")
    document.querySelector(".rec2").classList.add("fromTop2")
    document.querySelector(".rec3").classList.add("fromTop3")
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
  <section aria-label="Sekcija: Rezultati poslednjeg kola">
    <h2 class="poslednjeKoloHeading">Rezultati iz poslednjeg kola</h2>
    <div class="poslednjeKolo" v-for="(res, index) in this.poslednjeKolo" :key="index">
      <p :class="res.rez_kategorija == 'm' ? 'menColumn' : 'womenColumn'"><span :class="res.rez_kategorija == 'm' ? 'men' : 'women'">{{ res.rez_ime }} {{ res.rez_prezime }}</span> je <span>{{ res.rez_kategorija == 'm' ? ('istrčao') : ("istrčala") }}</span> <span :class="res.rez_kategorija == 'm' ? 'men' : 'women'">{{ res.rez_vreme }}</span> u {{ res.rez_kolo }}. kolu Zrenjaninske Lige Trčanja</p>
    </div>
  </section>
  <div>
    
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
                <!-- <th>{{ this.shortText.tablePol }}</th> -->
            </tr>
            </thead>
            <tbody>
            <tr v-for="(result, index) in this.rez" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ result.rez_ime }}</td>
                <td>{{ result.rez_kategorija }}</td>
                <td>{{ result.rez_vreme }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
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
  /* margin-top: 10%; */
  background: linear-gradient(to right, #0b3c68, #ff0c46 );
  width: 50%;
  border-radius: 20px;
  margin: 2em auto;
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


/*-------------------------------------LAST ROUND RESULTS SECTION --------------------------------*/

.poslednjeKolo{
  width: 50%;
  margin: 0 auto;
}
.poslednjeKolo:first-of-type{
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
}
.poslednjeKolo:last-of-type{
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
}
.poslednjeKoloHeading{
  margin: 2em 0 1em 0;
}
.men{
  color: #0b3c68;
  font-weight: 700;
}
.menColumn{
  background-color: rgba(11, 62, 106, .3);
  font-size: 1.3em;
  padding: 10px;
}
.women{
  color: #ff0c46;
  font-weight: 700;
}
.womenColumn{
  background-color: rgba(255, 10, 67, .3);
  font-size: 1.3em;
  padding: 10px;
}
/*----------------------------------END OF LAST ROUND RESULTS SECTION ----------------------------*/
</style>