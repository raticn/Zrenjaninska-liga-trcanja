<script>
import axios from "axios"
import { RouterLink, RouterView } from 'vue-router'
import Nav from '../components/Nav.vue'


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
            console.log(this.rez);
            this.popup = this.kolo
        },
        formatDate(dateString) {
            const dateObject = new Date(dateString);
            const day = dateObject.getDate();
            const month = dateObject.getMonth() + 1; 
            const year = dateObject.getFullYear();

            const formattedDate = `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}.`;

            return formattedDate;
            }
    },
    async mounted() {
        let kola = await axios.get('http://238p123.mars2.mars-hosting.com/API/svaKola')
        this.kola = kola.data.odgovor
    },
}
</script>

<template>
<div class="liga">
    <Nav v-if="this.popup != this.kolo" />
    <h1>Zrenjaninska liga trčanja</h1>
    <div class="kola">
        <div class="kolo" @click="round($event)" v-for="(kolo, index) in this.kola" :key="index" :data-id="this.kola.length - index - 1">
            <p class="koloText">{{ kolo.rez_kolo }}. kolo</p>
            <p class="koloDatum">{{ this.formatDate(kolo.dat_datum) }}</p>
        </div>
    </div>
    <div class="koloPopup" v-if="this.popup == this.kolo">
        <button @click="this.kolo = null" class="closePopup">x</button>
        <h2>{{ this.kolo }}. kolo</h2>
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
            <tr v-for="(result, index) in this.rez" :key="index" :class="result.rez_kategorija == 'm' ? 'menColumn' : 'womenColumn'">
                <td>{{ index + 1 }}</td>
                <td><span v-if="index == 0">🥇</span><span v-if="index == 1">🥈</span><span v-if="index == 2">🥉</span>{{ result.rez_ime }}</td>
                <td>{{ result.rez_kategorija }}</td>
                <td>{{ result.rez_vreme }}</td>
                <td>{{ result.Tempo }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<style>
.liga .nav{
    position: fixed;
    background-color: #fff;
    border-bottom: 2px solid #1f3242;
    box-shadow: 0 0 10px #1f3242;
}
.liga .nav li{
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
    color: #ff0c46;
    font-weight: 700;
    text-align: center;
    cursor: pointer;
    margin:0 auto 2em;
    padding: 2em;
    border-radius: 20px;
}
.koloText{
    font-size: 2em;
}
.koloDatum{
    font-size: 1.2em;
}
.koloPopup{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
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
    /* border: 1px solid #1f3242; */
    /* text-align: left; */
    /* padding: 8px; */
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
</style>