// ================= PAGE NAVIGATION =================

function showPage(pageName) {

    const pages =
        document.querySelectorAll(".page");


    pages.forEach(function(page) {

        page.classList.add("hidden");

    });


    document
        .getElementById(pageName)
        .classList.remove("hidden");

}


// ================= UPDATE EVERYTHING =================

function updateUI() {

    updateDashboard();

    updateProfile();

    updateLeaderboard();

    updateProblemStatistics();

    displayProblems(problems);

    displayAchievements();

}


// ================= DASHBOARD =================

function updateDashboard() {

    document
        .getElementById("userName")
        .innerText =
        user.name;


    document
        .getElementById("xp")
        .innerText =
        user.xp;


    document
        .getElementById("level")
        .innerText =
        user.level;


    document
        .getElementById("solved")
        .innerText =
        user.solved;


    document
        .getElementById("streak")
        .innerText =
        user.streak;


    const currentXP =
        user.xp % 100;


    document
        .getElementById("progressBar")
        .style.width =
        currentXP + "%";


    document
        .getElementById("progressText")
        .innerText =
        currentXP +
        " / 100 XP";


    displayDailyChallenge();

    displayActivity();

}


// ================= PROFILE =================

function updateProfile() {

    document
        .getElementById("profileName")
        .innerText =
        user.name;


    document
        .getElementById("profileLevel")
        .innerText =
        user.level;


    document
        .getElementById("profileSolved")
        .innerText =
        user.solved;


    document
        .getElementById("profileXP")
        .innerText =
        user.xp;


    document
        .getElementById("profileStreak")
        .innerText =
        user.streak;

}


// ================= PROBLEMS =================

function displayProblems(problemArray) {

    const container =
        document.getElementById(
            "problemList"
        );


    container.innerHTML = "";


    if (problemArray.length === 0) {

        container.innerHTML = `

            <div class="no-results">

                No problems found.

            </div>

        `;

        return;

    }


    problemArray.forEach(function(problem) {

        const card =
            document.createElement("div");


        card.className =
            "problem-card";


        const solved =
            solvedProblems.includes(
                problem.id
            );


        card.innerHTML = `

            <div>

                <span class="
                    difficulty
                    ${problem.difficulty}
                ">

                    ${problem.difficulty.toUpperCase()}

                </span>


                <h2>
                    ${problem.name}
                </h2>


                <p>

                    ${problem.topic}

                    •

                    ${problem.xp} XP

                </p>

            </div>


            <button
                onclick="
                    solveProblem(${problem.id})
                "
                ${solved ? "disabled" : ""}
            >

                ${
                    solved
                    ? "Solved ✓"
                    : "Solve"
                }

            </button>

        `;


        container.appendChild(card);

    });

}


// ================= PROBLEM STATISTICS =================

function updateProblemStatistics() {

    document
        .getElementById("totalProblems")
        .innerText =
        problems.length;


    document
        .getElementById("solvedProblems")
        .innerText =
        solvedProblems.length;


    document
        .getElementById("remainingProblems")
        .innerText =
        problems.length -
        solvedProblems.length;

}


// ================= ACHIEVEMENTS =================

function displayAchievements() {

    const container =
        document.getElementById(
            "achievementList"
        );


    container.innerHTML = "";


    achievements.forEach(function(achievement) {

        const unlocked =
            user.achievements.includes(
                achievement.id
            );


        const card =
            document.createElement("div");


        card.className =
            unlocked
            ? "achievement"
            : "achievement locked";


        card.innerHTML = `

            <div class="achievement-icon">

                ${
                    unlocked
                    ? achievement.icon
                    : "🔒"
                }

            </div>


            <h3>
                ${achievement.name}
            </h3>


            <p>
                ${achievement.description}
            </p>

        `;


        container.appendChild(card);

    });


    displayProfileAchievements();

}


// ================= PROFILE ACHIEVEMENTS =================

function displayProfileAchievements() {

    const container =
        document.getElementById(
            "profileAchievements"
        );


    container.innerHTML = "";


    achievements.forEach(function(achievement) {

        if (
            user.achievements.includes(
                achievement.id
            )
        ) {

            const item =
                document.createElement("div");


            item.className =
                "achievement";


            item.innerHTML = `

                <div class="achievement-icon">

                    ${achievement.icon}

                </div>

                <h3>

                    ${achievement.name}

                </h3>

            `;


            container.appendChild(item);

        }

    });

}


// ================= ACTIVITY =================

function displayActivity() {

    const container =
        document.getElementById(
            "activityList"
        );


    container.innerHTML = "";


    if (user.activity.length === 0) {

        container.innerHTML = `

            <div class="empty-activity">

                No activity yet.

                Solve your first problem!

            </div>

        `;

        return;

    }


    user.activity
        .slice()
        .reverse()
        .slice(0, 5)
        .forEach(function(item) {

            const div =
                document.createElement("div");


            div.className =
                "activity";


            div.innerHTML = `

                <span>

                    ${item.icon}

                    ${item.message}

                </span>

                <small>

                    ${item.date}

                </small>

            `;


            container.appendChild(div);

        });

}


// ================= DAILY CHALLENGE =================

function displayDailyChallenge() {

    const challenge =
        problems[0];


    const solved =
        solvedProblems.includes(
            challenge.id
        );


    const container =
        document.getElementById(
            "dailyChallenge"
        );


    container.innerHTML = `

        <div>

            <span class="difficulty easy">

                EASY

            </span>


            <h2>

                ${challenge.name}

            </h2>


            <p>

                ${challenge.topic}

                •

                ${challenge.xp} XP

            </p>

        </div>


        <button
            onclick="
                solveProblem(${challenge.id})
            "
            ${solved ? "disabled" : ""}
        >

            ${
                solved
                ? "Solved ✓"
                : "Solve"
            }

        </button>

    `;

}


// ================= LEADERBOARD =================

function updateLeaderboard() {

    const players = [

        ...otherPlayers,

        {
            name: user.name,
            xp: user.xp,
            current: true
        }

    ];


    players.sort(function(a, b) {

        return b.xp - a.xp;

    });


    const container =
        document.getElementById(
            "leaderboardList"
        );


    container.innerHTML = "";


    players.forEach(function(player, index) {

        const div =
            document.createElement("div");


        div.className =
            player.current
            ? "player current"
            : "player";


        let rank = index + 1;


        let medal = "";


        if (rank === 1) medal = "🥇";

        else if (rank === 2) medal = "🥈";

        else if (rank === 3) medal = "🥉";


        div.innerHTML = `

            <span>

                ${medal}

                ${rank}. ${player.name}

            </span>


            <strong>

                ${player.xp} XP

            </strong>

        `;


        container.appendChild(div);

    });

}


// ================= POPUPS =================

function showLevelUp(level) {

    document
        .getElementById("newLevel")
        .innerText =
        "Level " + level;


    document
        .getElementById("levelUpPopup")
        .classList.remove("hidden");

}


function closeLevelPopup() {

    document
        .getElementById("levelUpPopup")
        .classList.add("hidden");

}


function showAchievement(achievement) {

    document
        .getElementById(
            "achievementPopupIcon"
        )
        .innerText =
        achievement.icon;


    document
        .getElementById(
            "achievementPopupName"
        )
        .innerText =
        achievement.name;


    document
        .getElementById(
            "achievementPopupDescription"
        )
        .innerText =
        achievement.description;


    document
        .getElementById(
            "achievementPopup"
        )
        .classList.remove("hidden");

}


function closeAchievementPopup() {

    document
        .getElementById(
            "achievementPopup"
        )
        .classList.add("hidden");

}