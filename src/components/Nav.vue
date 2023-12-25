<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInstagram, faYoutube, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faBars} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { mapActions, mapState } from 'pinia'
import { useLigaStore } from '../store/ligaStore'

export default {
    data()  {
        return {
            menu: false,
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
        },
    },
    computed: {
        ...mapState(useLigaStore, ['textObj', 'longText', 'lang']),
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
        library.add(faEnvelope, faBars, faInstagram, faYoutube, faFacebook)
    }
}
</script>

<template>
<header>
    <nav>
    <div class="nav">
        <img class="logo" src="../assets/zltLogo.svg"  alt="Zrenjaninska liga trcanja logo - slika">
        <ul class="navLista">
            <li class="navLink"><RouterLink aria-label="Početna" to="/">{{ this.longText.foPocetna }}</RouterLink></li>
            <li class="navLink"><RouterLink aria-label="Liga" to="/liga">{{ this.longText.foLiga }}</RouterLink></li>
            <li class="navLink"><RouterLink aria-label="Rekordi" to="/rekordi">{{ this.longText.foRekordi }}</RouterLink></li>
            <li class="navLink"><RouterLink aria-label="O nama" to="/onama">{{ this.longText.foOnama }}</RouterLink></li>
            <li class="navLink"><RouterLink aria-label="Kontakt" to="/kontakt">{{ this.longText.foKontakt }}</RouterLink></li>
            <li class="navIcon"><a href="https://www.facebook.com/profile.php?id=61555169690681" class="facebook" target="_blank"><FontAwesomeIcon class="navBrandIcon" icon="fa-brands fa-facebook"></FontAwesomeIcon></a></li>
            <li class="navIcon"><a href="https://www.instagram.com/zrenjaninska_ligatrcanja/" class="instagram" target="_blank"><FontAwesomeIcon class="navBrandIcon" icon="fa-brands fa-instagram"></FontAwesomeIcon></a></li>
            <li class="navIcon"><a href="https://youtu.be/wY4txhNQxdI?si=9q3vZ2ACCalIoaeu" class="youtube" target="_blank"><FontAwesomeIcon class="navBrandIcon" icon="fa-brands fa-youtube"></FontAwesomeIcon></a></li>
            <li class="language" @click="changeLang">
                <img v-if="this.lang == 'en'" class="lang" src="../assets/srbija.webp" width="64" height="64" alt="Serbian flag image">
                <img v-if="this.lang == 'sr'" class="lang" src="../assets/engleska.jpg" width="64" height="64" alt="English flag image">  
            </li>
        </ul>
    </div>
    <div class="nav2">
        <div class="menu">
            <div class="menuWrapper">
                <p class="nav2Header"><img class="logo2" src="../assets/zltLogo.svg" alt="Zrenjaninska liga trcanja logo - slika" @click="this.$router.push('/')"> {{ this.textObj.naslov }}</p>
                <FontAwesomeIcon @click="this.menu = !this.menu" class="bars" icon="fa-solid fa-bars"></FontAwesomeIcon>
            </div>
            <div class="dropDownMenu" v-if="this.menu">
                <ul class="navLista2">
                    <li class="navLink2"><RouterLink aria-label="Početna" to="/">{{ this.longText.foPocetna }}</RouterLink></li>
                    <li class="navLink2"><RouterLink aria-label="Liga" to="/liga">{{ this.longText.foLiga }}</RouterLink></li>
                    <li class="navLink2"><RouterLink aria-label="Rekordi" to="/rekordi">{{ this.longText.foRekordi }}</RouterLink></li>
                    <li class="navLink2"><RouterLink aria-label="O nama" to="/onama">{{ this.longText.foOnama }}</RouterLink></li>
                    <li class="navLink2"><RouterLink aria-label="Kontakt" to="/kontakt">{{ this.longText.foKontakt }}</RouterLink></li>
                    <div class="navIconsWrapper">
                        <li class="navIcon2"><a href="https://www.instagram.com/nemanja_djuric/" class="facebook" target="_blank"><FontAwesomeIcon class="navBrandIcon" icon="fa-brands fa-facebook"></FontAwesomeIcon></a></li>
                        <li class="navIcon2"><a href="https://www.instagram.com/zrenjaninska_ligatrcanja/" class="instagram" target="_blank"><FontAwesomeIcon class="navBrandIcon" icon="fa-brands fa-instagram"></FontAwesomeIcon></a></li>
                        <li class="navIcon2"><a href="https://youtu.be/wY4txhNQxdI?si=9q3vZ2ACCalIoaeu" class="youtube" target="_blank"><FontAwesomeIcon class="navBrandIcon" icon="fa-brands fa-youtube"></FontAwesomeIcon></a></li>
                    </div>
                    <li class="language" @click="changeLang">
                        <img v-if="this.lang == 'en'" class="lang" src="../assets/srbija.webp" width="64" height="64" alt="Serbian flag image">
                        <img v-if="this.lang == 'sr'" class="lang" src="../assets/engleska.jpg" width="64" height="64" alt="English flag image">  
                    </li>
                </ul>
            </div>
        </div>
    </div>
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
.navLink a{
    text-decoration: none;
    color: #fff;
}
.fixedNav{
    position: fixed;
    background-color: #fff;
    border-bottom: 2px solid #1f3242;
    box-shadow: 0 0 10px #1f3242;
}
.fixedNav .navLink a{
    color: #1f3242;
}
a li{
    color: #fff;
    text-decoration: none;
}
.logo{
    width: 3em;
    margin: 1em 0 1em 1em;
    cursor: pointer;
}
.navLista{
    display: flex;
    margin: 0;
    width: 90vw;
    align-items: center;
}

