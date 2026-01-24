<script>
import axios from "axios"
import Nav from '../components/Nav.vue'
import Footer from '../components/Footer.vue'
import { mapActions, mapState } from 'pinia'
import { useLigaStore } from '../store/ligaStore'

export default {
    data() {
        return {
            rekordi: [],
            topM: [],
            topZ: [],
            topAll: [],
            top2024: [],
            topDistanca: [],
            topTrenutnaGodina: [],
            top2025: [],
        }
    },
    components: {
        Nav,
        Footer
    },
    methods: {
        ...mapActions(useLigaStore, ['fetchText']),
        parseTempo(tempo) {
            const parts = tempo.split(':').map(Number);
            return parts[0] * 3600 + parts[1] * 60 + parts[2];
        },
        formatTime(seconds) {
            const roundedSeconds = Math.round(seconds);
            const hours = Math.floor(roundedSeconds / 3600);
            const minutes = Math.floor((roundedSeconds % 3600) / 60);
            const remainingSeconds = roundedSeconds % 60;

            // Formatiraj sa vodećim nulama
            const formattedHours = String(hours).padStart(2, '0');
            const formattedMinutes = String(minutes).padStart(2, '0');
            const formattedSeconds = String(remainingSeconds).padStart(2, '0');

            return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        }
    },
    computed: {
        ...mapState(useLigaStore, ['textObj', 'longText']),
    },
    async mounted() {
        window.scrollTo(0, 0)
        this.fetchText()
        let res = await axios.get('https://238p123.mars2.mars-hosting.com/API/rekordi')
        this.topM = res.data.Top10Muski
        this.topZ = res.data.Top10Zene
        this.topAll = res.data.Top10Svi
        this.top2025 = res.data.Top10god2025
        // this.topAll.sort((a, b) => b.Distanca - a.Distanca);
        this.topAll = this.topAll.filter(result => result.Distanca === 5)
        // console.log(this.topAll,'all');
        // console.log(res.data.Top10Distanca,'res');
        this.top2024 = res.data.Top10god2024
        console.log(this.top2024, '2024');
        this.topTrenutnaGodina = res.data.Top10god2026
        // console.log(this.topTrenutnaGodina, 'trenutna')
        // this.top2024 = this.topAll.filter(result => result.Distanca === 5)
        console.log(this.top2024);
        this.topDistanca = res.data.Top10Distanca
        this.topDistanca.sort((a, b) => {
            if (a.Distanca !== b.Distanca) {
                return b.Distanca - a.Distanca; 
            } else {
                return a.TempoSekunde - b.TempoSekunde; 
            }
        });
    },
}
</script>

