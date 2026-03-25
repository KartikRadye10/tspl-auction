// =========================================================
// --- 1. FIREBASE SETUP (THE CLOUD BRAIN) ---
// =========================================================
const firebaseConfig = {
  apiKey: "AIzaSyD1Xtf4bwXJLJK4ZwRtDmqqy5GleVYSir4",
  authDomain: "tspl-auction.firebaseapp.com",
  databaseURL: "https://tspl-auction-default-rtdb.firebaseio.com",
  projectId: "tspl-auction",
  storageBucket: "tspl-auction.firebasestorage.app",
  messagingSenderId: "671810495209",
  appId: "1:671810495209:web:ca8c78652ecd5bab588678"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// =========================================================
// --- 2. GLOBAL VARIABLES ---
// =========================================================
const defaultTeams = { "TriveniBlasters": 50000, "TriveniChallengers": 50000, "TriveniHitters": 50000, "TriveniIndians": 50000, "TriveniKings": 50000, "TriveniLegends": 50000, "TriveniStrikers": 50000, "TriveniTigers": 50000 };
const defaultCounts = { "TriveniBlasters": 0, "TriveniChallengers": 0, "TriveniHitters": 0, "TriveniIndians": 0, "TriveniKings": 0, "TriveniLegends": 0, "TriveniStrikers": 0, "TriveniTigers": 0 };

let teams = {...defaultTeams};
let teamCounts = {...defaultCounts};
let soldPlayersData = [];
let currentBid = 1000;
let currentPlayerIndex = -1;

// =========================================================
// --- 3. TEAM OWNERS DIRECTORY ---
// =========================================================
const teamOwnersMap = {
    "TriveniBlasters": "Ankush Bane",
    "TriveniChallengers": "Sandip Chopdekar",
    "TriveniHitters": "Siddesh Sarvekar",
    "TriveniIndians": "Swapnil Pawar",
    "TriveniKings": "Nilesh  Desai",
    "TriveniLegends": "Manish Ghone",
    "TriveniStrikers": "Mahesh Desai",
    "TriveniTigers": "Sagar Sugadare"
};

// =========================================================
// --- 4. DATA ARRAYS ---
// =========================================================
const ownersList = [
    { name: "Ankush Bane", photo: "images/ankush.jpeg", team: "TriveniBlasters" },
    { name: "Mahesh Desai", photo: "images/mahesh.jpeg", team: "TriveniStrikers" },
    { name: "Manish Ghone", photo: "images/manish.jpeg", team: "TriveniLegends" },
    { name: "Nilesh Desai", photo: "images/nilesh.jpeg", team: "TriveniKings" },
    { name: "Sagar Sugadare", photo: "images/ssugadare.jpeg", team: "TriveniTigers" },
    { name: "Sandip Chopdekar", photo: "images/sandeepc.jpeg", team: "TriveniChallengers" },
    { name: "Siddesh Sarvekar", photo: "images/sidsarvekar.jpeg", team: "TriveniHitters" },
    { name: "Swapnil Pawar", photo: "images/swapnil.jpeg", team: "TriveniIndians" }
];

const playersList = [
    { name: "Sanchit Talekar ", role: "All-Rounder", photo: "images/Sanchit.jpeg" },
    { name: "Abhijeet Parab", role: "Batter", photo: "images/Abijeet.jpeg" },
    { name: "Prathamesh Gawade", role: "All-Rounder", photo: "images/babu.jpeg" },
    { name: "Harshal Talekar", role: "All-Rounder", photo: "images/Minu.jpeg" },
    { name: "Sahil Gawade", role: "Bowler", photo: "images/SahilGawade.jpeg" },
    { name: "Harsh Chindarkar", role: "Batter", photo: "images/Harsh.jpeg" },
    { name: "Aakash Pashte", role: "All-Rounder", photo: "images/aakash.jpeg" },
    { name: "Kartik Radye", role: "All-Rounder", photo: "images/kartik.jpeg" },
    { name: "Prajyot Thakur", role: "All-Rounder", photo: "images/prajyot.jpeg" },
    { name: "Vinayak Parab", role: "All-Rounder", photo: "images/vinayak.jpeg" },
    { name: "Mahadev Gawade", role: "All-Rounder", photo: "images/maddy.jpeg" },
    { name: "Vishal Vange", role: "All-Rounder", photo: "images/vange.jpeg" },
    { name: "Omkar Sawant", role: "All-Rounder", photo: "images/OmkarSawant.jpeg" },
    { name: "Parth Shinde", role: "All-Rounder", photo: "images/parth.jpeg" },
    { name: "Sagar Bhakriye", role: "Bowler", photo: "images/sagar.jpeg" },
    { name: "Aditya Bane", role: "All-Rounder", photo: "images/aditya.jpeg" },
    { name: "Rishikesh Dalvi", role: "All-Rounder", photo: "images/rushi.jpeg" },
    { name: "Pranay Gurav", role: "All-Rounder", photo: "images/pranay.jpeg" },
    { name: "Pratham More", role: "Batter", photo: "images/pratham.jpeg" },
    { name: "Viren Pawar", role: "All-Rounder", photo: "images/Viren.jpeg" },
    { name: "Prasad Pawar", role: "All-Rounder", photo: "images/prasad.jpeg" },
    { name: "Meet Kadam", role: "All-Rounder", photo: "images/meet.jpeg" },
    { name: "Tejas Talekar", role: "All-Rounder", photo: "images/raju.jpeg" },
    { name: "Smitesh Talekar", role: "All-Rounder", photo: "images/sonu.jpeg" },
    { name: "Ajit Kalekar", role: "Bowler", photo: "images/ajitdada.jpeg" },
    { name: "Akshay Gurav ", role: "All-Rounder", photo: "images/akshu.jpeg" },
    { name: "Kunal Radye", role: "All-Rounder", photo: "images/kunal.jpeg" },
    { name: "Ranjeet Gothal", role: "All-Rounder", photo: "images/ranjeet.jpeg" },
    { name: "Nitish Nivalkar", role: "All-Rounder", photo: "images/nitish.jpeg" },
    { name: "Omkar Nakti", role: "All-Rounder", photo: "images/omkarnakti.jpeg" },
    { name: "Sujal Nakti", role: "Batter", photo: "images/surajnakti.jpeg" },
    { name: "Shailesh Varekar", role: "All-Rounder", photo: "images/shailesh.jpeg" },
    { name: "Madhur More", role: "All-Rounder", photo: "images/madhur.jpeg" },
    { name: "Akhil Pandhare", role: "All-Rounder", photo: "images/akhil.jpeg" },
    { name: "Gaurav Sawant", role: "All-Rounder", photo: "images/gaurav.jpeg" },
    { name: "Uddhav Chindarkar", role: "All-Rounder", photo: "images/uddhav.jpeg" },
    { name: "Umesh Devle", role: "All-Rounder", photo: "images/devle.jpeg" },
    { name: "Arun Lad", role: "All-Rounder", photo: "images/arun.jpeg" },
    { name: "Narendra Pawar ", role: "All-Rounder", photo: "images/naru.jpeg" },
    { name: "Ketan Pashte", role: "All-Rounder", photo: "images/ketan.jpeg" },
    { name: "Devesh Jadhav", role: "Bowler", photo: "images/devesh.jpeg" },
    { name: "Siddhesh Parab", role: "Batter", photo: "images/siddhu.jpeg" },
    { name: "Vinod Pawar", role: "All-Rounder", photo: "images/vinod.jpeg" },
    { name: "Mayur Sarvankar", role: "All-Rounder", photo: "images/mayur.jpeg" },
    { name: "Anvay Bane", role: "Bowler", photo: "images/anvay.jpeg" },
    { name: "Nitin Shirke", role: "All-Rounder", photo: "images/nitin.jpeg" },
    { name: "Pradeep Sutar", role: "All-Rounder", photo: "images/pradeep.jpeg" },
    { name: "Rohit Chiplunkar", role: "Batter", photo: "images/rohit.jpeg" },
    { name: "Dipesh Talekar", role: "Batter", photo: "images/dipesh.jpeg" },
    { name: "Avinath Bane", role: "All-Rounder", photo: "images/avi.jpeg" },
    { name: "Sahil Gurav", role: "Batter", photo: "images/sahilgurav.jpeg" },
    { name: "Deepesh Talekar", role: "Batter", photo: "images/deepesh.jpeg" },
    { name: "Sharad Pawar", role: "All-Rounder", photo: "images/sharad.jpeg" },
    { name: "Pratham Pawar", role: "All-Rounder", photo: "images/ppawar.jpeg" },
    { name: "Vedant Kuperkar", role: "All-Rounder", photo: "images/vedant.jpeg" },
    { name: "Ronak Parab", role: "All-Rounder", photo: "images/ronak.jpeg" },
    { name: "Shravan Desai", role: "All-Rounder", photo: "images/shravan.jpeg" },
    { name: "Raj Kadam", role: "All-Rounder", photo: "images/raj.jpeg" },
    { name: "Santosh Chindarkar", role: "All-Rounder", photo: "images/santoshc.jpeg" },
    { name: "Santosh Randive", role: "All-Rounder", photo: "images/santoshr.jpeg" },
    { name: "Mangesh Ghone", role: "All-Rounder", photo: "images/mangesh.png" },
    { name: "Vikas Hatge", role: "All-Rounder", photo: "images/vikas.jpeg" },
    { name: "Sanjay Kadam", role: "Bowler", photo: "images/sanjay.jpeg" },
    { name: "Nikhil Kondaskar", role: "All-Rounder", photo: "images/nikhil.jpeg" }

];

// =========================================================
// --- 5. THE GATEKEEPER (ADMIN SECURITY) ---
// =========================================================
function isAuthorized() {
    const enteredPin = document.getElementById('admin-pin').value;
    const secretPin = "8591"; // 👈 CHANGE THIS to your own secret code!
    if (enteredPin === secretPin) return true;
    alert("⛔ ACCESS DENIED: Incorrect Admin PIN.");
    return false;
}
// =========================================================
// --- 6. TAB SWITCHING ---
// =========================================================
function switchTab(viewId, btnElement) {
    document.querySelectorAll('.view-section').forEach(view => {
        view.classList.remove('active-view');
        view.classList.add('hidden-view');
    });
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(viewId).classList.remove('hidden-view');
    document.getElementById(viewId).classList.add('active-view');
    btnElement.classList.add('active');

    if (viewId === 'teams-view') renderDetailedTeamsPage();
    
    // 🛠️ THE FIX: This now looks at 'roster-search', NOT 'auction-search'
    if (viewId === 'players-view') {
        const searchBar = document.getElementById('roster-search');
        renderAlphabeticalPlayersPage(searchBar ? searchBar.value : '');
    }
    
    if (viewId === 'owners-view') renderOwnersPage();
}

// =========================================================
// --- 7. RENDER FUNCTIONS ---
// =========================================================
function renderTeams() {
    const topBar = document.getElementById('top-teams-bar');
    const squadsGrid = document.getElementById('team-squads-grid');
    if(!topBar || !squadsGrid) return;
    topBar.innerHTML = ''; 
    squadsGrid.innerHTML = '';

    for (let team in teams) {
        let logoSrc = `images/${team}.jpeg`; 
        topBar.innerHTML += `
            <div class="top-team-card">
                <img src="${logoSrc}" alt="${team}" class="team-top-logo" onerror="this.onerror=null; this.src='images/logo.jpeg';">
                <div class="team-name">${team}</div>
                <div class="team-purse">₹${teams[team]}</div>
            </div>`;
        squadsGrid.innerHTML += `
            <div class="squad-card"><span class="name">${team}</span><span class="count">${teamCounts[team]}</span></div>`;
    }
}

function renderDetailedTeamsPage() {
    const container = document.getElementById('detailed-teams-container');
    if (!container) return; 
    container.innerHTML = ''; 
    
    for (let team in teams) {
        let logoSrc = `images/${team}.jpeg`; 
        let ownerName = teamOwnersMap[team] || "TBA";
        let teamPlayers = (soldPlayersData || []).filter(p => p.team === team);
        
        let listHTML = teamPlayers.length > 0 ? teamPlayers.map(p => 
            `<li style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed #2A3B5C;">
                <span style="color: var(--text-white);">${p.name}</span> 
                <span style="color: var(--accent-green); font-weight: bold;">₹${p.price}</span>
            </li>`).join('') : `<li style="color: gray; text-align: center; padding: 10px 0;">No players bought yet.</li>`;
        
        // 🛠️ Safe ID generator (fixes issues if a team name has a space in it)
        let safeTeamId = team.replace(/\s+/g, '-');

        container.innerHTML += `
            <div class="team-roster-card" style="background: var(--bg-panel); border: 1px solid var(--border-color); border-top: 4px solid var(--accent-gold); border-radius: 10px; padding: 20px;">
                <div class="team-roster-header" style="display: flex; align-items: center; justify-content: space-between; gap: 15px; border-bottom: 1px solid var(--border-color); padding-bottom: 10px; margin-bottom: 10px;">
                    <img src="${logoSrc}" alt="${team}" style="width: 45px; height: 45px; border-radius: 50%; object-fit: cover; border: 2px solid var(--accent-gold); flex-shrink: 0;" onerror="this.style.display='none'">
                    <h3 style="margin: 0; color: var(--text-white); font-size: 1.2rem; flex-grow: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding-right: 10px;">${team}</h3>
                    <span style="color: var(--accent-gold); font-weight: bold; font-size: 1.2rem; flex-shrink: 0;">₹${teams[team]}</span>
                </div>
                <div style="background: rgba(212, 175, 55, 0.1); color: var(--accent-gold); text-align: center; padding: 6px; font-size: 0.85rem; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px; border-radius: 4px; border: 1px solid rgba(212, 175, 55, 0.3);">👑 Owner: ${ownerName}</div>
                
                <button class="view-squad-btn" onclick="toggleSquadList('${safeTeamId}')">
                    VIEW SQUAD (${teamPlayers.length}) ▾
                </button>

                <ul id="list-${safeTeamId}" class="roster-list hidden-squad" style="list-style: none; padding: 0; margin: 0;">
                    ${listHTML}
                </ul>
            </div>`;
    }
}
// 🆕 THE CORRECTED FUNCTION THAT OPENS/CLOSES THE LIST
function toggleSquadList(teamId) {
    const list = document.getElementById(`list-${teamId}`);
    if (!list) return;
    
    // Toggle the hidden class
    const isHidden = list.classList.toggle('hidden-squad');
    const btn = list.previousElementSibling;
    
    // 🛠️ THE FIX: Check if the 1 item is actually the "No players" message
    let realCount = list.children.length;
    if (realCount === 1 && list.innerHTML.includes("No players")) {
        realCount = 0; // Force it to 0 if the list is empty
    }
    
    // Change the button text and color
    if (isHidden) {
        btn.innerHTML = `VIEW SQUAD (${realCount}) ▾`;
        btn.style.background = "transparent";
    } else {
        btn.innerHTML = `HIDE SQUAD ▴`;
        btn.style.background = "rgba(212, 175, 55, 0.1)"; 
    }
}

function renderAlphabeticalPlayersPage(searchTerm = '') {
    const container = document.getElementById('all-players-container');
    if (!container) return;
    container.innerHTML = '';
    let filtered = playersList.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.role.toLowerCase().includes(searchTerm.toLowerCase()));
    filtered.sort((a, b) => a.name.localeCompare(b.name));
    
    filtered.forEach(p => {
        const sold = soldPlayersData.find(s => s.name.trim() === p.name.trim());
        let badgeHTML = sold 
            ? `<div style="color: var(--accent-green); font-size: 0.85rem; font-weight: bold; margin-top: 10px; background: rgba(16, 185, 129, 0.1); padding: 6px 8px; border-radius: 4px; border: 1px solid var(--accent-green);">SOLD: ${sold.team} ₹${sold.price}</div>`
            : `<div style="color: var(--text-muted); font-size: 0.85rem; margin-top: 10px; font-style: italic; padding: 6px 8px;">Unsold</div>`;

       container.innerHTML += `
            <div class="player-mini-card" style="background: var(--bg-panel); border: 1px solid var(--border-color); border-radius: 10px; padding: 15px; text-align: center;">
                <img src="${p.photo}" alt="${p.name}" style="width: 100%; height: 220px; border-radius: 8px; object-fit: cover; object-position: center 15%; border: 2px solid var(--border-color); margin-bottom: 10px;" onerror="this.onerror=null; this.src='images/default-player.jpg';">
                <h4 style="margin: 0; color: var(--text-white); font-size: 1.1rem;">${p.name}</h4>
                <p style="margin: 0; color: var(--text-muted); font-size: 0.9rem; text-transform: uppercase;">${p.role}</p>
                ${badgeHTML}
            </div>`;
    });
}

