<script>
import axios from "axios"
import Nav from '../components/Nav.vue'


export default {
    data() {
        return {
            rekordi: [],
            topM: [],
            topZ: [],
            topAll: [],
            topGodina: [],
            topDistanca: [],
        }
    },
    components: {
        Nav,
    },
    methods: {
        parseTempo(tempo) {
            const parts = tempo.split(':').map(Number);
            return parts[0] * 3600 + parts[1] * 60 + parts[2];
        },
    },
    async mounted() {
        let res = await axios.get('http://238p123.mars2.mars-hosting.com/API/rekordi')
        this.topM = res.data.Top10Muski
        this.topZ = res.data.Top10Zene
        this.topAll = res.data.Top10Svi
        this.topGodina = res.data.Top10OvaGodina
        this.topDistanca = res.data.Top10Distanca
        this.topDistanca.sort((a, b) => {
            if (a.Distanca !== b.Distanca) {
                return b.Distanca - a.Distanca; 
            } else {
                const tempoA = this.parseTempo(a.Tempo);
                const tempoB = this.parseTempo(b.Tempo);
                return tempoA - tempoB; 
            }
        });
    },
}
</script>

<template>
    <div class="recordsWrapper">
        <Nav />
        <div class="topDistanca">
            <h2>distance</h2>
            <table class="tabela">
                <thead>
                <tr>
                    <th>Rank</th>
                    <th>Ime</th>
                    <th>Prezime</th>
                    <th>Kategorija</th>
                    <th>Distanca</th>
                    <th>Vreme</th>
                    <th>Tempo</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(result, index) in this.topDistanca" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td><span v-if="index == 0">🥇</span><span v-if="index == 1">🥈</span><span v-if="index == 2">🥉</span>{{ result.Ime }}</td>
                    <td>{{ result.Prezime }}</td>
                    <td>{{ result.Kategorija }}</td>
                    <td>{{ result.Distanca }} km</td>
                    <td>{{ result.UkupnoVreme }}</td>
                    <td>{{ result.Tempo }}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="topAll">
            <h2>Top 10 rekorda svih vremena</h2>
            <table class="tabela">
                <thead>
                <tr>
                    <th>Rank</th>
                    <th>Ime</th>
                    <th>Prezime</th>
                    <th>Kategorija</th>
                    <th>Kolo</th>
                    <th>Vreme</th>
                    <th>Tempo</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(result, index) in this.topAll" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td><span v-if="index == 0">🥇</span><span v-if="index == 1">🥈</span><span v-if="index == 2">🥉</span>{{ result.Ime }}</td>
                    <td>{{ result.Prezime }}</td>
                    <td>{{ result.Kategorija }}</td>
                    <td>{{ result.Kolo }}</td>
                    <td>{{ result.Vreme }}</td>
                    <td>{{ result.Tempo }}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="topMuski">
            <h2>Top 10 rekorda svih vremena - Muški</h2>
            <table class="tabela">
                <thead>
                <tr>
                    <th>Rank</th>
                    <th>Ime</th>
                    <th>Prezime</th>
                    <th>Kategorija</th>
                    <th>Kolo</th>
                    <th>Vreme</th>
                    <th>Tempo</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(result, index) in this.topM" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td><span v-if="index == 0">🥇</span><span v-if="index == 1">🥈</span><span v-if="index == 2">🥉</span>{{ result.Ime }}</td>
                    <td>{{ result.Prezime }}</td>
                    <td>{{ result.Kategorija }}</td>
                    <td>{{ result.Kolo }}</td>
                    <td>{{ result.Vreme }}</td>
                    <td>{{ result.Tempo }}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="topZenski">
            <h2>Top 10 rekorda svih vremena - Ženski</h2>
            <table class="tabela">
                <thead>
                <tr>
                    <th>Rank</th>
                    <th>Ime</th>
                    <th>Prezime</th>
                    <th>Kategorija</th>
                    <th>Kolo</th>
                    <th>Vreme</th>
                    <th>Tempo</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(result, index) in this.topZ" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td><span v-if="index == 0">🥇</span><span v-if="index == 1">🥈</span><span v-if="index == 2">🥉</span>{{ result.Ime }}</td>
                    <td>{{ result.Prezime }}</td>
                    <td>{{ result.Kategorija }}</td>
                    <td>{{ result.Kolo }}</td>
                    <td>{{ result.Vreme }}</td>
                    <td>{{ result.Tempo }}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="topGodine">
            <h2>Top 10 rekorda 2024. godine</h2>
            <table class="tabela">
                <thead>
                <tr>
                    <th>Rank</th>
                    <th>Ime</th>
                    <th>Prezime</th>
                    <th>Kategorija</th>
                    <th>Kolo</th>
                    <th>Vreme</th>
                    <th>Tempo</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(result, index) in this.topGodina" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td><span v-if="index == 0">🥇</span><span v-if="index == 1">🥈</span><span v-if="index == 2">🥉</span>{{ result.Ime }}</td>
                    <td>{{ result.Prezime }}</td>
                    <td>{{ result.Kategorija }}</td>
                    <td>{{ result.Kolo }}</td>
                    <td>{{ result.Vreme }}</td>
                    <td>{{ result.Tempo }}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>