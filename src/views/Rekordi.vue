<script>
import axios from "axios"

export default {
    data() {
        return {
            rekordi: [],
            topM: [],
            topZ: [],
            topAll: [],
        }
    },
    async mounted() {
        let res = await axios.get('http://238p123.mars2.mars-hosting.com/API/rekordi')
        this.topM = res.data.Top10Muski
        this.topZ = res.data.Top10Zene
        this.topAll = res.data.Top10Svi
    },
}
</script>

<template>
    <div class="recordsWrapper">
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
                    <td>{{ result.Prezimeime }}</td>
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
                    <td>{{ result.Prezimeime }}</td>
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
                    <td>{{ result.Prezimeime }}</td>
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