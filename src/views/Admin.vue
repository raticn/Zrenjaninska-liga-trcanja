<script>
import axios from "axios"

export default {
    data() {
        return {
            datumKola: "",
            ime: "",
            prezime: "",
            kategorija: "",
            vreme: "",
            distanca: "",
            popup: false,
            poslednjeKolo: 0,
        }
    },
    methods: {
        async addRound() {
            try {
                let fd = new FormData()
                fd.append('kolo', this.poslednjeKolo + 1)
                fd.append('datum', this.datumKola)
                let res = await axios.post('http://238p123.mars2.mars-hosting.com/API/kolo', fd)
                localStorage.setItem("kolo", this.brKola)
                this.popup = !this.popup
            } catch (error) {
                console.log(error);
            }
        },
        async addPerson() {
            let fd = new FormData()
            fd.append('ime', this.ime)
            fd.append('prezime', this.prezime)
            fd.append('kategorija', this.kategorija)
            fd.append('vreme', this.vreme)
            fd.append('distanca', '5')
            fd.append('kolo', this.poslednjeKolo + 1)
            // fd.append('sid', sid)
            let res = await axios.post('http://238p123.mars2.mars-hosting.com/API/rezultati', fd)
            this.ime = ""
            this.prezime = ""
            this.kategorija = ""
            this.vreme = ""
        },
        reload() {
            location.reload()
        }
    },
    async mounted() {
        let res = await axios.get('http://238p123.mars2.mars-hosting.com/API/kolo')
        this.poslednjeKolo = Number(res.data.odgovor[0].poslednje_kolo)
    }
}
</script>

<template>
    <div class="adminWrapper">
        <p>Pozdrav, Nemanja</p>
        <p>Poslednje kolo: {{ poslednjeKolo }}</p>
        <p>Novo kolo: {{ poslednjeKolo + 1 }}</p>
        <input type="text" v-model="datumKola" placeholder="Datum kola">
        <button @click="addRound">Dodaj kolo</button>
        <br>
        <br>
        <div class="addPerson" v-if="this.popup">
            <input type="text" v-model="ime" placeholder="ime">
            <input type="text" v-model="prezime" placeholder="prezime">
            <input type="text" v-model="kategorija" placeholder="kategorija">
            <input type="text" v-model="vreme" placeholder="vreme">
            <button @click="addPerson">dodaj trkaca</button>
        </div>
        <br>
        <br>
        <button @click="reload">Zavrsi</button>
    </div>
</template>