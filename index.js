let $ = (el) => document.querySelector(el);
let $$ = (el) => Array.from(document.querySelectorAll(el));
const $on = (el, ev, fn) => {
  Array.isArray(el)
    ? el.forEach((o) => $on(o, ev, fn))
    : el.addEventListener(ev, fn);
  return el;
};

let addCssClass = () => {
  let style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = `
                    .ordList {  list-style-type: lower-roman;transform:translateX(100%); float:left; direction:rtl; position:absolute; right:0; top:0; width:15%; height:100%; background-color:seagreen; transition: 0.1s ease-in-out; padding-top:150px;}
                    .ordList li {width: 200px;height: 50px;cursor: pointer;color: white;text-align: left;padding-left: 20px;font-size: 20px;position: relative;}
                    .ordList li:hover {color: black;}
                    .cssClass {transform: translateX(0%);}
                    h1 div {color:grey; font-size:17px; margin-bottom:50px;}
                    html {width:1000px; margin-left:auto;margin-right:auto; margin-top:100px;  scroll-behavior: smooth;font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;}
                    .html-small {width:800px;margin-right:auto; margin-top:100px;}
                    .show-element {color: orange;font-size: 35px; transition: 0.4s ease-in-out;position:sticky; top:0;}
                    .menu-button {opacity:0.6;display:inline-block; width:80px; border:2px solid black; border-radius:5px; cursor:pointer;text-align:center; position:absolute; top:80px; right:150px}
                    .menu-button-close {text-align:right;z-index: 1;opacity: 1;background-color: seagreen;border: hidden;height: 40px;width: 60px;position: absolute;top: 5%; right: 1%;font-size: 16px;color: white;padding-left: 10px;}
                    `;

  document.getElementsByTagName('head')[0].appendChild(style);
};

let addDate = () => {
  let months = [
    'JANUAR',
    'FEBRUAR',
    'MARZ',
    'APRIL',
    'MAY',
    'JUNI',
    'JULI',
    'AUGUST',
    'SEPTEMBER',
    'OKTOBER',
    'NOVEMBER',
    'DEZEMBER',
  ];
  let current = new Date();
  let day = current.getDate();
  let month = months[current.getMonth()];
  let year = current.getFullYear();
  let fullDate = `${day} ${month} ${year}`;
  return fullDate;
};

let addFullDate = () => {
  let newDate = document.createElement('div');
  $('h1').appendChild(newDate);
  $('h1 div').innerHTML = addDate();
};

let addMenuButton = () => {
  let button = document.createElement('div');
  $('html').appendChild(button);
  button.innerHTML = 'MENU';
  button.classList.add('menu-button');
};

let menuListe = () => {
  let headings = $$('h2');
  let oList = headings.map((el) => `<li>${el.innerHTML}</li>`);
  let aside = document.createElement('aside');
  $('html').appendChild(aside);
  let orderdList = document.createElement('ol');
  aside.appendChild(orderdList);
  orderdList.classList.add('ordList');
  orderdList.innerHTML = oList.join('').replace(',', '').split(' ');
};

let handleMenuLi = (el) => {
  let headings = $$('h2');
  el.forEach((e) =>
    e.addEventListener('click', (event) => {
      let targetLi = event.target.innerHTML;
      headings.filter((heading) =>
        heading.innerHTML === targetLi.replace(/[.]/g, '')
          ? heading.classList.toggle('show-element')
          : ''
      );
      $('.show-element').scrollIntoView();
    })
  );
};

addCssClass();
addFullDate();
addMenuButton();
menuListe();

let addClasses = () => {
  $('.ordList').classList.toggle('cssClass');
  $('.menu-button').classList.toggle('menu-button-close');
  $('html').classList.toggle('html-small');
  if ($('.menu-button').classList.contains('menu-button-close')) {
    $('.menu-button').innerHTML = 'CLOSE';
  } else if (!$('.menu-button').classList.contains('menu-button-close')) {
    $('.menu-button').innerHTML = 'MENU';
    $$('h2').forEach((el) => el.classList.remove('show-element'));
  }
};

$('.menu-button').addEventListener('click', () => {
  handleMenuLi($$('.ordList li'));
  addClasses();
});
