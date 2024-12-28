import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Liga from '../views/Liga.vue'
import Admin from '../views/Admin.vue'
import AdminLogin from '../views/AdminLogin.vue'
import Rekordi from '../views/Rekordi.vue'
import Onama from '../views/Onama.vue'
import Kontakt from '../views/Kontakt.vue'
import PolitikaPrivatnosti from '../views/PolitikaPrivatnosti.vue'


// function isAuthenticated() {
//   const sid = localStorage.getItem('sid'); 
//   const isAdmin = JSON.parse(localStorage.getItem('isAdmin')); 

//   if (!sid || !isAdmin) {
//     return false; 
//   }

//   return true; 
// }

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: "Zrenjaninska Liga Trčanja: Sve što Treba da Znate",
        description: "Upoznajte ideju i ciljeve Zrenjaninske Lige Trčanja. Okupljamo se svake nedelje za zajedničko trčanje, zabavu i druženje. Pridružite nam se!"
      }
    },
    {
      path: '/liga',
      name: 'liga',
      component: Liga,
      meta: {
        title: "Zrenjaninska Liga Trčanja - Rezultati Prethodnih Kola",
        description: "Saznajte više o Zrenjaninskoj Trkačkoj Ligi. Pridružite nam se, trčite 5km, podstičite se međusobno i postanite deo zajednice ljubitelja trčanja!"
      }
      
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      // meta: {
      //   requiresAuth: true
      // }
    },
    {
      path: '/adminLogin',
      name: 'adminLogin',
      component: AdminLogin
    },
    {
      path: '/rekordi',
      name: 'rekordi',
      component: Rekordi,
      meta: {
        title: "Tabele Rekorda Zrenjaninske Lige Trčanja",
        description: "Pogledajte najbrže rezultate u Zrenjaninskoj Trkačkoj Ligi. Postavite svoje rekorde i budite deo trkačke zajednice koja teži ka vrhunskim dostignućima."
      }
    },
    {
      path: '/onama',
      name: 'onama',
      component: Onama,
      meta: {
        title: "O Nama - Ideje i Ciljevi Zrenjaninske Lige Trčanja",
        description: "Upoznajte ideje i ciljeve Zrenjaninske Trkačke Lige. Zajedno gradimo održivu zajednicu ljubitelja trčanja. Saznajte više o našim vrednostima i misiji."
      }
    },
    {
      path: '/kontakt',
      name: 'kontakt',
      component: Kontakt,
      meta: {
        title: "Kontaktirajte Nas - Zrenjaninska Trkačka Liga",
        description: "Imate pitanja ili sugestije? Kontaktirajte nas putem naših stranica ili mejla. Radujemo se vašem feedbacku i podršci."
      }
    },
    {
      path: '/politikaPrivatnosti',
      name: 'politikaPrivatnosti',
      component: PolitikaPrivatnosti,
      meta: {
        title: "Politika Privatnosti - Zrenjaninska Trkačka Liga",
        description: "Pročitajte našu Politiku Privatnosti. Vaša privatnost nam je važna. Saznajte kako čuvamo i koristimo vaše podatke prilikom korišćenja našeg sajta"
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Zrenjaninska Liga Trčanja';
  
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', to.meta.description || 'Default Description');
  } else {
    const newMetaDesc = document.createElement('meta');
    newMetaDesc.name = "description";
    newMetaDesc.content = to.meta.description || 'Default Description';
    document.getElementsByTagName('head')[0].appendChild(newMetaDesc);
  }

  const canonicalLink = document.querySelector('link[rel="canonical"]');
  if (canonicalLink) {
    canonicalLink.setAttribute('href', getCanonicalUrl(to));
  } else {
    const newCanonicalLink = document.createElement('link');
    newCanonicalLink.rel = "canonical";
    newCanonicalLink.href = getCanonicalUrl(to);
    document.getElementsByTagName('head')[0].appendChild(newCanonicalLink);
  }
  // if (to.meta.requiresAuth && !isAuthenticated()) {
    // Ako ruta zahteva autentifikaciju, a korisnik nije autentifikovan, preusmeri na login stranicu
    // next({ path: '/adminLogin', query: { redirect: to.fullPath } });
  // } else {
    // Ako je sve u redu, dozvoli navigaciju
    next();
  // }
});

function getCanonicalUrl(route) {
  return window.location.origin + route.fullPath;
}
export default router
