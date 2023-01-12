// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

const rightNow = moment().format('HH');
console.log("Right now", rightNow);

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

console.log(hoursArray[2].children[0].textContent)

$(function () {

  document.getElementById("currentDay").textContent= moment().format('MMMM Do, YYYY')

  //Loop to change color of current hour

  for(var i=0; i < hoursArray.length; i++){
    console.log(hoursArray[i].getAttribute("id"))
    console.log(moment().hour())
    if(parseInt(hoursArray[i].getAttribute("id")) === moment().hour() ){
      hoursArray[i].children[1].children[0].className="currentHour";
    }else if(parseInt(hoursArray[i].getAttribute("id")) > moment().hour()){
      hoursArray[i].children[1].children[0].className="futureHours";
    }
  }


  //Get to do items from local storage and

  var DATAfromStorage = JSON.parse(localStorage.getItem("dateAndText"));
  console.log("Info pulled from storage: ", DATAfromStorage)

  // console.log(DATAfromStorage.find(x => x.id === "11"))
  console.log(DATAfromStorage)
  
  if(DATAfromStorage !== null){
    
    for(i=9; i<18; i++){
      // console.log(DATAfromStorage[i-9]?.id)
      var idFromLocalStorage = DATAfromStorage[i-9]?.id;
      var obj = DATAfromStorage.find( x => x.id === idFromLocalStorage)
        if(idFromLocalStorage){
          console.log(idFromLocalStorage)
          if(parseInt(idFromLocalStorage) < 12){
            console.log(obj)
            document.getElementById(`${idFromLocalStorage}am`).textContent = obj.text;
          }else{
            document.getElementById(`${idFromLocalStorage}pm`).textContent = obj.text;
          }
          // document.getElementById()
        }
  
      }
  }





  //document.getElementById("16").children[1].children[0].textContent="dgfhggfhgf"


  // const findOnject = saveData.find( (obj) => obj.hour === "9") // <---- change 9 to i, use == instead of ===
  // console.log(saveData.indexOf(9))



  // function getText(i){
  //   const selectedObject = DATAfromStorage.find( (obj) => obj.hour == "i") // <---- change 9 to i, use == instead of ===
  //   return selectedObject?.value || "";   //  <----- ? means IF foundobj exists, do this
  // }

  // document.getElementById('11').children[1].children[0].textContent= DATAfromStorage[1].text

  // for(i=9; i<18; i++){
  //   let arrayLoop = DATAfromStorage.find(x => x.id === i)
  //   console.log(arrayLoop)
  // }





  //Click event & push to storage  DONE

  let saveButtonEl = document.getElementsByClassName("saveButton")

  document.body.addEventListener("click", function(e){
    console.log(e.target)

    if(e.target.textContent === "Save"){

      let targetParent = e.target.parentElement.parentElement;
      let textAreaText = targetParent.children[1].children[0].value
      let targetDate = targetParent.children[0].textContent.trim()
      let targetID = targetParent.id;

      console.log(targetID);

      var dateAndText = {
        date: targetDate,
        text: textAreaText,
        id: targetID
      }

      dateAndTextArray.push(dateAndText);
      localStorage.setItem("dateAndText", JSON.stringify(dateAndTextArray))
    }
  })


  // last commit trying to display storage data



  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});


// the $(function () is a self calling function. it runs when the page loads. put all of my js code inside of there
