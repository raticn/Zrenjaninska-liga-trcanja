<script>
import axios from "axios"
import { RouterLink, RouterView } from 'vue-router';
import { mapActions, mapState } from 'pinia'
import { useLigaStore } from '../store/ligaStore'

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
        };
    },
    methods: {
        async addRound() {
            try {
                let fd = new FormData();
                fd.append('kolo', this.poslednjeKolo + 1);
                fd.append('datum', this.datumKola);
                let res = await axios.post('https://238p123.mars2.mars-hosting.com/API/kolo', fd);
                localStorage.setItem("kolo", this.brKola);
                this.popup = !this.popup;
            }
            catch (error) {
                console.log(error);
            }
        },
        async addPerson() {
            let ime = this.ime;
            let prezime = this.prezime;
            let distancaKola = this.distancaKola;
            let vremeKola = this.vreme;
            let kategorija = this.kategorija;
            let fd = new FormData();
            fd.append('ime', ime);
            fd.append('prezime', prezime);
            fd.append('kategorija', kategorija);
            fd.append('vreme', this.vreme);
            fd.append('distancaKola', distancaKola);
            fd.append('kolo', this.poslednjeKolo + 1);
            // fd.append('sid', sid)
            let res = await axios.post('https://238p123.mars2.mars-hosting.com/API/rezultati', fd);
            console.log(this.ime, this.prezime, this.kategorija, this.vreme, this.distancaKola, 'post',res);
            let trkaciGet = await axios.get('https://238p123.mars2.mars-hosting.com/API/trkaci');
            for (let i = 0; i < trkaciGet.data.SpisakTrkaca.length; i++) {
                if (ime.trim() == trkaciGet.data.SpisakTrkaca[i].Ime && prezime.trim() == trkaciGet.data.SpisakTrkaca[i].Prezime) {
                    this.trkaId = trkaciGet.data.SpisakTrkaca[i].Id;
                    this.index = i;
                }
            }
            if (this.trkaId) {
                let id = this.trkaId;
                let i = this.index;
                let ukupnaDistanca = trkaciGet.data.SpisakTrkaca[i].UkupnaDistanca;
                let ukupnoVreme = trkaciGet.data.SpisakTrkaca[i].UkupnoVreme;
                let distancaKola = this.distancaKola;
                let vremeKola = this.vreme;
                let trkaciPut = await axios.put('https://238p123.mars2.mars-hosting.com/API/trkaci', { id, ukupnaDistanca, distancaKola, ukupnoVreme, vremeKola, ukupnoVreme });
            }
            else {
                let trkaciPost = await axios.post('https://238p123.mars2.mars-hosting.com/API/trkaci', { ime, prezime, distancaKola, vremeKola, kategorija });
            }
            this.ime = "";
            this.prezime = "";
            this.kategorija = "";
            this.vreme = "";
            this.distancaKola = "";
        },
        async addNewDate() {
            let fd = new FormData();
            fd.append('datum', this.noviDatum);
            fd.append('kolo', this.sledeceKolo + 1);
            let res = await axios.post('https://238p123.mars2.mars-hosting.com/API/dodavanjeSledKolo', fd);
            this.noviDatum = "";
        },
        reload() {
            location.reload();
        },
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2)
                return parts.pop().split(';').shift();
        },
        posaljiSr() {
            let fd = new FormData();
            fd.append('textLang', 'sr');
            fd.append('textSr', this.sr);
            fd.append('textId', this.id);
            let res = axios.post('https://238p123.mars2.mars-hosting.com/API/dodajText', fd);
            this.sr = "";
        },
        posaljiEn() {
            let fd = new FormData();
            fd.append('textLang', 'en');
            fd.append('textEn', this.en);
            fd.append('textId', this.id);
            let res = axios.post('https://238p123.mars2.mars-hosting.com/API/dodajText', fd);
            this.en = "";
            this.id = "";
        }
    },
    computed: {
        ...mapState(useLigaStore, ['isAdmin']),
    },
    async mounted() {
        let sid = this.getCookie("sid")
        console.log(sid, this.isAdmin);
        if(this.isAdmin != 1 || sid.value != undefined) {
            this.$router.push('/')
        }
        else{
            let res = await axios.get('https://238p123.mars2.mars-hosting.com/API/kolo');
            this.poslednjeKolo = Number(res.data.odgovor[0].poslednje_kolo);
            this.poslednjiDatum = res.data.odgovor[0].Datum;
            let novoK = await axios.get('https://238p123.mars2.mars-hosting.com/API/dodavanjeSledKolo');
            this.sledeceKolo = novoK.data.odgovor[0].novoKolo;
            let trkaciGet = await axios.get('https://238p123.mars2.mars-hosting.com/API/trkaci');
        }
    },
}
</script>

