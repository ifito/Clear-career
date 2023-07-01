import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../data/auth.js';
import { createSubmitHandler } from '../util.js';

//TOTO replace with actual VIEW !
const loginTemplate = (onLogin) => html`
<section id="login">
<div class="form">
  <h2>Login</h2>
  <form @submit=${onLogin} class="login-form">
    <input type="text" name="email" id="email" placeholder="email" />
    <input type="password"  name="password"  id="password"  placeholder="password" />
    <button type="submit">login</button>
    <p class="message">
      Not registered? <a href="/register">Create an account</a>
    </p>
  </form>
</div>
</section>
`;

export function loginPage(ctx) {
    ctx.render(loginTemplate(createSubmitHandler(onLogin)));
    //TODO change user object based on requirements //ако има nickname за логин да се добави...
    async function onLogin({email, password}, form) {
        if (email == '' || password == '') {
            return alert('All fields are required!');
        }
        await login(email, password);
        form.reset();
        //TODO USE redirect requirements from requirement //ако редиректва към друга страница смени '/'
        ctx.page.redirect('/catalog');
    }
}