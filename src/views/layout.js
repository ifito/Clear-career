import { html } from '../../node_modules/lit-html/lit-html.js';

//todo Replace with actual layout
export const layoutTemplate = (userData, content) => html`
<header>
<a id="logo" href="/"><img id="logo-img" src="./images/logo.jpg" alt=""/></a>
<nav>
  <div>
    <a href="/catalog">Dashboard</a>
  </div>
  <!-- Logged-in users -->
  ${userData ? html`
  <div class="user">
    <a href="/create">Create Offer</a>
    <a href="/logout">Logout</a>
  </div>` : html`
  <div class="guest">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
  </div>`}
  <!-- Guest users -->
</nav>
</header>

<main>${content}</main>
`;