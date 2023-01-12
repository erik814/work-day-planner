const nine = document.getElementById("9");
const ten = document.getElementById("10");
const eleven = document.getElementById("11");
const twelve = document.getElementById("12");
const one = document.getElementById("13");
const two = document.getElementById("14");
const three = document.getElementById("15");
const four = document.getElementById("16");
const five = document.getElementById("17");

let hoursArray = [nine, ten, eleven, twelve, one, two, three, four, five];
dateAndTextArray = []


$(function () {

  document.getElementById("currentDay").textContent= moment().format('MMMM Do, YYYY')

  //Loop to change color of current hour

  for(var i=0; i < hoursArray.length; i++){
    if(parseInt(hoursArray[i].getAttribute("id")) === moment().hour() ){
      hoursArray[i].children[1].children[0].className="currentHour";
    }else if(parseInt(hoursArray[i].getAttribute("id")) > moment().hour()){
      hoursArray[i].children[1].children[0].className="futureHours";
    }
  }


  //Get to do items from local storage and display the text content to the specified text area

  var DATAfromStorage = JSON.parse(localStorage.getItem("dateAndText"));

  if(DATAfromStorage !== null){
    
    for(i=9; i<18; i++){
      var idFromLocalStorage = DATAfromStorage[i-9]?.id;
      var obj = DATAfromStorage.find( x => x.id === idFromLocalStorage)
        if(idFromLocalStorage){
          if(parseInt(idFromLocalStorage) < 12){
            document.getElementById(`${idFromLocalStorage}am`).textContent = obj.text;
          }else{
            document.getElementById(`${idFromLocalStorage}pm`).textContent = obj.text;
          }
        }
    }
  }


  //Click event & push specified text to storage

  let saveButtonEl = document.getElementsByClassName("saveButton")

  document.body.addEventListener("click", function(e){
    if(e.target.textContent === "Save"){

      let targetParent = e.target.parentElement.parentElement;
      let textAreaText = targetParent.children[1].children[0].value
      let targetDate = targetParent.children[0].textContent.trim()
      let targetID = targetParent.id;

      var dateAndText = {
        date: targetDate,
        text: textAreaText,
        id: targetID
      }

      dateAndTextArray.push(dateAndText);
      localStorage.setItem("dateAndText", JSON.stringify(dateAndTextArray))
    }
  })
})