let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });


  function handleToys(toy){
    const toyContainer=document.getElementById('toy-collection')
    let cardContainer=document.createElement('div') //create a new element for holding the cards
    cardContainer.classList.add('card') //add a class 
    cardContainer.innerHTML=`
    <h2>${toy.name}</h2>
    <img src=${toy.image} alt=${toy.name} width="200px" height="200px"/>
    <p id="likes">${toy.likes} likes</p>
    <button id="like">Like</button>

    `;
    toyContainer.appendChild(cardContainer) //append the cards to the container

    //add a like function to the cards
    let liker=cardContainer.querySelector("#like")
liker.addEventListener('click',(e)=>{
  e.preventDefault()
let likes=cardContainer.querySelector('#likes')
toy.likes+=1
likes.innerHTML=toy.likes + ' likes'
updateLikes(toy)// function for updating the likes to the database
})
  }
  
  //funtion to fetch the toys
  function getToys(){
    fetch('http://localhost:3000/toys')
    .then(res=>res.json())
    .then(data=>data.forEach(toy=>handleToys(toy)))
  }
  getToys()

//function for adding toys
function addToys(){
let form=document.querySelector('.add-toy-form')

form.addEventListener('submit',()=>{
 let name=form.querySelector('input[name="name"]').value //use the names of the input to get the values
 let image=form.querySelector('input[name="image"]').value
let contentUpdate={
  name:name,
  image:image,


}
fetch('http://localhost:3000/toys',{
      method:'POST', //uses post method
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(contentUpdate)

  }).then(res=>console.log(res))

  
})
}
addToys()
//function  for updating the likes
function updateLikes(toyObj){
  fetch(`http://localhost:3000/toys/${toyObj.id}`, { //use a specific id to update each like
    method:'PATCH', //uses a patch method
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(toyObj)

  }).then(res=>console.log(res.json()))
  .then(data=>console.log(data))
  .catch(error=>console.log(error, 'error updating the likes'))
}








});

