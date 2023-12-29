<script>
import Nav from '../components/Nav.vue'
import Footer from '../components/Footer.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { mapActions, mapState } from 'pinia'
import { useLigaStore } from '../store/ligaStore'

export default {
    data() {
        return {
            clan1: false,
        }
    },
    components: {
        Nav,
        FontAwesomeIcon,
        Footer
    },
    methods:{
        ...mapActions(useLigaStore, ['fetchText']),
    },
    computed: {
        ...mapState(useLigaStore, ['textObj', 'longText']),
    },
    async mounted(){
        window.scrollTo(0, 0)
        this.fetchText();
    },
    created() {
        library.add(faEnvelope, faInstagram, faYoutube)
    }
}
</script>

<template>
    <div class="onama">
        <Nav/>
        <h1>{{this.longText.onNaslov}}</h1>
        <section aria-label="Sekcija:O nama tekst">
            <h2>{{this.longText.onNaslov1}}</h2>
            <div class="ciljevi">
                <p>{{ this.longText.onPar01 }}</p>
                <p>{{ this.longText.onPar02 }}</p>
                <p>{{ this.longText.onPar03 }}</p>
                <p>{{ this.longText.onPar04 }}</p>
                <p>{{ this.longText.onPar05 }}</p>
                <p>{{ this.longText.onPar06 }}</p>
                <p>{{ this.longText.onPar07 }}</p>
                <p class="bold">{{ this.longText.onPar08 }}</p>
            </div>
        </section>
        <section aria-label="Sekcija: Pravila igre">
            <h2>{{this.longText.onNaslov2}}</h2>
            <div class="pravila">
                <p>{{ this.longText.onPar09 }}</p>
                <p>{{ this.longText.onPar10 }}</p>
                <p>{{ this.longText.onPar28 }}</p>
                <p>{{ this.longText.onPar11 }}</p>
                <p>{{ this.longText.onPar12 }}</p>
                <p>{{ this.longText.onPar13 }}</p>
                <p>{{ this.longText.onPar14 }}</p>
                <p>{{ this.longText.onPar15 }}</p>
                <p>{{ this.longText.onPar16 }}</p>
                <p>{{ this.longText.onPar17 }}</p>
                <p class="underline">{{ this.longText.onPar18 }}</p>
                <h3 class="zabranjenoHeading">{{ this.textObj.pravilaNaslov }}</h3>
                <div class="zabranjenoWrapper">
                    <div class="zabranjeno">
                        <img src="../assets/kalendar.svg" alt="Kalendar - slika">
                        <p>{{ this.longText.onPar19 }}</p>
                    </div>
                    <div class="zabranjeno">
                        <img src="../assets/tredmill.svg" alt="Traka za trčanje - slika">
                        <p>{{ this.longText.onPar20 }}</p>
                    </div>
                    <div class="zabranjeno">
                        <img src="../assets/stopwatch.svg" alt="Štoperica - slika">
                        <p>{{ this.longText.onPar21 }}</p>
                    </div>
                </div>
                <p>{{ this.longText.onPar22 }}</p>
                <p>{{ this.longText.onPar23 }}</p>
                <p>{{ this.longText.onPar24 }}</p>
                <p>{{ this.longText.onPar25 }}</p>
                <p>{{ this.longText.onPar26 }}</p>
                <p>{{ this.longText.onPar27 }}</p>
            </div>
        </section>
        <section aria-label="Sekcija: Naš tim">
        <div class="nasTim">
        <h2 class="nasTimHeading">{{ this.textObj.maTimNaslov }}</h2>
        <div class="tim">
            <div class="clan">
            <img src="https://238p123.mars2.mars-hosting.com/API/pictures/5" alt="Nemanja Djurić slika" class="clanImg">
            <p class="clanIme">Nemanja Djurić</p>
            <span class="clanZvanje">{{ this.textObj.maTimNemanja1 }}</span>
            <button class="clanBtn" @click="this.clan1 = !this.clan1">{{ this.textObj.maTimNemanja2 }}</button>
            <div class="clan1Popup" v-if="this.clan1">
                <button class="closeClan1" @click="this.clan1 =! this.clan1">X</button>
                <div class="clan1">
                <img class="popupImg1" src="https://238p123.mars2.mars-hosting.com/API/pictures/6" alt="Ulična trka Ečka">
                <div class="oClanu">
                    <p>{{ this.textObj.pup01 }} <span class="bold">{{ this.textObj.pup02 }}</span> {{ this.textObj.pup03 }} <a href="https://ulicnatrkaecka.com/" aria-label="Link do web sajta ulicnatrkaecka.com" target="_blank">{{ this.textObj.pup04 }}</a> {{ this.textObj.pup05 }}</p>
                    <p>{{ this.textObj.pup06 }} <span class="bold highlight">{{ this.textObj.pup07 }}</span></p>
                </div>
                </div>
                <div class="clan1">
                <img class="popupImg2" src="https://238p123.mars2.mars-hosting.com/API/pictures/4" alt="Trkač - slika">
                <div class="oClanu">
                    <p>{{ this.longText.pup08 }}</p>
                    <p>{{ this.textObj.pup09 }} <span class="bold highlight">{{ this.textObj.pup10 }}</span> {{ this.textObj.pup11 }}</p>
                </div>
                </div>
                <div class="clan1">
                <img class="popupImg3" src="https://238p123.mars2.mars-hosting.com/API/pictures/3" alt="Trkač - slika">
                <div class="oClanu">
                    <p>{{ this.textObj.pup12 }} <span class="bold highlight">{{ this.textObj.pup13 }}</span> {{ this.textObj.pup14 }}</p>
                    <p>{{ this.textObj.pup15 }}</p>
                    <p>{{ this.textObj.pup16 }}</p>
                </div>
                </div>
                <div class="clan1">
                <img class="popupImg4" src="https://238p123.mars2.mars-hosting.com/API/pictures/10" alt="Trckac - slika">
                <div class="clan1Kontakt">
                    <h3>{{ this.textObj.pupNaslovNem }}</h3>
                    <a href="mailto:zrligatrcanja@gmail.com" class="email"><FontAwesomeIcon class="popupIcon" icon="fa-solid fa-envelope"></FontAwesomeIcon> zrligatrcanja@gmail.com</a>
                    <a href="https://www.instagram.com/nemanja_djuric/" class="instagram" target="_blank"><FontAwesomeIcon class="popupIcon" icon="fa-brands fa-instagram"></FontAwesomeIcon>nemanja_djuric</a>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </section>
    </div>
    <Footer/>
