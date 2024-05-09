// const hello = ()=>{
//     let h1 = document.createElement('h1');
//     h1.textContent = "Labas";
//     document.querySelector('body').appendChild(h1)
// }

// export default hello

let buttonModal = document.getElementById("buttonIkelti");
let modalPop = document.getElementById("modalID")
buttonModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modalPop.style.visibility = 'visible'
});

export default popup