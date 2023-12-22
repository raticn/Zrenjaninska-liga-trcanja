<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faXmark, faArrowRightArrowLeft, faBars} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from "axios"
import { mapActions, mapState } from 'pinia'
import { useLigaStore } from '../store/ligaStore'

export default {
    data()  {
        return {
            menu: false,
            lang: ''
        }
    },
    components: {
        FontAwesomeIcon,
    },
    methods: {
        ...mapActions(useLigaStore, ['fetchText']),
        changeLang() {
            if (localStorage.getItem("lang") == "sr") {
                localStorage.setItem("lang", "en")
                document.documentElement.lang = "en"
                location.reload()
            }
            else {
                localStorage.setItem("lang", "sr")
                document.documentElement.lang = "sr"
                location.reload()
            }
            // this.fetchText()
        },
    //     async fetchText() {
    //     let lang = localStorage.getItem('lang');
    //     try {
    //         let res = await axios.get('http://238p123.mars2.mars-hosting.com/API/text', {
    //             params: {
    //                 language: lang
    //             }
    //         })
    //         this.text = res.data.trazeniTekst
    //         for (let item of this.text) {
    //             this.textObj[item.tex_name] = item.tex_text
    //             this.longText[item.tex_name] = item.tex_long
    //         }
    //         console.log(this.text);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // },
    },
    computed: {
        ...mapState(useLigaStore, ['textObj', 'longText']),
    },
    mounted() {
        this.lang = localStorage.getItem('lang')
        window.addEventListener("scroll", function(){
        const scrollHeight = window.pageYOffset
        let nav = document.querySelector(".nav")
        if(scrollHeight > 1 ){
            nav.classList.add("fixedNav")
        }
        else{
            nav.classList.remove("fixedNav")
        }
})
    },
    created() {
        library.add(faXmark, faArrowRightArrowLeft, faBars)
    }
}
</script>

<template>
<header>
    <nav>
    <div class="nav">
        <img class="logo" src="../assets/zltLogo.svg"  alt="Zrenjaninska liga trcanja logo - slika">
        <ul class="navLista">
            <RouterLink aria-label="Link do stranice: Početna" to="/"><li class="navLink">{{ this.longText.foPocetna }}</li></RouterLink>
            <RouterLink aria-label="Link do stranice: Liga" to="/liga"><li class="navLink">{{ this.longText.foLiga }}</li></RouterLink>
            <RouterLink aria-label="Link do stranice: Rekordi" to="/rekordi"><li class="navLink">{{ this.longText.foRekordi }}</li></RouterLink>
            <RouterLink aria-label="Link do stranice: O nama" to="/onama"><li class="navLink">{{ this.longText.foOnama }}</li></RouterLink>
            <RouterLink aria-label="Link do stranice: O nama" to="/kontakt"><li class="navLink">{{ this.longText.foKontakt }}</li></RouterLink>
                        <!-- <li class="navLink prijava"><span><a aria-label="Prijavi se za trku (otvara se u novom prozoru)" href="https://trka.rs/events/479/" target="_blank">{{ this.shortText.prijavaNaslov }}</a></span></li> -->
            <li class="language" @click="changeLang">
                <img v-if="this.lang == 'en'" class="lang" src="../assets/srbija.webp" width="64" height="64" alt="Serbian flag image">
                <img v-if="this.lang == 'sr'" class="lang" src="../assets/amerika.png" width="64" height="64" alt="USA flag image">  
            </li>
        </ul>
    </div>
    <!-- <div class="nav2">
        <div class="menu">
            <div class="menuWrapper">
                <p class="nav2Header"><img class="logo2" src="../assets/zltLogo.svg" alt="Zrenjaninska liga trcanja logo - slika" @click="this.$router.push('/')"> {{ this.shortText.nav2Naslov }}</p>
                <FontAwesomeIcon @click="this.menu = !this.menu" class="bars" icon="fa-solid fa-bars"></FontAwesomeIcon>
            </div>
            <div class="dropDownMenu" v-if="this.menu">
                <p @click="this.menu = !this.menu" class="navLink2"><a aria-label="Pregled trka" href="#trke">{{ this.shortText.dogadjajinaslov }}</a>
                </p>
                <p @click="this.$router.push('/rezultati'); this.menu = !this.menu" class="navLink2">{{ this.shortText.rezultatinaslov }}</p>
                <p @click="this.menu = !this.menu; this.$router.push('/kontakt')" class="navLink2">{{ this.shortText.kontaktnaslov }}</p>
                <p @click="this.menu = !this.menu" class="navLink2 prijava2"><span><a aria-label="Prijavi se za trku (otvara se u novom prozoru)" href="https://trka.rs/events/479/" target="_blank">{{ this.shortText.prijavaNaslov }}</a></span></p>
                <div class="lang2" @click="changeLang(); this.menu = !this.menu">
                    <img class="langImg" src="../assets/srbija.webp" width="64" height="64" alt="Serbian flag image">
                    <FontAwesomeIcon class="langSw" icon="fa-solid fa-arrow-right-arrow-left"></FontAwesomeIcon>
                    <img class="langImg" src="../assets/amerika.png" width="64" height="64" alt="USA flag image">
                </div>
            </div>
        </div>
    </div> -->
    </nav>
</header>

</template>

<style>
.nav2{
    display: none;
}
.nav{
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    color: #000;
    width: 100%;
    z-index: 10;
}
.fixedNav{
    position: fixed;
    background-color: #fff;
    border-bottom: 2px solid #1f3242;
    box-shadow: 0 0 10px #1f3242;
}
.fixedNav li{
    color: #1f3242;
}
li a{
    color: #fff;
    text-decoration: none;
}
.logo{
    width: 4em;
    margin: 1em 0 1em 1em;
    cursor: pointer;
}
.navLista{
    display: flex;
    margin: 0;
    width: 90vw;
}
.navLista a{
    text-decoration: none;
}
.navLink{
    list-style: none;
    font-size: 1.5em;
    font-weight: 700;
    padding: 0.5em 1.5em;
    cursor: pointer;
    color: #fff;
}
.language{
    padding: 0 1.5em;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-left: auto;
}
.lang{
    width: 3em;
    height: auto;
}
.changeLang{
    font-size: 1.5em;
}
</style>