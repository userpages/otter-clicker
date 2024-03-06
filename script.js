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
    const maxParticlesPerFrame = Math.floor(Math.random() * (20 - 10 + 1)) + 10; // Random limit between 10 and 20 particles per frame
    let particlesCreatedThisFrame = 0; // Track the number of particles created in the current frame

    function attemptCreateParticle() {
        if (particlesCreatedThisFrame >= maxParticlesPerFrame) {
            // If the limit is reached, delay the creation of new particles
            setTimeout(attemptCreateParticle, 0); // Schedule the creation for the next frame
            return;
        }

        const isGolden = Math.random() < 0.015; // 5% chance of being a golden particle

        const particle = document.createElement('div');
        particle.classList.add('mistake-particle');
        if (isGolden) {
            particle.classList.add('golden-particle'); // Add a class for styling golden particles
        }
        document.body.appendChild(particle);

        // Increment the counter for particles created in this frame
        particlesCreatedThisFrame++;

        // Reset the counter when the frame ends
        requestAnimationFrame(() => {
            particlesCreatedThisFrame = 0;
        });

        // Randomize size
        const baseSize = isGolden ? 50 : Math.random() * 20 + 10; // Random size between 10 and 30 pixels, or 50 pixels for golden particles

        // Apply size
        particle.style.width = baseSize + 'px';
        particle.style.height = baseSize + 'px';

        // Randomize initial position within the clicked image
        const rect = document.getElementById('car').getBoundingClientRect();
        const x = rect.left + Math.random() * rect.width;
        const y = rect.top + Math.random() * rect.height;
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';

        // Randomize animation duration and falling direction
        const animationDuration = Math.random() * 1000 + 1000; // Between 1 and 2 seconds
        const angle = Math.random() * Math.PI / 4 - Math.PI / 8; // Random angle within -π/8 to π/8
        const speed = 50; // Pixels per second
        const deltaX = Math.sin(angle) * speed;
        const deltaY = Math.cos(angle) * speed;

        // Animate particle
        let lastTime = null;
        function animate(time) {
            if (lastTime !== null) {
                const deltaTime = (time - lastTime) / 1000; // Convert milliseconds to seconds
                const newX = parseFloat(particle.style.left) + deltaX * deltaTime;
                const newY = parseFloat(particle.style.top) + deltaY * deltaTime;
                particle.style.left = newX + 'px';
                particle.style.top = newY + 'px';
            }
            lastTime = time;
            if (parseFloat(particle.style.top) < window.innerHeight) {
                requestAnimationFrame(animate);
            } else {
                particle.remove(); // Remove particle when it falls out of view
            }
        }
        requestAnimationFrame(animate);

        // Apply spinning animation
        particle.style.animationDuration = animationDuration + 'ms';
        particle.style.animationName = 'spin';

        // Fade out after 3 seconds
        setTimeout(() => {
            particle.style.opacity = '0';
            particle.style.transition = 'opacity 1s'; // Smooth fade-out
            setTimeout(() => {
                particle.remove(); // Remove particle after fading out
            }, 1000); // Fading duration
        }, 3000); // 3 seconds

        // Handle clicking golden particles
        if (isGolden) {
            particle.addEventListener('click', () => {
                // Double the amount of points
                miles *= 2;
                document.getElementById("miles").textContent = miles;
                particle.remove(); // Remove the golden particle when clicked
            });
        }
    }

    // Attempt to create a particle
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
