<script>
import { RouterLink, RouterView } from 'vue-router'
import Nav from '../components/Nav.vue'
import axios from "axios"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faPersonRunning, faEnvelope, faClock} from '@fortawesome/free-solid-svg-icons'
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
      clan1: false,
      text: [],
      textObj: {},
      longText: {},
      lang: "",
      asPopup: false,
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
    },
    async fetchText() {
        this.lang = localStorage.getItem('lang');
        try {
            let res = await axios.get('http://238p123.mars2.mars-hosting.com/API/text', {
                params: {
                    language: this.lang
                }
            })
            this.text = res.data.trazeniTekst
            for (let item of this.text) {
                this.textObj[item.tex_name] = item.tex_text
                this.longText[item.tex_name] = item.tex_long
            }
        } catch (error) {
            console.log(error);
        }
    },
  },
  async mounted() {
    this.fetchText()
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
    library.add(faPersonRunning, faEnvelope, faClock, faInstagram, faYoutube)
  }
}
</script>

<template>
  <Nav />
  <section aria-label="Sekcija: Hero">
    <div class="heroWrapper">
      <h1 class="heroText"><span class="rec1">{{ this.textObj.animePrva }}</span> <span class="rec2">{{ this.textObj.animeDruga }}</span> <span class="rec3">{{ this.textObj.animeTreca }}</span></h1>
    </div>
  </section>
  <section aria-label="Sekcija: Najava za sledeće kolo">
    <div class="najava">
      <h2>{{ this.textObj.naslovPridruzi }}</h2>
      <p class="datumNajave">{{ novoKolo  }}. {{ this.textObj.maKolo }}: {{ noviDatum }}</p>
      <button class="prijavaBtn">{{ this.textObj.dugmeTekst }}</button>
    </div>
  </section>
  <section aria-label="Sekcija: Ukratko o nama">
    <div class="ukratkoOnama">
      <div class="ukratkoText">
        <h2>{{ this.textObj.maUkrNaslov }} <span class="highlight">{{ this.textObj.maUkrNaslov1 }}</span></h2>
        <p>{{ this.longText.maUkrP }}</p>
        <RouterLink class="linkOnama" aria-label="Link do stranice: O nama" to="/onama">{{ this.longText.maUkrButton }}</RouterLink>
      </div>
      <img class="ukratkoImg" src="../assets/trcanje.jpg" alt="Trkači - slika">
    </div>
  </section>
  <section aria-label="Sekcija: Kako izgleda naš trening">
    <h2 class="fazeTreningaHeading">{{ this.textObj.maTreNaslov }}</h2>
    <div class="fazeTreninga">
      <div class="faza">
        <FontAwesomeIcon class="fazaIcon" icon="fa-solid fa-clock"></FontAwesomeIcon>
        {{ this.textObj.maTreP01 }}
      </div>
      <div class="faza">
        <img class="fazaIcon" src="../assets/jumpingJacks.svg" alt="jumping jacks slika">
        {{ this.textObj.maTreP02 }}
      </div>
      <div class="faza">
        <FontAwesomeIcon class="fazaIcon" icon="fa-solid fa-person-running"></FontAwesomeIcon>
        {{ this.textObj.maTreP03 }}
      </div>
      <div class="faza">
        <img class="fazaIcon" src="../assets/streching.svg" alt="jumping jacks slika">
        {{ this.textObj.maTreP04 }}
      </div>
    </div>
  </section>
  <section aria-label="Sekcija: Rezultati poslednjeg kola">
    <h2 class="poslednjeKoloHeading">{{ this.textObj.naslovRezPosK }}</h2>
    <div class="poslednjeKolo" v-for="(res, index) in this.poslednjeKolo" :key="index">
      <img :src="res.rez_kategorija == 'm' ? '/men.svg' : '/women.svg'" alt="trkač slika"><p :class="res.rez_kategorija == 'm' ? 'menColumn' : 'womenColumn'"><span class="bold">{{ res.rez_ime }} {{ res.rez_prezime }}</span> <span v-if="this.lang == 'sr'">{{ res.rez_kategorija == 'm' ? ('je istrčao') : ("je istrčala") }}</span> <span v-if="this.lang == 'en'">ran</span> <span class="bold">{{ res.rez_vreme }}</span> {{ this.textObj.maU }} {{ res.rez_kolo }} {{ this.textObj.maZbrlj }}</p>
    </div>
  </section>
  <section aria-label="Sekcija: Prethodna kola" id="kola">
    <h2 class="kolaHeading">{{ this.textObj.maPretKNaslov }}</h2>
    <div class="kola">
        <div class="kolo" @click="round($event)" v-for="(kolo, index) in this.poslednjaCetiri" :key="index" :data-id="id - index - 1">
            <p class="koloText">{{ kolo.rez_kolo }}. {{ this.textObj.maKolo }}</p>
            <p class="koloDatum">{{ this.formatDate(kolo.dat_datum) }}</p>
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
      <p class="eckaNajava">{{ this.textObj.maEckaNajava }} <a href="https://ulicnatrkaecka.com/" aria-label="Link do web sajta ulicnatrkaecka.com" target="_blank">{{ this.textObj.maEckaLink }}</a></p>
      <div class="odbrojavanjeWrapper">
          <p class="countDown" aria-live="polite" aria-atomic="true"></p>
          <a class="countDownBtn" aria-label="Prijavi se za 4. Uličnu trku Ečka (otvara se u novom prozoru)" href="https://trka.rs/events/479/" target="_blank">{{ this.textObj.maEckaPrijava }}</a>
      </div>
      <div class="overlay"></div>
    </div>
  </section>
  <section aria-label="Sekcija: Naš tim">
    <div class="nasTim">
      <h2 class="nasTimHeading">{{ this.textObj.maTimNaslov }}</h2>
      <div class="tim">
        <div class="clan">
          <img src="/nemanja.jpg" alt="član tima slika" class="clanImg">
          <p class="clanIme">Nemanja Djurić</p>
          <span class="clanZvanje">{{ this.textObj.maTimNemanja1 }}</span>
          <button class="clanBtn" @click="this.clan1 = !this.clan1">{{ this.textObj.maTimNemanja2 }}</button>
          <div class="clan1Popup" v-if="this.clan1">
            <button class="closeClan1" @click="this.clan1 =! this.clan1">X</button>
            <div class="clan1">
              <img src="/trkaEcka.jpg" alt="">
              <div class="oClanu">
                <p>{{ this.textObj.pup01 }} <span class="bold">{{ this.textObj.pup02 }}</span> {{ this.textObj.pup03 }} <a href="https://ulicnatrkaecka.com/" aria-label="Link do web sajta ulicnatrkaecka.com" target="_blank">{{ this.textObj.pup04 }}</a> {{ this.textObj.pup05 }}</p>
                <p>{{ this.textObj.pup06 }} <span class="bold">{{ this.textObj.pup07 }}</span></p>
              </div>
            </div>
            <div class="clan1">
              <img src="/nemanjaPariz.jpg" alt="">
              <div class="oClanu">
                <p>{{ this.longText.pup08 }}</p>
                <p>{{ this.textObj.pup09 }} <span class="bold">{{ this.textObj.pup10 }}</span> {{ this.textObj.pup11 }}</p>
              </div>
            </div>
            <div class="clan1">
              <img src="/nemanjaTrofeji.jpg" alt="">
              <div class="oClanu">
                <p>{{ this.textObj.pup12 }} <span class="bold">{{ this.textObj.pup13 }}</span> {{ this.textObj.pup14 }}</p>
                <p>{{ this.textObj.pup15 }}</p>
                <p>{{ this.textObj.pup16 }}</p>
              </div>
            </div>
            <div class="clan1Kontakt">
              <p><FontAwesomeIcon class="popupIcon" icon="fa-solid fa-envelope"></FontAwesomeIcon> zrligatrcanja@gmail.com</p>
              <a href="https://www.instagram.com/nemanja_djuric/" class="instagram" target="_blank"><FontAwesomeIcon class="popupIcon" icon="fa-brands fa-instagram"></FontAwesomeIcon>instagram.com/nemanja_djuric</a>
              <a href="https://youtu.be/wY4txhNQxdI?si=9q3vZ2ACCalIoaeu" class="youtube" target="_blank"><FontAwesomeIcon class="popupIcon" icon="fa-brands fa-youtube"></FontAwesomeIcon>Gostovanje na SANTOS kanalu</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section aria-label="Sekcija: Prijatelji lige">
    <h2 class="prijateljiLigeHeading">{{ this.textObj.maPrijNaslov }}</h2>
    <div class="prijateljiLige">
      <div class="eckaLogo">
        <img src="../assets/logo.png" alt="Ulična trka Ečka logo slika">
        <p>{{ this.textObj.maPrijP1 }}</p>
      </div>
      <img @click="this.asPopup = !this.asPopup" class="asImg" src="../assets/logo.png" alt="Ulična trka Ečka logo slika">
      <div class="asPopup" v-if="this.asPopup">
        <button class="closeClan1" @click="this.asPopup =! this.asPopup">X</button>
        <div class="asPopupText">
          <p><span class="bold">Borislav Mandić</span> {{ this.longText.as1 }}</p>
          <p>{{ this.longText.as2 }}</p>
          <p>{{ this.longText.as3 }}</p>
        </div>
        <img src="/borislav.jpg" alt="">
      </div>
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
  height: 97vh;
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
  background: linear-gradient(to right, #1f3242, #ff0c46 );
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
  color: #1f3242;
  transition: all .3s ease-in-out;

  /* color: transparent;
  background-image: linear-gradient(to right, #ff0c46,#1f3242);
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
  background-color: #1f3242;
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
  color: #1f3242;
}

/*-----------------------------------END OF FAZE TRENINGA SECTION --------------------------------*/


/*-------------------------------------LAST ROUND RESULTS SECTION --------------------------------*/

.poslednjeKolo{
  width: 45%;
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
  background-color: rgba(11, 62, 106, .8);
  font-size: 1.3em;
  padding: 15px;
  border-radius: 20px;
  width: 100%;
}
.womenColumn{
  background-color: rgba(255, 10, 67, .8);
  font-size: 1.3em;
  padding: 15px;
  border-radius: 20px;
  width: 100%;
}
/*----------------------------------END OF LAST ROUND RESULTS SECTION ----------------------------*/


/*---------------------------------------LAST ROUNDS SECTION ----------------------------*/
.kolaHeading{
  margin-top: 2em;
}
#kola .kola{
  width: 80%;
  margin: 2em auto;
}
#kola .kolo{
  width: 20%;
  color: #fff;
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
  margin: 2em auto;
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
  color: #1f3242;
  font-size: 2em;
  position: relative;
  z-index: 3;
  font-weight: 700;
  text-align: center;
  margin: 2em auto 0;
  text-decoration: none;
  background-color: #fff;
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
/*-------------------------------------END OF PRIJAVA ZA EČKU SECTION ----------------------------*/


