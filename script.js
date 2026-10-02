// ================= USER DATA =================

let xp = 650;
let solved = 42;
let level = 7;


// ================= PROBLEMS =================

const problems = [

    {
        id: 1,
        name: "Two Sum",
        difficulty: "easy",
        topic: "Arrays",
        xp: 50
    },

    {
        id: 2,
        name: "Binary Search",
        difficulty: "easy",
        topic: "Binary Search",
        xp: 50
    },

    {
        id: 3,
        name: "Valid Parentheses",
        difficulty: "easy",
        topic: "Stack",
        xp: 50
    },

    {
        id: 4,
        name: "Longest Substring Without Repeating Characters",
        difficulty: "medium",
        topic: "Sliding Window",
        xp: 100
    },

    {
        id: 5,
        name: "3Sum",
        difficulty: "medium",
        topic: "Two Pointers",
        xp: 100
    },

    {
        id: 6,
        name: "Word Ladder",
        difficulty: "hard",
        topic: "Graphs",
        xp: 200
    }

];


// ================= SOLVED PROBLEMS =================

// We store IDs of problems that have already been solved.

let solvedProblems = [];


// ================= PAGE NAVIGATION =================

function showPage(pageName) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {

        page.classList.add("hidden");

    });


    document
        .getElementById(pageName)
        .classList.remove("hidden");
}


// ================= DISPLAY PROBLEMS =================

function displayProblems(problemArray) {

    const container =
        document.getElementById("problemList");


    container.innerHTML = "";


    problemArray.forEach(function(problem) {

        const card =
            document.createElement("div");

        card.className = "problem-card";


        let alreadySolved =
            solvedProblems.includes(problem.id);


        card.innerHTML = `

            <div>

                <span class="difficulty ${problem.difficulty}">
                    ${problem.difficulty.toUpperCase()}
                </span>

                <h2>${problem.name}</h2>

                <p>
                    ${problem.topic}
                    • ${problem.xp} XP
                </p>

            </div>


            <button
                onclick="solveProblem(${problem.id})"
                ${alreadySolved ? "disabled" : ""}
            >

                ${alreadySolved ? "Solved ✓" : "Solve"}

            </button>

        `;


        container.appendChild(card);

    });
}


// ================= SOLVE PROBLEM =================

function solveProblem(problemId) {

    // Find the problem

    const problem =
        problems.find(function(problem) {

            return problem.id === problemId;

        });


    // Prevent solving the same problem twice

    if (solvedProblems.includes(problemId)) {

        alert("You already solved this problem!");

        return;
    }


    // Add the problem to solved list

    solvedProblems.push(problemId);


    // Increase XP

    xp += problem.xp;


    // Increase solved count

    solved += 1;


    // Update everything

    updateStats();


    // Refresh problem list

    displayProblems(problems);


    alert(
        "🎉 Problem solved!\n\n+" +
        problem.xp +
        " XP"
    );
}


// ================= UPDATE STATS =================

function updateStats() {

    document.getElementById("xp").innerText = xp;

    document.getElementById("solved").innerText =
        solved;

    document.getElementById("profileXP").innerText =
        xp;

    document.getElementById("profileSolved").innerText =
        solved;

    document.getElementById("leaderboardXP").innerText =
        xp + " XP";


    // Progress towards next level

    let progress =
        (xp % 1000) / 1000 * 100;


    document.getElementById("progressBar")
        .style.width = progress + "%";


    document.getElementById("progressText")
        .innerText =
        (xp % 1000) + " / 1000 XP";


    // Level

    level =
        Math.floor(xp / 100) + 1;


    document.getElementById("level")
        .innerText = level;
}


// ================= FILTER PROBLEMS =================

function filterProblems(difficulty) {

    if (difficulty === "all") {

        displayProblems(problems);

        return;
    }


    const filtered =
        problems.filter(function(problem) {

            return problem.difficulty === difficulty;

        });


    displayProblems(filtered);
}


// ================= INITIAL LOAD =================

displayProblems(problems);

updateStats();