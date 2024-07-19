import { createOptimizedPicture } from '../../scripts/aem.js';
import {html, render} from 'https://esm.run/lit-html@1';

export default function decorate(block) {
  const context = {
    rows: []
  };
  [...block.children].forEach((row) => {
    var    pictureElement = null;
    var    bodyElement = null;
    [...row.children].forEach((col) => {
      if(col.querySelector('picture')){
        pictureElement = col.querySelector('picture');

      }else{
        bodyElement = col;
      }

    });
    context.rows.push({
      picture: pictureElement,
      body: bodyElement
    });
  });

  const cardTemplate = (block) => html`
            <li>
                <div class="cards-card-image">
                    ${block.picture}
                </div>
                <div class="cards-card-body">
                    ${block.body}
                </div>
            </li>
        `;
  const template = html`
            <div class="cards-wrapper">
                <div class="cards block" data-block-name="blocks" data-block-status="loaded">
                    <ul>
                        ${context.rows.map(block => cardTemplate(block))}
                    </ul>
                </div>
            </div>
        `;

  render(template, block);

  block.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));

}