function renderOwnersPage() {
    const container = document.getElementById('owners-container');
    if (!container) return;
    container.innerHTML = ''; 
    ownersList.forEach(owner => {
        
        // 🛠️ I added class="owner-team-logo" to the tiny image tag!
        let teamHTML = owner.team ? `<div style="display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 10px; padding: 6px; background: rgba(212, 175, 55, 0.1); border-radius: 4px; border: 1px solid var(--accent-gold);"><img class="owner-team-logo" src="images/${owner.team}.jpeg" style="width: 30px; height: 30px; min-width: 30px; flex-shrink: 0; border-radius: 50%; object-fit: cover;"><span style="color: var(--accent-gold); font-size: 0.95rem; font-weight: bold; white-space: nowrap;">${owner.team}</span></div>` : `<div style="color: var(--text-muted); font-size: 0.85rem; margin-top: 10px; padding: 6px; background: rgba(255,255,255,0.05); border-radius: 4px; border: 1px dashed var(--border-color);">Team TBA at Auction</div>`;
        
        container.innerHTML += `
            <div class="player-mini-card" style="background: var(--bg-panel); border: 1px solid var(--border-color); border-top: 4px solid var(--accent-gold); border-radius: 10px; padding: 15px; text-align: center;">
                <img src="${owner.photo}" alt="${owner.name}" style="width: 100%; height: 220px; border-radius: 8px; object-fit: cover; object-position: center 15%; border: 2px solid var(--accent-gold); margin-bottom: 10px;" onerror="this.onerror=null; this.src='images/default-player.jpg';">
                <h4 style="margin: 0; color: var(--text-white); font-size: 1.2rem;">${owner.name}</h4>
                <p style="margin: 0; color: var(--accent-gold); font-size: 0.95rem; font-weight: bold; text-transform: uppercase;">Franchise Owner</p>${teamHTML}
            </div>`;
    });
}
// =========================================================
// --- 8. FIREBASE REAL-TIME SYNC ---
// =========================================================
function pushToCloud() {
    db.ref('auctionData').set({ teams, teamCounts, soldPlayersData, currentBid, currentPlayerIndex });
}