<template>
    <div class="recordsWrapper">
        <Nav />
        <h1>{{ this.textObj.rek }}</h1>
        <div class="topDistanca">
            <h2>{{ this.textObj.tabKm }}</h2>
            <table class="tabela">
                <thead>
                <tr>
                    <th>Rank</th>
                    <th>{{ this.textObj.tabelaRekIme }}</th>
                    <th>{{ this.textObj.tabelaRekPrezime }}</th>
                    <th>{{ this.textObj.tabelaRekKat }}</th>
                    <th>Km</th>
                    <th>{{ this.textObj.tabelaVreme }}</th>
                    <th>{{ this.textObj.tabelaRekTem }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(result, index) in this.topDistanca.slice(0, 10)" :key="index" :class="result.Kategorija == 'm' ? 'menColumn' : 'womenColumn'">
                    <td>{{ index + 1 }}</td>
                    <td><span v-if="index == 0">🥇</span><span v-else-if="index == 1">🥈</span><span v-else-if="index == 2">🥉</span>{{ result.Ime }}</td>
                    <td>{{ result.Prezime }}</td>
                    <td>{{ result.Kategorija == 'm' ? textObj.muskarci : textObj.zene }}</td>
                    <td>{{ result.Distanca }} km</td>
                    <td>{{ this.formatTime(result.UkupnoVremeSekunde) }}</td>
                    <td>{{ this.formatTime(result.TempoSekunde) }}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="topGodine">
            <h2>{{ this.textObj.naslovTop26 }}</h2>
            <table class="tabela">
                <thead>
                <tr>
                    <th>Rank</th>
                    <th>{{ this.textObj.tabelaRekIme }}</th>
                    <th>{{ this.textObj.tabelaRekPrezime }}</th>
                    <th>{{ this.textObj.tabelaRekKat }}</th>
                    <th>{{ this.textObj.maKolo }}</th>
                    <th>{{ this.textObj.tabelaVreme }}</th>
                    <th>{{ this.textObj.tabelaRekTem }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(result, index) in this.topTrenutnaGodina" :key="index" :class="result.Kategorija == 'm' ? 'menColumn' : 'womenColumn'">
                    <td>{{ index + 1 }}</td>
                    <td><span v-if="index == 0">🥇</span><span v-else-if="index == 1">🥈</span><span v-else-if="index == 2">🥉</span>{{ result.Ime }}</td>
                    <td>{{ result.Prezime }}</td>
                    <td>{{ result.Kategorija == 'm' ? textObj.muskarci : textObj.zene }}</td>
                    <td>{{ result.Kolo }}</td>
                    <td>{{ result.Vreme }} <span v-if="result.Distanca < 5">({{ result.Distanca }}km)</span></td>
                    <td>{{ result.Tempo }}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="topMuski">
            <h2>{{ this.textObj.naslovTopM }}</h2>
            <table class="tabela">
                <thead>
                <tr>
                    <th>Rank</th>
                    <th>{{ this.textObj.tabelaRekIme }}</th>
                    <th>{{ this.textObj.tabelaRekPrezime }}</th>
                    <th>{{ this.textObj.tabelaRekKat }}</th>
                    <th>{{ this.textObj.maKolo }}</th>
                    <th>{{ this.textObj.tabelaVreme }}</th>
                    <th>{{ this.textObj.tabelaRekTem }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(result, index) in this.topM" :key="index" :class="result.Kategorija == 'm' ? 'menColumn' : 'womenColumn'">
                    <td>{{ index + 1 }}</td>
                    <td><span v-if="index == 0">🥇</span><span v-else-if="index == 1">🥈</span><span v-else-if="index == 2">🥉</span>{{ result.Ime }}</td>
                    <td>{{ result.Prezime }}</td>
                    <td>{{ result.Kategorija == 'm' ? textObj.muskarci : textObj.zene }}</td>
                    <td>{{ result.Kolo }}</td>
                    <td>{{ result.Vreme }} <span v-if="result.Distanca < 5">({{ result.Distanca }}km)</span></td>
                    <td>{{ result.Tempo }}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="topZenski">
            <h2>{{ this.textObj.naslovTopZ }}</h2>
            <table class="tabela">
                <thead>
                <tr>
                    <th>Rank</th>
                    <th>{{ this.textObj.tabelaRekIme }}</th>
                    <th>{{ this.textObj.tabelaRekPrezime }}</th>
                    <th>{{ this.textObj.tabelaRekKat }}</th>
                    <th>{{ this.textObj.maKolo }}</th>
                    <th>{{ this.textObj.tabelaVreme }}</th>
                    <th>{{ this.textObj.tabelaRekTem }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(result, index) in this.topZ" :key="index" :class="result.Kategorija == 'm' ? 'menColumn' : 'womenColumn'">
                    <td>{{ index + 1 }}</td>
                    <td><span v-if="index == 0">🥇</span><span v-else-if="index == 1">🥈</span><span v-else-if="index == 2">🥉</span>{{ result.Ime }}</td>
                    <td>{{ result.Prezime }}</td>
                    <td>{{ result.Kategorija == 'm' ? textObj.muskarci : textObj.zene }}</td>
                    <td>{{ result.Kolo }}</td>
                    <td>{{ result.Vreme }} <span v-if="result.Distanca < 5">({{ result.Distanca }}km)</span></td>
                    <td>{{ result.Tempo }}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="topAll">
            <h2>{{ this.textObj.naslovRek2 }}</h2>
            <table class="tabela">
                <thead>
                <tr>
                    <th>Rank</th>
                    <th>{{ this.textObj.tabelaRekIme }}</th>
                    <th>{{ this.textObj.tabelaRekPrezime }}</th>
                    <th>{{ this.textObj.tabelaRekKat }}</th>
                    <th>{{ this.textObj.maKolo }}</th>
                    <th>{{ this.textObj.tabelaVreme }}</th>
                    <th>{{ this.textObj.tabelaRekTem }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(result, index) in this.topAll" :key="index" :class="result.Kategorija == 'm' ? 'menColumn' : 'womenColumn'">
                    <td>{{ index + 1 }}</td>
                    <td><span v-if="index == 0">🥇</span><span v-else-if="index == 1">🥈</span><span v-else-if="index == 2">🥉</span>{{ result.Ime }}</td>
                    <td>{{ result.Prezime }}</td>
                    <td>{{ result.Kategorija == 'm' ? textObj.muskarci : textObj.zene }}</td>
                    <td>{{ result.Kolo }}</td>
                    <td>{{ result.Vreme }} <span v-if="result.Distanca < 5">({{ result.Distanca }}km)</span></td>
                    <td>{{ result.Tempo }}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="topGodine">
            <h2>{{ this.textObj.naslovTop25God }}</h2>
            <table class="tabela">
                <thead>
                <tr>
                    <th>Rank</th>
                    <th>{{ this.textObj.tabelaRekIme }}</th>
                    <th>{{ this.textObj.tabelaRekPrezime }}</th>
                    <th>{{ this.textObj.tabelaRekKat }}</th>
                    <th>{{ this.textObj.maKolo }}</th>
                    <th>{{ this.textObj.tabelaVreme }}</th>
                    <th>{{ this.textObj.tabelaRekTem }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(result, index) in this.top2025" :key="index" :class="result.Kategorija == 'm' ? 'menColumn' : 'womenColumn'">
                    <td>{{ index + 1 }}</td>
                    <td><span v-if="index == 0">🥇</span><span v-else-if="index == 1">🥈</span><span v-else-if="index == 2">🥉</span>{{ result.Ime }}</td>
                    <td>{{ result.Prezime }}</td>
                    <td>{{ result.Kategorija == 'm' ? textObj.muskarci : textObj.zene }}</td>
                    <td>{{ result.Kolo }}</td>
                    <td>{{ result.Vreme }} <span v-if="result.Distanca < 5">({{ result.Distanca }}km)</span></td>
                    <td>{{ result.Tempo }}</td>
                </tr>
                </tbody>
            </table>
        </div>
    <div class="topGodine">
            <h2>{{ this.textObj.naslovTopGod }}</h2>
            <table class="tabela">
                <thead>
                <tr>
                    <th>Rank</th>
                    <th>{{ this.textObj.tabelaRekIme }}</th>
                    <th>{{ this.textObj.tabelaRekPrezime }}</th>
                    <th>{{ this.textObj.tabelaRekKat }}</th>
                    <th>{{ this.textObj.maKolo }}</th>
                    <th>{{ this.textObj.tabelaVreme }}</th>
                    <th>{{ this.textObj.tabelaRekTem }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(result, index) in this.top2024" :key="index" :class="result.Kategorija == 'm' ? 'menColumn' : 'womenColumn'">
                    <td>{{ index + 1 }}</td>
                    <td><span v-if="index == 0">🥇</span><span v-else-if="index == 1">🥈</span><span v-else-if="index == 2">🥉</span>{{ result.Ime }}</td>
                    <td>{{ result.Prezime }}</td>
                    <td>{{ result.Kategorija == 'm' ? textObj.muskarci : textObj.zene }}</td>
                    <td>{{ result.Kolo }}</td>
                    <td>{{ result.Vreme }} <span v-if="result.Distanca < 5">({{ result.Distanca }}km)</span></td>
                    <td>{{ result.Tempo }}</td>
                </tr>
                </tbody>
            </table>
        </div>
    <Footer />
</template>

<style>
.recordsWrapper .nav{
    position: fixed;
    background-color: #fff;
    border-bottom: 2px solid #1f3242;
    box-shadow: 0 0 10px #1f3242;
}
.recordsWrapper .nav .navLink a{
    color: #1f3242;
}
.recordsWrapper h1{
    margin-top: 2.5em;
    text-align: center;
    font-size: 4em;
}
.recordsWrapper h2{
    margin-top: 1em;
}

@media (max-width: 1024px) {
    .topDistanca, .topMuski, .topZenski, .topGodine, .topAll{
        overflow-x: auto;
    }
}
</style>