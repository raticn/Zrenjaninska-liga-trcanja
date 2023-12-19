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
            distancaKola: "",
            popup: false,
            poslednjeKolo: 0,
            poslednjiDatum: "",
            noviDatum: "",
            trkaId: 0,
            index: 0,
            trkaciGet: [],
            sledeceKolo: "",
            id: 0,
            sr: "",
            en: "",
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
            let ime = this.ime
            let prezime = this.prezime
            let distancaKola = this.distancaKola
            let vremeKola = this.vreme
            let kategorija = this.kategorija
            let fd = new FormData()
            fd.append('ime', ime)
            fd.append('prezime', prezime)
            fd.append('kategorija', kategorija)
            fd.append('vreme', this.vreme)
            fd.append('distancaKola', distancaKola)
            fd.append('kolo', this.poslednjeKolo + 1)
            // fd.append('sid', sid)
            let res = await axios.post('http://238p123.mars2.mars-hosting.com/API/rezultati', fd)
            let trkaciGet = await axios.get('http://238p123.mars2.mars-hosting.com/API/trkaci')
            for(let i = 0; i < trkaciGet.data.SpisakTrkaca.length; i++) {
                // console.log("ime", this.ime, 'prezime', this.prezime);
                // console.log('uslov', trkaciGet.data.SpisakTrkaca[i].Ime == this.ime);
                // console.log('imeGet', trkaciGet.data.SpisakTrkaca[i].Ime);
                if( ime.trim() == trkaciGet.data.SpisakTrkaca[i].Ime && prezime.trim() == trkaciGet.data.SpisakTrkaca[i].Prezime) {
                    this.trkaId = trkaciGet.data.SpisakTrkaca[i].Id
                    this.index = i
                }
            } 
            if(this.trkaId) {
                let id = this.trkaId
                let i = this.index
                let ukupnaDistanca = trkaciGet.data.SpisakTrkaca[i].UkupnaDistanca
                let ukupnoVreme = trkaciGet.data.SpisakTrkaca[i].UkupnoVreme
                let distancaKola = this.distancaKola
                let vremeKola = this.vreme
                let trkaciPut = await axios.put('http://238p123.mars2.mars-hosting.com/API/trkaci', {id, ukupnaDistanca, distancaKola, ukupnoVreme, vremeKola, ukupnoVreme})
                console.log(ime,'ime u if');
            }
            else{
                let trkaciPost = await axios.post('http://238p123.mars2.mars-hosting.com/API/trkaci', {ime, prezime, distancaKola, vremeKola, kategorija})
                console.log(ime,'ime u else');
            }
            this.ime = ""
            this.prezime = ""
            this.kategorija = ""
            this.vreme = ""
            this.distancaKola = ""
        },
        async addNewDate() {
            let fd = new FormData()
            fd.append('datum', this.noviDatum)
            fd.append('kolo', this.sledeceKolo + 1)
            let res = await axios.post('http://238p123.mars2.mars-hosting.com/API/dodavanjeSledKolo', fd)
            this.noviDatum = ""
        },
        reload() {
            location.reload()
        },
        getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        },
        posaljiSr() {
            let fd = new FormData()
            fd.append('textLang', 'sr')
            fd.append('textSr', this.sr)
            fd.append('textId', this.id)
            let res = axios.post('http://238p123.mars2.mars-hosting.com/API/dodajText', fd)
            this.sr = ""
        },
        posaljiEn() {
            let fd = new FormData()
            fd.append('textLang', 'en')
            fd.append('textEn', this.en)
            fd.append('textId', this.id)
            let res = axios.post('http://238p123.mars2.mars-hosting.com/API/dodajText', fd)
            this.en = ""
            this.id = ""
        }
    },
    async mounted() {
        let sid = this.getCookie("sid")
        if(!sid){
            this.$router.push('/')
            console.log('nema sid');
        }
        else{
            let res = await axios.get('http://238p123.mars2.mars-hosting.com/API/kolo')
            this.poslednjeKolo = Number(res.data.odgovor[0].poslednje_kolo)
            this.poslednjiDatum = res.data.odgovor[0].Datum
            let novoK = await axios.get('http://238p123.mars2.mars-hosting.com/API/dodavanjeSledKolo')
            this.sledeceKolo = novoK.data.odgovor[0].novoKolo
            console.log(novoK);
            let trkaciGet = await axios.get('http://238p123.mars2.mars-hosting.com/API/trkaci')
            console.log('trkaci',trkaciGet);
        }
    }
}
</script>

<template>
    <div class="adminWrapper">
        <p>Pozdrav, Nemanja</p>
        <p>Poslednje kolo: {{ poslednjeKolo }}  ({{ poslednjiDatum }})</p>
        <p>Novo kolo: {{ poslednjeKolo + 1 }}</p>
        <input type="text" v-model="datumKola" placeholder="Datum kola">
        <button @click="addRound">Dodaj kolo</button>
        <br>
        <br>
        <div class="addPerson" v-if="this.popup">
            <input type="text" v-model="ime" placeholder="ime">
            <input type="text" v-model="prezime" placeholder="prezime">
            <input type="text" v-model="kategorija" placeholder="kategorija">
            <input type="text" v-model="vreme" placeholder="vreme - format 00:00:00 (sati:minuti:sekunde)">
            <input type="text" v-model="distancaKola" placeholder="distanca kola">
            <button @click="addPerson">dodaj trkaca</button>
        </div>
        <br>
        <br>
        <input type="text" v-model="noviDatum" placeholder="Datum za novo kolo (najava)">
        <button @click="addNewDate">Dodaj datum za {{ sledeceKolo + 1}}. kolo</button>
        <br>
        <br>
        <button @click="reload">Zavrsi</button>
        <br>
        <br>
        <input class="tekst" type="text" v-model="id" placeholder="id">
        <br>
        <br>
        <textarea name="" id=""  v-model="sr" cols="150" rows="10" placeholder="srpski"></textarea>
        <button @click="posaljiSr" class="textBtn">SR</button>
        <br>
        <br>
        <textarea name="" id="" v-model="en" cols="150" rows="10" placeholder="engleski"></textarea>
        <button @click="posaljiEn" class="textBtn">EN</button>
    </div>
</template>

<style>
textarea{
    font-size: 1.2em;
    margin-top: 5em;
}
.tekst{
    height: 50px;
    font-size: 1.4em;
}
.textBtn{
    width: 10em;
    height: 10em;
}
</style>