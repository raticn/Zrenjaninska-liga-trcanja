<script>
import axios from "axios"
import Nav from '../components/Nav.vue'
import Footer from '../components/Footer.vue'
import { mapActions, mapState } from 'pinia'
import { useLigaStore } from '../store/ligaStore'

export default {
    data() {
        return {
            kola: [],
            rez: [],
            kolo: null,
            popup: 0,
        }
    },
    components: {
        Nav,
        Footer,
    },
    methods: {
        ...mapActions(useLigaStore, ['fetchText']),
        async round($event) {
            this.kolo = parseInt($event.currentTarget.getAttribute("data-id")) + 1
            let round = this.kolo
            let res = await axios.get('https://238p123.mars2.mars-hosting.com/API/rezultati', {
                params: {
                    kolo: round
                }
            })
            this.rez = res.data.rezultati
            this.popup = this.kolo
            console.log(this.rez, 'rez', round);
        },
        formatDate(dateString) {
        const dateObject = new Date(dateString);
        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1; 
        const year = dateObject.getFullYear();

        const formattedDate = `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}.`;

        return formattedDate;
        },
        filteredResults(category) {
            return this.rez.filter(result => result.rez_kategorija === category);
        },
    },
    computed: {
        ...mapState(useLigaStore, ['textObj', 'longText']),
    },
    async mounted() {
        window.scrollTo(0, 0)
        this.fetchText()
        let kola = await axios.get('https://238p123.mars2.mars-hosting.com/API/svaKola')
        this.kola = kola.data.odgovor
        // console.log(this.textObj);
    },
}
</script>

<template>
<div class="liga">
    <Nav v-if="this.popup != this.kolo" />
    <h1>{{ this.textObj.naslov }}</h1>
    <div class="kola">
        <div class="kolo" @click="round($event)" v-for="(kolo, index) in this.kola" :key="index" :data-id="this.kola.length - index - 1">
            <p class="koloText">{{ kolo.rez_kolo }}. {{ this.textObj.maKolo }}</p>
            <p class="koloDatum">{{ this.formatDate(kolo.dat_datum) }}</p>
        </div>
    </div>
    <div class="koloPopup" v-if="this.popup == this.kolo">
        <button @click="this.kolo = null" class="closePopup">x</button>
        <h2>{{ this.kolo }}. {{ this.textObj.maKolo }}</h2>
        <table class="tabela">
            <thead>
            <tr>
                <th>Rank</th>
                <th>{{ this.textObj.tabelaRekIme }} {{ this.textObj.and }} {{ this.textObj.tabelaRekPrezime }}</th>
                <th>{{ this.textObj.tabelaRekKat }}</th>
                <th>{{ this.textObj.tabelaRekVr }}</th>
                <th>{{ this.textObj.tabelaRekTem }}</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="(result, index) in filteredResults('m')" :key="'m' + index" class="menColumn">
                    <td>{{ index + 1 }}</td>
                    <td><span v-if="index == 0">🥇</span><span v-else-if="index == 1">🥈</span><span v-else-if="index == 2">🥉</span>{{ result.rez_ime }} {{ result.rez_prezime }}</td>
                    <td>{{ textObj.muskarci }}</td>
                    <td>{{ result.rez_vreme }}</td>
                    <td>{{ result.Tempo }}</td>
                </tr>
                <br>
                <tr v-for="(result, index) in filteredResults('z')" :key="'z' + index" class="womenColumn">
                    <td>{{ index + 1 }}</td>
                    <td><span v-if="index == 0">🥇</span><span v-else-if="index == 1">🥈</span><span v-else-if="index == 2">🥉</span>{{ result.rez_ime }} {{ result.rez_prezime }}</td>
                    <td>{{ textObj.zene }}</td>
                    <td>{{ result.rez_vreme }}</td>
                    <td>{{ result.Tempo }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
<Footer />
</template>

<style>
.liga .nav{
    position: fixed;
    background-color: #fff;
    border-bottom: 2px solid #1f3242;
    box-shadow: 0 0 10px #1f3242;
}
.liga .nav .navLink a{
    color: #1f3242;
}
.liga h1{
    margin-top: 2.5em;
    text-align: center;
    font-size: 4em;
}
.kola{
    width: 80%;
    margin: 2em auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.kolo{
    width: 80%;
    background-color: #1f3242;
    font-weight: 700;
    text-align: center;
    cursor: pointer;
    margin:0 auto 2em;
    padding: 2em;
    border-radius: 20px;
}
.koloText{
    font-size: 2em;
    color: #fff;
}
.koloDatum{
    font-size: 1.2em;
    color: #ff0c46;
}
.koloPopup{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    z-index: 40;
}
.koloPopup h2{
    margin-top: 2em;
    font-size: 3em;
}
.closePopup{
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
.tabela{
    width: 90%;
    margin: 2em auto;
    border-collapse: collapse;
}
td, th {
    width: 19%;
    text-align: center;
}
tr{
    border-radius: 20px;
    display: flex;
    justify-content: space-around;
    margin-bottom: 1em;
    color: #fff;
}
th {
    color: #1f3242;
    font-size: 1.5em;
    font-weight: 900;
}

@media (max-width: 2000px) {
    .liga h1{
        font-size: 5em;
        margin-top: 2em;
    }
    .koloText{
        font-size: 3em;
    }
}

@media (max-width: 1400px) {
    .kolo{
        padding: 1em;
    }
    .koloText{
        font-size: 2.5em;
    }
}

@media (max-width: 1024px) {
    .liga h1{
        font-size: 3.5em;
        margin-top: 2.5em;
    }
    .tabela{
        width: 150vw;
    }
    .koloPopup{
        overflow-x: auto;
    }
}

@media (max-width: 600px) {
    .liga h1{
        font-size: 3em;
    }
    .koloText{
        font-size: 2em;
    }
    .tabela{
        width: 230vw;
    }
}
</style>