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
    library.add(faPersonRunning, faEnvelope, faClock, faInstagram, faYoutube)
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
    <h2 class="kolaHeading">Prethodna kola</h2>
    <div class="kola">
        <div class="kolo" @click="round($event)" v-for="(kolo, index) in this.poslednjaCetiri" :key="index" :data-id="id - index - 1">
            <p class="koloText">{{ kolo.rez_kolo }}. kolo</p>
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
      <p class="eckaNajava">Primpremi se uz nas za <a href="https://ulicnatrkaecka.com/" aria-label="Link do web sajta ulicnatrkaecka.com" target="_blank">4. Uličnu trku Ečka</a></p>
      <div class="odbrojavanjeWrapper">
          <p class="countDown" aria-live="polite" aria-atomic="true"></p>
          <a class="countDownBtn" aria-label="Prijavi se za 4. Uličnu trku Ečka (otvara se u novom prozoru)" href="https://trka.rs/events/479/" target="_blank">Prijavi se za trku</a>
      </div>
      <div class="overlay"></div>
    </div>
  </section>
  <section aria-label="Sekcija: Naš tim">
    <div class="nasTim">
      <h2 class="nasTimHeading">Naš tim</h2>
      <div class="tim">
        <div class="clan">
          <img src="/nemanja.jpg" alt="član tima slika" class="clanImg">
          <p class="clanIme">Nemanja Djurić</p>
          <span class="clanZvanje">Osnivač i trener</span>
          <button class="clanBtn" @click="this.clan1 = !this.clan1">Pročitaj o Nemanji</button>
          <div class="clan1Popup" v-if="this.clan1">
            <button class="closeClan1" @click="this.clan1 =! this.clan1">X</button>
            <div class="clan1">
              <img src="/trkaEcka.jpg" alt="">
              <div class="oClanu">
                <p>Đurić Nemanja je idejni tvorac <span class="bold">Zrenjaninske trkačke lige</span>, organizator <a href="https://ulicnatrkaecka.com/" aria-label="Link do web sajta ulicnatrkaecka.com" target="_blank">Ulične trke Ečke</a> i veliki zaljubljenik u sport, a posebno u ateletiku.</p>
                <p>Po struci je Master pravnik, a svoju ljubav prema atletici je krunisao skorašnjim školovanjem i postao <span class="bold">operativni trener atletike</span>.</p>
              </div>
            </div>
            <div class="clan1">
              <img src="/nemanjaPariz.jpg" alt="">
              <div class="oClanu">
                <p>Bavi se sportom celog života - dugo godina se bavio plivanjem i  crossfitom, a svoju ljubav prema atletici je spoznao na studijama 2016. godine kada je istrčao svoju prvu trku. Od tada je ta ljubav počela sve više da jača i trčanje je postalo stil života.</p>
                <p>Iza sebe ima preko <spna class="bold">350 istrčanih trka</spna>, učesnik je većine trka u Srbiji i širom sveta.</p>
              </div>
            </div>
            <div class="clan1">
              <img src="/nemanjaTrofeji.jpg" alt="">
              <div class="oClanu">
                <p>Nemanja je poslednje 2 godine bio <span class="bold">najbrži Zrenjaninac</span> i učestvovao je na svim trkama koje su se održavale u Zrenjaninu. Cilj mu je da svojim primerom motiviše što veći broj ljudi i pozove ih da krenu da se bave sportom.</p>
                <p>Trčanje vidi kao platformu za lično usavršavanje na svim poljima, druženje i neraskidiva prijateljstva, ali pre svega kao blagu i blagotvornu aktivnost koja treba da koriguje, a ne da dalje produbljuje slabe tačke na telu.</p>
                <p>Poručuje da je tu za svakoga kada je sport u pitanju i da će vrlo rado pomoći novajlijama u atletici kao i onima koji žele da poboljšauju svoje rezultate.</p>
              </div>
            </div>
            <div class="clan1Kontakt">
              <p><FontAwesomeIcon class="popupIcon" icon="fa-solid fa-envelope"></FontAwesomeIcon> zrligatrcanja@gmail.com</p>
              <a href="https://www.instagram.com/nemanja_djuric/" class="instagram" target="_blank"><FontAwesomeIcon class="popupIcon" icon="fa-brands fa-instagram"></FontAwesomeIcon>instagram.com/nemanja_djuric</a>
              <a href="https://youtu.be/wY4txhNQxdI?si=9q3vZ2ACCalIoaeu" class="youtube" target="_blank"><FontAwesomeIcon class="popupIcon" icon="fa-brands fa-youtube"></FontAwesomeIcon>Gostovanje na SANTOS kanalu</a>
            </div>
          </div>
        </div>
        <div class="clan">
          <img src="/nemanja.jpg" alt="član tima slika" class="clanImg">
          <p>Nemanja Djurić</p>
          <span>Osnivač i trener</span>
        </div>
      </div>
    </div>
  </section>
  <section aria-label="Sekcija: Prijatelji lige">
    <h2 class="prijateljiLigeHeading">Prijatelji lige</h2>
    <div class="prijateljiLige">
      <div class="eckaLogo">
        <img src="../assets/logo.png" alt="Ulična trka Ečka logo slika">
        <p>Ulična trka Ečka</p>
      </div>
      <img class="asImg" src="../assets/logo.png" alt="Ulična trka Ečka logo slika">
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
  justify-content: space-around;
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
  position: absolute;
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


/*---------------------------------------END OF NAS TIM SECTION -----------------------------------*/
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
}
/*---------------------------------------END OF NAS TIM SECTION -----------------------------------*/

</style>