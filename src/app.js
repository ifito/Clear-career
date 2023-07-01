// import * as api from './data/auth.js'; //-> ЗА ТЕСТВАНЕ В КОНЗОЛАТА на ауторизацията!!!!
 //import * as api from './data/offers.js'; // ЗА ТЕСТВАНЕ В КОНЗОЛАТА на заявките!!!!
 //window.api = api; 

import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import { getUserData } from './util.js';
import { layoutTemplate } from './views/layout.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { logout } from './data/auth.js';
import { catalogPage } from './views/catalog.js';
import { detailsPage } from './views/details.js';
import { createPage } from './views/create.js';
import { editPage } from './views/edit.js';


//TODO change render root depending on project HTML structure // пътя към контент блока
const mainContent = document.getElementById('wrapper');
page(decorationContext);
page('index.html', '/');
page('/', homePage);
page('/catalog', catalogPage);
page('/catalog/:id', detailsPage);
page('/catalog/:id/edit', editPage);
page('/create/', createPage);
page('/login', loginPage);
page('/register', registerPage);
page('/logout', logoutAction);

page.start();

function decorationContext(ctx, next) {
    ctx.render = renderView;
    next();
}

//TODO Inject Dependency
function renderView(content){
    const userData = getUserData();
    render(layoutTemplate(userData, content), mainContent)
}

function logoutAction(ctx) {
    logout();
    ctx.page.redirect('/');
}