/*----------------------------------------NAS TIM SECTION ---------------------------------------*/
.nasTim{
  background-color: #1f3242;
  color: #fff;
  margin-top: 4em;
}
.nasTimHeading{
  font-size: 3.5em;
  margin-top: .5em;
  /* color: #ff0c46; */
}
.tim{
  width: 80%;
  display: flex;
  justify-content: center;
  margin: 2em auto;
}
.clan{
  text-align: center;
}
.clanIme{
  font-size: 1.8em;
  font-weight: 900;
}
.clanZvanje{
  font-size: 1.3em;
}
.clanBtn{
  display: flex;
  width: 80%;
  justify-content: center;
  margin: .5em auto;
  background-color: #fff;
  border: 2px solid #fff;
  color: #1f3242;
  border-radius: 20px;
  padding: 10px ;
  font-size: 1.5em;
  font-weight: 900;
  cursor: pointer;
}
.clanImg{
  background-image: url('/nemanja.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 40vh;
  border-radius: 50%;
}
.clan1Popup{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 11;
  font-weight: 400;
  background-color: #fff;
  color: #1f3242;
  padding-top: 3em;
}
.closeClan1{
  position: fixed;
  top: .3em;
  right: .5em;
  background-color: transparent;
  border: none;
  font-size: 4em;
  font-weight: 900;
  color: #1f3242;
  cursor: pointer;
}
.clan1{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  font-size: 1.5em;
  line-height: 1.8em;
}
.clan1 img{
  width: 40%;
  border-radius: 20px;
}
.clan1:nth-child(3) {
  flex-direction: row-reverse;
}
.oClanu{
  width: 55%;
}
.oClanu a{
  color: #ff0c46;
}
.clan1Kontakt{
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 2em auto;
}
.clan1Kontakt p, .clan1Kontakt a{
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 1.5em;
}
.popupIcon{
  font-size: 3em;
  margin-right: .2em;
}
.instagram{
  color: #C13584;
}
.youtube{
  color: #ff0202;
}
/*---------------------------------------END OF NAS TIM SECTION -----------------------------------*/


/*-------------------------------------PRIJATELJI LIGE SECTION -----------------------------------*/
.prijateljiLigeHeading{
  margin: 2em 0;
}
.prijateljiLige{
  display: flex;
  justify-content: space-around;
}
.eckaLogo{
  width: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5em;
  font-weight: 900;
}
.eckaLogo img{
  width: 100%;
}
.asImg{
  width: 15%;
  cursor: pointer;
}
.asPopup{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 11;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
}
.asPopupText{
  width: 60%;
  font-size: 1.3em;
  line-height: 1.7em;
}
.asPopup img{
  height: 70vh;
  border-radius: 20px;
}
/*------------------------------END OF PRIJATELJI LIGE SECTION -----------------------------------*/

</style>