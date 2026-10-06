// ================= SAVE =================

function saveData() {

    localStorage.setItem(

        "codequestUser",

        JSON.stringify(user)

    );


    localStorage.setItem(

        "codequestSolved",

        JSON.stringify(solvedProblems)

    );

}


// ================= LOAD =================

function loadData() {

    const savedUser =
        localStorage.getItem(
            "codequestUser"
        );


    const savedProblems =
        localStorage.getItem(
            "codequestSolved"
        );


    if (savedUser) {

        user =
            JSON.parse(savedUser);

    }


    if (savedProblems) {

        solvedProblems =
            JSON.parse(savedProblems);

    }

}


// ================= RESET =================

function clearSavedData() {

    localStorage.removeItem(
        "codequestUser"
    );


    localStorage.removeItem(
        "codequestSolved"
    );

}