</template>

<style>

/*----------------------------------------- O NAMA TEKST SECTION --------------------------------------*/

.onama .nav{
    position: fixed;
    background-color: #fff;
    border-bottom: 2px solid #0b3c68;
    box-shadow: 0 0 10px #0b3c68;
}
.onama .nav .navLink a{
    color: #0b3c68;
}
.onama h1{
    margin-top: 2.5em;
    text-align: center;
    font-size: 4em;
}
.onama h2{
    font-size: 2.5em;
    font-weight: 900;
    margin: 1em 0;
    text-align: center;
}

.ciljevi, .pravila{
    width: 90%;
    margin: 0 auto;
    font-size: 1.3em;
    line-height: 1.5em;
    padding-top: .5em; 
}
.pravila{
    padding-bottom: 2em;
}
.zabranjenoWrapper{
    display: flex;
    justify-content: space-between;
    align-items: start;
    width: 80%;
    margin: 0 auto 1em;
} 
.zabranjenoHeading{
    font-size: 2em;
    color: #ff0c46;
    text-align: center;
    margin: 1em 0;
}
.zabranjeno{
    width: 20%;
    text-align: center;
}
.underline{
    text-decoration: underline;
}
/*----------------------------------------END OF O NAMA TEKST SECTION --------------------------------*/

@media (max-width: 2000px) {
    .onama h1{
        font-size: 5em;
        margin-top: 2em;
    }
    .pravila, .ciljevi{
        font-size: 1.5em;
    }
    .zabranjenoHeading{
        height: 1em;
    }
}

@media (max-width: 1400px) {
    .onama h1{
        font-size: 4em;
        margin-top: 2em;
    }
    .pravila, .ciljevi{
        font-size: 1.2em;
    }
}

@media (max-width: 1024px) {
    .zabranjenoWrapper{
        width: 90%;
    }
    .zabranjeno{
        width: 30%;
    }
}

@media (max-width: 600px) {
    .onama h1{
        font-size: 3.5em;
    }
    .onama h2{
        font-size: 2em;
    }
    .zabranjenoWrapper{
        flex-direction: column;
    }
    .zabranjeno{
        width: 80%;
        margin: 0 auto 4em;
    }
}


</style>