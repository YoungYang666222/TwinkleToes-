// rewards-script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Reward Constants ---
    const SILVER_TIER_POINTS = 1000;
    
    // --- Simulated User Data ---
    // In a real application, this would come from the server
    let currentPoints = 450; 

    // --- Element IDs ---
    const pointsDisplay = document.getElementById('pointsTotalDisplay');
    const requiredPointsMessage = document.getElementById('requiredPointsMessage');
    const progressBar = document.getElementById('progressBar');
    const progressMessage = document.getElementById('progressMessage');


    // =========================================================
    // FUNCTION TO UPDATE UI STATUS
    // =========================================================
    function updateRewardsStatusUI() {
        pointsDisplay.textContent = currentPoints;

        if (currentPoints >= SILVER_TIER_POINTS) {
            // User reached Silver Tier
            progressMessage.textContent = "Congratulations! You have reached the Silver Tier!";
            requiredPointsMessage.textContent = "Continue earning to reach the Gold Tier!";
            progressBar.style.width = '100%';
            progressBar.style.backgroundColor = '#C0C0C0'; // Silver color
        } else {
            // User is still in Bronze Tier
            const neededPoints = SILVER_TIER_POINTS - currentPoints;
            const progressPercentage = (currentPoints / SILVER_TIER_POINTS) * 100;
            
            progressMessage.textContent = "You are on the Bronze Tier.";
            requiredPointsMessage.innerHTML = `You need <strong>${neededPoints} more points</strong> to reach the Silver Tier (${SILVER_TIER_POINTS} Points total).`;
            
            progressBar.style.width = `${progressPercentage}%`;
            progressBar.style.backgroundColor = 'var(--primary-color)';
        }
    }
    
    // Initial UI update on page load
    updateRewardsStatusUI();


    // --- Reward Definitions (Must match the costs in Rewards.html) ---
    const rewards = {
        '5_off': { cost: 500, description: '$5 Off Any Service' },
        'free_scrub': { cost: 800, description: 'Free Hand Scrub' },
        'gel_removal': { cost: 1200, description: 'Gel Removal Waiver' },
        '15_off_pedi': { cost: 1500, description: '$15 Off Deluxe Pedi' }
    };

    // --- Event Listener for Redemption Buttons ---
    document.querySelectorAll('.btn-redeem').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();

            const rewardId = button.getAttribute('data-reward-id');
            const reward = rewards[rewardId];

            if (!reward) {
                alert("Error: Reward ID not recognized.");
                return;
            }

            const cost = reward.cost;
            const description = reward.description;

            if (currentPoints >= cost) {
                // Successful Redemption (Simulated)
                if (confirm(`Do you want to redeem ${cost} points for "${description}"?`)) {
                    
                    // Subtract points
                    currentPoints -= cost;
                    
                    // Update UI using the dedicated function
                    updateRewardsStatusUI();

                    alert(`Success! You redeemed ${cost} points for a "${description}". Your new balance is ${currentPoints} points. A voucher has been added to your profile!`);
                    
                    button.textContent = "Redeemed!";
                    button.style.backgroundColor = '#2ecc71'; 
                    button.disabled = true;

                    pointsDisplay.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                // Insufficient Points
                const needed = cost - currentPoints;
                alert(`Sorry, you need ${needed} more points to redeem the "${description}". Keep earning!`);
            }
        });
    });
});