 // Define miles
let miles = 0;
let clickingPower = 1;

// Define a variable to keep track of the number of Mi-Upgrade purchases
let miUpgradePurchases = 0;

// Function when clicked on element(image/car)
function addToMiles(amount) {
    miles += amount;
    document.getElementById("miles").innerHTML = miles;

    // Create and animate particles
    for (let i = 0; i < amount; i++) {
        createParticle();
    }
}

function createParticle() {
    const maxParticlesPerFrame = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
    let particlesCreatedThisFrame = 0;

    function attemptCreateParticle() {
        if (particlesCreatedThisFrame >= maxParticlesPerFrame) {
            setTimeout(attemptCreateParticle, 0);
            return;
        }

        const isGolden = Math.random() < 0.015;
        const isPurple = Math.random() < 0.030; // 1.9% chance of being a purple particle

        const particle = document.createElement('div');
        particle.classList.add('mistake-particle');
        if (isGolden) {
            particle.classList.add('golden-particle');
        } else if (isPurple) {
            particle.classList.add('purple-particle'); // Add a class for styling purple particles
        }
        document.body.appendChild(particle);

        particlesCreatedThisFrame++;

        requestAnimationFrame(() => {
            particlesCreatedThisFrame = 0;
        });

        const baseSize = isGolden ? 50 : isPurple ? 30 : Math.random() * 20 + 10;

        particle.style.width = baseSize + 'px';
        particle.style.height = baseSize + 'px';

        const rect = document.getElementById('car').getBoundingClientRect();
        const x = rect.left + Math.random() * rect.width;
        const y = rect.top + Math.random() * rect.height;
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';

        const animationDuration = Math.random() * 1000 + 1000;
        const angle = Math.random() * Math.PI / 4 - Math.PI / 8;
        const speed = 50;
        const deltaX = Math.sin(angle) * speed;
        const deltaY = Math.cos(angle) * speed;

        let lastTime = null;
        function animate(time) {
            if (lastTime !== null) {
                const deltaTime = (time - lastTime) / 1000;
                const newX = parseFloat(particle.style.left) + deltaX * deltaTime;
                const newY = parseFloat(particle.style.top) + deltaY * deltaTime;
                particle.style.left = newX + 'px';
                particle.style.top = newY + 'px';
            }
            lastTime = time;
            if (parseFloat(particle.style.top) < window.innerHeight) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        }
        requestAnimationFrame(animate);

        particle.style.animationDuration = animationDuration + 'ms';
        particle.style.animationName = 'spin';

        setTimeout(() => {
            particle.style.opacity = '0';
            particle.style.transition = 'opacity 1s';
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }, 3000);

        if (isGolden) {
            particle.addEventListener('click', () => {
                miles *= 2; // Double the points
                document.getElementById("miles").textContent = miles;
                particle.remove();
            });
        } else if (isPurple) {
            particle.addEventListener('click', () => {
                miles *= 1.5; // 1.5 times the points
                document.getElementById("miles").textContent = miles;
                particle.remove();
            });
        }
    }

    attemptCreateParticle();
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

let startTime = new Date(); // Record the start time

// Function to update the uptime
function updateUptime() {
    let currentTime = new Date();
    let timeDifference = currentTime - startTime; // Time difference in milliseconds
    let seconds = Math.floor((timeDifference / 1000) % 60);
    let minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    let hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);

    // Format the time as HH:MM:SS
    let formattedTime = hours.toString().padStart(2, '0') + ":" +
                        minutes.toString().padStart(2, '0') + ":" +
                        seconds.toString().padStart(2, '0');

    document.getElementById("uptime").textContent = formattedTime;
}

// Call the updateUptime function every second
setInterval(updateUptime, 1000);


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

setInterval(function() {
    if(superMiUpgrades > 0) {
        createParticle();
    }
}, 5000); // 5000 ms = 5 seconds

setInterval(function() {
    if(miUpgrades > 0) {
        createParticle();
    }
}, 5000); // 5000 ms = 5 seconds