db.ref('auctionData').on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
        teams = data.teams || defaultTeams;
        teamCounts = data.teamCounts || defaultCounts;
        soldPlayersData = data.soldPlayersData || [];
        currentBid = data.currentBid || 1000;
        currentPlayerIndex = data.currentPlayerIndex !== undefined ? data.currentPlayerIndex : -1;
        renderTeams();
        if (document.getElementById('teams-view').classList.contains('active-view')) renderDetailedTeamsPage();
       // 🛠️ THE FIX: Make sure the cloud sync also uses 'roster-search'
        if (document.getElementById('players-view').classList.contains('active-view')) {
            renderAlphabeticalPlayersPage(document.getElementById('roster-search')?.value || '');
        }
        if (document.getElementById('owners-view').classList.contains('active-view')) renderOwnersPage();
        const bidInput = document.getElementById('current-bid');
        if(bidInput) bidInput.value = currentBid;
        if (currentPlayerIndex >= 0 && currentPlayerIndex < playersList.length) {
            document.getElementById('player-name').innerText = playersList[currentPlayerIndex].name;
            document.getElementById('player-role').innerText = playersList[currentPlayerIndex].role;
            document.getElementById('player-photo').src = playersList[currentPlayerIndex].photo;
        } else if (currentPlayerIndex >= playersList.length) {
            document.getElementById('player-name').innerText = "AUCTION COMPLETE";
            document.getElementById('player-photo').src = "images/TSPL.jpeg";
        }
    } else if(playersList.length > 0) {
        findNextUnsoldPlayer(); pushToCloud();
    }
});

