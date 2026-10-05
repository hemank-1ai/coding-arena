// ================= FILTER =================

let selectedDifficulty = "all";


// ================= SOLVE PROBLEM =================

function solveProblem(problemId) {

    const problem =
        problems.find(function(problem) {

            return problem.id === problemId;

        });


    if (!problem) {

        return;

    }


    if (
        solvedProblems.includes(problemId)
    ) {

        return;

    }


    const oldLevel =
        user.level;


    solvedProblems.push(problemId);


    user.xp += problem.xp;


    user.solved++;


    user.level =
        Math.floor(user.xp / 100) + 1;


    updateStreak();


    user.activity.push({

        icon: "✅",

        message:
            "Solved " + problem.name,

        date:
            new Date().toLocaleDateString()

    });


    checkAchievements();


    saveData();


    updateUI();


    if (
        user.level > oldLevel
    ) {

        showLevelUp(
            user.level
        );

    }

}


// ================= STREAK =================

function updateStreak() {

    const today =
        new Date();


    const todayString =
        today.toDateString();


    if (!user.lastSolvedDate) {

        user.streak = 1;

        user.lastSolvedDate =
            todayString;

        return;

    }


    const lastDate =
        new Date(
            user.lastSolvedDate
        );


    const difference =
        today.getTime() -
        lastDate.getTime();


    const oneDay =
        1000 * 60 * 60 * 24;


    const days =
        Math.floor(
            difference / oneDay
        );


    if (days === 0) {

        return;

    }


    if (days === 1) {

        user.streak++;

    }

    else {

        user.streak = 1;

    }


    user.lastSolvedDate =
        todayString;

}


// ================= ACHIEVEMENTS =================

function checkAchievements() {

    achievements.forEach(function(achievement) {

        const unlocked =
            user.achievements.includes(
                achievement.id
            );


        if (
            !unlocked &&
            achievement.condition()
        ) {

            user.achievements.push(
                achievement.id
            );


            user.activity.push({

                icon:
                    achievement.icon,

                message:
                    "Unlocked " +
                    achievement.name,

                date:
                    new Date()
                        .toLocaleDateString()

            });


            saveData();


            showAchievement(
                achievement
            );

        }

    });

}


// ================= DIFFICULTY FILTER =================

function setDifficulty(difficulty) {

    selectedDifficulty =
        difficulty;


    applyFilters();

}


// ================= SEARCH =================

function applyFilters() {

    const input =
        document
            .getElementById(
                "searchInput"
            )
            .value
            .toLowerCase();


    const filtered =
        problems.filter(function(problem) {

            const matchesSearch =

                problem.name
                    .toLowerCase()
                    .includes(input)

                ||

                problem.topic
                    .toLowerCase()
                    .includes(input);


            const matchesDifficulty =

                selectedDifficulty === "all"

                ||

                problem.difficulty ===
                selectedDifficulty;


            return (
                matchesSearch &&
                matchesDifficulty
            );

        });


    displayProblems(filtered);

}


// ================= CHANGE NAME =================

function changeName() {

    const input =
        document.getElementById(
            "nameInput"
        );


    const newName =
        input.value.trim();


    if (newName === "") {

        alert(
            "Please enter a name."
        );

        return;

    }


    user.name =
        newName;


    input.value = "";


    saveData();

    updateUI();


    alert(
        "Name updated successfully!"
    );

}


// ================= RESET =================

function resetProgress() {

    const confirmed =
        confirm(
            "Are you sure you want to reset all progress?"
        );


    if (!confirmed) {

        return;

    }


    clearSavedData();


    location.reload();

}


// ================= START APPLICATION =================

loadData();

updateUI();