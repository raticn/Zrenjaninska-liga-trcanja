<script>
import axios from "axios"
import { RouterLink, RouterView } from 'vue-router'

export default {
    data() {
        return {
            kola: [],
            rez: [],
            kolo: null,
            popup: 0,
        }
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
        }
    },
    async mounted() {
        let kola = await axios.get('http://238p123.mars2.mars-hosting.com/API/svaKola')
        this.kola = kola.data.odgovor
    },
}
</script>

<template>
    <h1>Zrenjaninska liga trčanja</h1>
    <div class="kola">
        <RouterLink aria-label="Link do stranice: Liga" to="/liga"></RouterLink>
        <div class="kolo" @click="round($event)" v-for="(kolo, index) in this.kola" :key="index" :data-id="index">
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
</template>

<style>
.kola{
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-evenly;
}
.kolo{
    width: 14%;
    border: 2px solid #000;
    text-align: center;
    cursor: pointer;
}
.koloPopup{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
}
.tabela{
    width: 90%;
    margin: 2em auto;
    border-collapse: collapse;
}
th, td {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

th {
    background-color: #f2f2f2;
}
</style>