// =========================================================
// --- 9. AUCTION CONTROLS (WITH SECURITY) ---
// =========================================================
function increaseBid() {
    if (!isAuthorized()) return;
    currentBid += 1000; db.ref('auctionData/currentBid').set(currentBid);
}
function decreaseBid() {
    if (!isAuthorized()) return;
    if (currentBid > 1000) { currentBid -= 1000; db.ref('auctionData/currentBid').set(currentBid); }
}
function sellPlayer() {
    if (!isAuthorized()) return;
    const selectedTeam = document.getElementById('team-selector').value;
    if (!selectedTeam) return alert("Select a winning team!");
    if (teams[selectedTeam] >= currentBid) {
        teams[selectedTeam] -= currentBid; teamCounts[selectedTeam] += 1;
        soldPlayersData.push({ name: playersList[currentPlayerIndex].name, role: playersList[currentPlayerIndex].role, team: selectedTeam, price: currentBid });
        alert("Hammer Down!"); findNextUnsoldPlayer(); pushToCloud();
    } else alert("Insufficient funds!");
}
function passPlayer() {
    if (!isAuthorized()) return;
    findNextUnsoldPlayer(); pushToCloud();
}
function findNextUnsoldPlayer() {
    currentBid = 1000;
    let attempts = 0;
    while (attempts < playersList.length) {
        currentPlayerIndex = (currentPlayerIndex + 1) % playersList.length;
        if (!soldPlayersData.some(s => s.name.trim() === playersList[currentPlayerIndex].name.trim())) return;
        attempts++;
    }
    currentPlayerIndex = playersList.length;
}
function resetAuction() {
    // 🔒 THE LOCK:
    if (!isAuthorized()) return; 

    if (confirm("⚠️ Are you sure you want to completely reset the auction for EVERYONE viewing the site?")) {
        teams = {...defaultTeams};
        teamCounts = {...defaultCounts};
        soldPlayersData = [];
        currentBid = 1000;
        currentPlayerIndex = -1;
        findNextUnsoldPlayer();
        pushToCloud(); 
        alert("Auction has been fully reset!");
    }
}

function downloadExcel() {
    // 🔒 THE LOCK:
    if (!isAuthorized()) return; 

    if (soldPlayersData.length === 0) { alert("No players have been sold yet!"); return; }
    let csvContent = "data:text/csv;charset=utf-8,Player Name,Role,Winning Team,Sold Price (INR)\n";
    soldPlayersData.forEach(p => csvContent += `"${p.name}","${p.role}","${p.team}","${p.price}"\n`);
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "TSPL_Auction_Results.csv";
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
}

function jumpToPlayer(searchName) {
    if (!isAuthorized()) return;
    const index = playersList.findIndex(p => p.name.trim().toLowerCase() === searchName.trim().toLowerCase());
    if (index !== -1) { currentPlayerIndex = index; currentBid = 1000; pushToCloud(); }
    else alert("Not found!");
}

function populateDatalist() {
    const dl = document.getElementById('player-datalist');
    if (dl) playersList.forEach(p => dl.innerHTML += `<option value="${p.name}">`);
}
populateDatalist();