<template>
    <div class="adminWrapper">
        <RouterLink to="/"><img src="../assets/zltLogo.svg" alt="Zrenjaninska liga trcanja logo slika"></RouterLink>
        <p class="adminHeading">Pozdrav, Nemanja!</p>
        <p class="poslKolo">Poslednje kolo: {{ poslednjeKolo }}.  ({{ poslednjiDatum }})</p>
        <p class="novKolo">Novo kolo: {{ poslednjeKolo + 1 }}.</p>
        <input type="text" v-model="datumKola" placeholder="Datum kola (0000:00:00)">
        <button class="adminBtn" @click="addRound">Dodaj kolo</button>
        <br>
        <br>
        <div class="addPerson" v-if="this.popup">
            <input type="text" v-model="ime" placeholder="Ime (koristi š,č...)">
            <input type="text" v-model="prezime" placeholder="Prezime (koristi š,č...)">
            <input type="text" v-model="kategorija" placeholder="Kategorija (m ili z)">
            <input type="text" v-model="vreme" placeholder="Vreme - format 00:00:00 (sati:minuti:sekunde)">
            <input type="text" v-model="distancaKola" placeholder="Kilometri (samo broj)">
            <button class="adminBtn" @click="addPerson">Dodaj trkača</button>
        </div>
        <br>
        <br>
        <p>Format godina:mesec:dan (0000:00:00 - primer 2024:01:02)</p>
        <input type="text" v-model="noviDatum" placeholder="Datum za novo kolo (najava)">
        <button class="adminBtn" @click="addNewDate">Dodaj datum za {{ sledeceKolo + 1}}. kolo</button>
        <br>
        <br>
        <button class="adminBtn" @click="reload">Zavrsi</button>
        <br>
        <br>
        <!-- <input class="tekst" type="text" v-model="id" placeholder="id">
        <br>
        <br>
        <textarea name="" id=""  v-model="sr" cols="150" rows="10" placeholder="srpski"></textarea>
        <button @click="posaljiSr" class="textBtn">SR</button>
        <br>
        <br>
        <textarea name="" id="" v-model="en" cols="150" rows="10" placeholder="engleski"></textarea>
        <button @click="posaljiEn" class="textBtn">EN</button> -->
    </div>
</template>

<style>
.adminHeading{
    font-size: 3em;
    font-weight: 900;
    color: #1f3242;
    text-align: center;
}
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
.poslKolo {
    font-size: 1.3em;
}
.novKolo {
    font-size: 2em;
    font-weight: 700;
}
.adminWrapper input{
    border: 2px solid #1f3242;
    border-radius: 20px;
    width: 30%;
    margin-bottom: 1em;
    height: 50px;
    font-weight: 700;
    font-size: 1.3em;
}
.adminWrapper input:focus{
    outline: 2px solid #1f3242;
    box-shadow: none;
}
.adminWrapper img{
    width: 5em;
    margin: 1em auto 0;
    display: flex;
}
.addPerson{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.adminBtn{
    border: 2px solid #1f3242;
    width: 20%;
    background-color: #fff;
    color: #1f3242;
    font-weight: 900;
    font-size: 1.5em;
    padding: 10px 0;
    border-radius: 20px;
    cursor: pointer;
}
.adminBtn:hover{
    background-color: #1f3242;
    color: #fff;
}

@media (max-width: 600px) {
    .adminHeading{
        font-size: 2.5em;
    }
    .adminBtn{
        width: 50%;
    }
    .adminWrapper input{
        width: 80%;
    }
}
</style>