// Define miles
let miles = 0;
let clickingPower = 1;

// Define a variable to keep track of the number of Mi-Upgrade purchases
let miUpgradePurchases = 0;

// Function when clicked on element(image/car)
function addToMiles(amount) {
  miles += amount;
  document.getElementById("miles").innerHTML = miles;
}

// Function to check if Super Mi-Upgrade is available
function isSuperMiUpgradeAvailable() {
  return miUpgradePurchases >= 2;
}


//                         !! Upgrades !!
// MI-UPGRADE
let miUpgradeCost = 15;
let miUpgrades = 0;

function buyMiUpgrade() {
  if (miles >= miUpgradeCost) {
    miles -= miUpgradeCost;
    miUpgrades++;
    miUpgradeCost = Math.round(miUpgradeCost * 2);
    document.getElementById("miles").innerHTML = miles;
    document.getElementById("miUpgradeCost").innerHTML = miUpgradeCost;
    document.getElementById("miUpgrades").innerHTML = miUpgrades;

    // Increment the count of Mi-Upgrade purchases
    miUpgradePurchases++;

    // Check if Super Mi-Upgrade should be made available
    if (isSuperMiUpgradeAvailable()) {
      document.getElementById("superMiUpgradeBtn").style.display = "block";
    }
  }
}

// SUPER MI-UPGRADE
let superMiUpgradeCost = 50;
let superMiUpgrades = 0;

function buySuperMiUpgrade() {
  if (miles >= superMiUpgradeCost) {
    miles -= superMiUpgradeCost;
    superMiUpgrades++;
    superMiUpgradeCost = Math.round(superMiUpgradeCost * 2);
    document.getElementById("miles").innerHTML = miles;
    document.getElementById("superMiUpgradeCost").innerHTML = superMiUpgradeCost;
    document.getElementById("superMiUpgrades").innerHTML = superMiUpgrades;
  }
}

// Toggle dark mode function
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");
}

// Set interval to increase miles
setInterval(function() {
  miles += miUpgrades;
  document.getElementById("miles").innerHTML = miles;
}, 1000); // 1000 ms = 1 second
