/*
QR Attendy base on Website and WebApp lol
Develop by BELDAD-Ace on Github with the team group 1 for PR2
aka Jhon Benedict Belad

all rights reserved 2025

*/


//Script for Getting started
const started = document.querySelector('#start');

started.addEventListener('click', () => {

  document.querySelector('.main-title').style.display = 'none';
  document.querySelector('.body-started').style.display = 'block';
});

//Damn bro Membrano at its peak


const btn = document.querySelector('.button-signer');


btn.addEventListener("click", () => {
    event.preventDefault();

  const fullName = document.getElementById("fullname").value;
  const username = document.getElementById("username").value;
  const role = document.querySelector("input[name='role']:checked")?.value;


  if (!fullName || !username || !role) {
    console.log('ok try agian');
    return;
  }

  window.startedAPI.saveOnboarding({ fullName, username, role });
});

//for the dashboards
