import { createRouter, createWebHistory } from "vue-router";

import HomeComponent from "../public/pages/home.component.vue";
import AboutComponent from "../public/pages/about.component.vue";
import CategoryManagementComponent from "../publishing/pages/category-management.component.vue";
import ProfilePage from "../portfolio/pages/profile-page.component.vue";
import Portfolio from '../portfolio/pages/portfolio.component.vue'

import LoginPage from "../users/pages/login-page.vue";
import RegisterPage from "../users/pages/register-page.vue";
import DesignerPaymentsPage from "../payments/pages/designer-payments.page.vue"
import ClientPaymentsPage from "../payments/pages/client-payments.page.vue"
import FindDesignerPage from "../find-designer/pages/categories.page.vue"
import CategoryResultPage from "../find-designer/pages/category-results.page.vue"
import DesignerDetailPage from "../find-designer/pages/designer-detail.page.vue"
import IntroView from "../public/pages/intro-view.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: IntroView },
        { path: '/home',     name: 'home',     component: HomeComponent,     meta: { title: 'Home' } },
        { path: '/about',    name: 'about',    component: AboutComponent,    meta: { title: 'About us' } },
        { path: '/profile',  name: 'profile',  component: ProfilePage,       meta: { title: 'Profile' } },
        { path: '/portfolio', name: 'Portfolio', component: Portfolio },
        { path: '/', redirect: '/home' },
        { path: '/login', name: 'Auth', component: () => import('../users/pages/AuthView.vue'), meta: { title: 'Auth' } },
        {
            path: '/payments',
            name: 'designer-payments',
            component: DesignerPaymentsPage,
            meta: { title: 'Payments' }
        },
        {
            path: '/client/payments',
            name: 'client-payments',
            component: ClientPaymentsPage 
        },
        {
            path: '/find-designer',
            name: 'find-designer-categories',
            component: FindDesignerPage,
            meta: { title: 'Find Designer' }
        },
        {
            path: '/find-designer/:category',
            name: 'designer-category-results',
            component: CategoryResultPage,
            meta: { title: 'Designers' }
        },
        {
            path: '/find-designer/:category/:id',
            name: 'designer-detail',
            component: DesignerDetailPage 
        },
        { path: '/register', name: 'Register', component: RegisterPage },
        { path: '/login', name: 'Auth', component: () => import('../users/pages/AuthView.vue'), meta: { title: 'Auth' } },

    ]
});

router.beforeEach((to, from, next) => {
    const baseTitle = 'CreateLink';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
});

export default router;