.navBrandIcon{
    font-size: 2.5em;
    margin-right: .8em;
}
.navIcon:first-of-type{
    margin-left: auto;
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
    width: 4em;
    height: auto;
}
.changeLang{
    font-size: 1.5em;
}

@media (max-width: 2000px) {
    .navLink{
        font-size: 1.8em;
    }
    .logo{
        width: 4em;
    }
    .navIcon{
        font-size: 1.3em;
    }
    .lang{
        width: 5em;
    }
}

@media (max-width: 1700px) {
    .navLink{
        font-size: 1.5em;
    }
    .logo{
        width: 4em;
    }
    .navIcon{
        font-size: 1.2em;
    }
    .lang{
        width: 4em;
    }
}

@media (max-width: 1400px) {
    .navLink{
        font-size: 1.3em;
    }
    .navIcon{
        font-size: 1.1em;
    }
}

@media (max-width: 1024px) {
    .nav{
        display: none;
    }
    #header{
        position: fixed;
    }
    .nav2{
        display: block;
        width: 100vw;
        margin: 0 auto;
        position: fixed;
        top: 0;
        left: 0;
        color: #fff;
        font-weight: 700;
        font-size: 1.3em;
        z-index: 20;
        background-color: #fff;
        border-bottom: 2px solid #1f3242;
        box-shadow: 0 0 10px #1f3242;
    }
    .menuWrapper{
        display: flex;
        align-items: center;
        justify-content: space-around;
        color: #1f3242;
    }
    .nav2Header{
        display: flex;
        align-items: center;
        font-size: 1.3em;
    }
    .logo2{
        width: 2.5em;
        margin: .5em .5em .5em 0;
    }
    .navLink2 a{
        display: flex;
        list-style: none;
        color: #1f3242;
        font-size: 1.1em;
        margin: .5em 0 .5em .5em;
    }
    .navLista2 a{
        text-decoration: none;
    }
    .navIconsWrapper{
        display: flex;
        justify-content: space-around;
    }
    .navIcon2{
        display: inline-block;
    }
    .navLista2 .language{
        justify-content: center;
        margin: .8em 0;
    }
    .bars{
        font-size: 1.2em;
    }
}

@media (max-width: 600px) {
    .nav2Header{
        font-size: 1.1em;
    }
}

@media (max-width: 360px) {
    .nav2Header{
        font-size: 1em;
    }
}
</style>