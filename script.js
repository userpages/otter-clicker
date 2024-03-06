//define miles
let miles = 0;
let clickingPower = 1;
//function when clicked on element(image/car)
function addToMiles(amount) {
  miles = miles + amount;
  document.getElementById("miles").innerHTML = miles;
}

//                         !! upgrades !!
//TAXI
let taxiCost = 15;
let taxis = 0;
//TRUCK
let oldtruckCost = 100;
let oldtrucks = 0;
//BTR-80 TANK
let btrtankCost = 9999999999;
let btrtanks = 0;

function buyTaxi() {
  if (miles>= taxiCost) {
    miles = miles - taxiCost;
    taxis = taxis + 1;
    taxicost = Math.round(taxiCost * 2);
    document.getElementById("miles").innerHTML = miles;
    document.getElementById("taxicost").innerHTML = taxiCost;
    document.getElementById("taxis").innerHTML = taxis;
  }
}

function buyOldTruck() {
  if (miles>= oldtruckCost) {
    miles = miles - oldtruckCost;
    oldtrucks = oldtrucks + 1;
    oldtruckcost = Math.round(oldtruckCost * 2);
    document.getElementById("miles").innerHTML = miles;
    document.getElementById("oldtruckcost").innerHTML = oldtruckCost;
    document.getElementById("oldtrucks").innerHTML = oldtrucks;
  }
}

setInterval(
  function() {
    miles = miles + taxis;
    miles = miles + oldtrucks * 5;
    document.getElementById("miles").innerHTML = miles;
  }, 1000); //1000 ms = 1 second
