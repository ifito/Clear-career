import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteOneOffer, getOneById } from '../data/offers.js';
import { getUserData } from '../util.js';
import { apply, getApplications, getUserApplication } from '../data/bonus.js';
//TODO 
const detailsTemplate = (offer, onDelete, onApply) => html`
<section id="details">
<div id="details-wrapper">
  <img id="details-img" src=${offer.imageUrl} alt="example1" />
  <p id="details-title">${offer.title}</p>
  <p id="details-category">
    Category: <span id="categories">${offer.category}</span>
  </p>
  <p id="details-salary">
    Salary: <span id="salary-number">${offer.salary}</span>
  </p>
  <div id="info-wrapper">
    <div id="details-description">
      <h4>Description</h4>
      <span>${offer.description}</span
      >
    </div>
    <div id="details-requirements">
      <h4>Requirements</h4>
      <span>${offer.requirements}</span
      >
    </div>
  </div>
   <p>Applications: <strong id="applications">${offer.applications}</strong></p>

  ${offer.canEdit || offer.canApply ? html`
  <div id="action-buttons">
  ${offer.canEdit ? html`
  <a href="/catalog/${offer._id}/edit" id="edit-btn">Edit</a>
  <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>` : null}
  ${offer.canApply ? html`<a @click=${onApply} href="javascript:void(0)" id="apply-btn">Apply</a>` : null}
  </div>` : null}
</div>
</section>
`;

export async function detailsPage(ctx) {
  const id = ctx.params.id;
  //const offer = await getOneById(id);
  const userData = getUserData();  
  //ауторизациите без бонус логиката => guest, owner, user
  // if (userData && userData._id == offer._ownerId) {
  //   offer.canEdit = true;
  // }

  //с бонус и apply butonn-a => guest, owner, user -> user - applicant и user - non-applicant
  const requests = [
    getOneById(id), 
    getApplications(id),
  ]
  if (userData){
    requests.push(getUserApplication(id, userData._id));
  }
  const [offer, applications, hasApplied] = await Promise.all(requests);
  offer.applications = applications;
  if(userData){
    offer.canEdit = userData._id == offer._ownerId;
    offer.canApply = offer.canEdit == false && hasApplied == 0;
  }

  ctx.render(detailsTemplate(offer, onDelete, onApply));

  async function onDelete() {
    const choise = confirm('Are you sure?');

    if (choise) {
      await deleteOneOffer(id);
      ctx.page.redirect('/catalog');
    }
  }

  async function onApply(){
    await apply(id);
    ctx.page.redirect('/catalog/' + id);
  }
}