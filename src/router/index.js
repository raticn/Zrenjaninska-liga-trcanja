import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Liga from '../views/Liga.vue'
import Admin from '../views/Admin.vue'
import AdminLogin from '../views/AdminLogin.vue'
import Rekordi from '../views/Rekordi.vue'
import Onama from '../views/Onama.vue'
import Kontakt from '../views/Kontakt.vue'
import PolitikaPrivatnosti from '../views/PolitikaPrivatnosti.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: "Zrenjaninska Liga Trčanja",
        description: "Upoznajte ideju i ciljeve Zrenjaninske Lige Trčanja. Okupljamo se svake nedelje za zajedničko trčanje, zabavu i druženje. Pridružite nam se!"
      }
    },
    {
      path: '/liga',
      name: 'liga',
      component: Liga,
      meta: {
        title: "Zrenjaninska Liga Trčanja - Rezultati Prethodnih Kola",
        description: "Saznajte više o Zrenjaninskoj Trkačkoj Ligi. Pridružite se svakog leta i zime, trčite 5km, podstičite se međusobno i postanite deo zajednice ljubitelja trčanja"
      }
      
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
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
        title: "Rekordi Zrenjaninske Lige Trčanja",
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

  next();
});

export default router
