
// Labels and coordinates
// Labels and coordinates
const labels = [
    { name: "Engine", coords: [816, 316, 1027, 410] },
    { name: "Main Alternator", coords: [671, 395, 708, 426] },
    { name: "Air Compressor", coords: [1235, 338, 1277, 428] },
    { name: "HEP Plant", coords: [1448, 300, 1518, 387] },
    { name: "Accessory Rack", coords: [1203, 300, 1224, 332] },
    { name: "Main Radiator", coords: [1093, 218, 1355, 264] },
    { name: "HEP Radiator", coords: [1430, 221, 1514, 263] },
    { name: "Inertial Filter Blower", coords: [646, 206, 685, 256] },
    { name: "Fuel Tank", coords: [643, 471, 922, 532] },
    { name: "High Voltage Cabinet", coords: [528, 250, 567, 331] },
    { name: "Battery Box", coords: [300, 378, 367, 429] },
    { name: "Dynamic Brake Assy.", coords: [935, 206, 991, 237] },
    { name: "Air Dryer", coords: [1101, 438, 1133, 483] },
    { name: "Silencer", coords: [712, 196, 769, 250] },
    { name: "Cooling Fan", coords: [1079, 183, 1374, 205] },
    { name: "HEP Cooling Fan", coords: [1425, 183, 1529, 209] },
    { name: "Coupler, Rear", coords: [1553, 461, 1610, 500] },
    { name: "Coupler, Front", coords: [127, 463, 183, 504] },
    { name: "GP Truck, Front", coords: [370, 475, 490, 545] },
    { name: "GP Truck, Rear", coords: [1266, 478, 1356, 542] },
    { name: "Main Air Reservoir", coords: [765, 440, 1055, 463] },
    { name: "HEP Start Reservoir", coords: [990, 471, 1054, 535] },
    { name: "HV Cabinet Air Filter", coords: [526, 333, 559, 407] },
    { name: "Air Brake Equipment", coords: [372, 378, 521, 428] },
    { name: "Horn", coords: [330, 180, 394, 207] },
    { name: "Snow Plow, Front", coords: [145, 508, 188, 549] },
    { name: "Snow Plow, Rear", coords: [1544, 506, 1587, 549] },
    { name: "Air Conditioner", coords: [396, 181, 476, 205] },
    { name: "Headlight, Front", coords: [314, 216, 335, 250] },
    { name: "Headlight, Rear", coords: [1568, 216, 1586, 258] },
    { name: "Sand Box Filler, Front", coords: [209, 276, 242, 303] },
    { name: "Sand Box Filler, Rear", coords: [1553, 194, 1579, 207] },
    { name: "Sand Nozzle", coords: [1423, 516, 1480, 551] },
    { name: "Sand Box", coords: [1525, 308, 1575, 336] },
    { name: "Aux. Generator", coords: [670, 281, 716, 384] },
    { name: "Generator / TM Blower", coords: [597, 332, 646, 404] },
    { name: "Engine Air Filter Housing", coords: [590, 271, 618, 327] },
    { name: "Carbody Inertial Filter", coords: [577, 208, 615, 258] },
    { name: "Governor", coords: [1080, 282, 1096, 335] },
    { name: "Starting Motor", coords: [757, 404, 789, 432] },
    { name: "Engine Water Tank", coords: [1111, 277, 1153, 320] },
    { name: "Lube Oil Cooler Assy.", coords: [1168, 287, 1196, 328] },
    { name: "Lube Oil Filter Assy.", coords: [1165, 336, 1208, 374] },
    { name: "Lube Oil Strainer Assy.", coords: [1080, 378, 1109, 421] },
    { name: "Fuel Pump", coords: [1119, 373, 1161, 393] },
    { name: "Fuel Filter Assy.", coords: [1216, 341, 1229, 401] },
    { name: "HEP Compartment Partition", coords: [1306, 276, 1322, 329] },
    { name: "HEP Engine Water Tank", coords: [1390, 211, 1407, 270] },
    { name: "HEP Control Cabinet", coords: [1329, 303, 1367, 364] },
    { name: "HEP Relay Cabinet", coords: [1385, 282, 1444, 317] },
    { name: "Hand Brake", coords: [257, 341, 295, 437] },
    { name: "Layover Heater", coords: [1289, 330, 1316, 416] },
    { name: "Access Door", coords: [344, 237, 367, 269] },
];




let currentIndex = 0;
const missedLabels = []; // Track missed labels
let correctCount = 0;
let incorrectCount = 0;

// Shuffle the labels array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Shuffle labels before starting the quiz
shuffle(labels);

// Set the initial question
function setQuestion() {
    if (currentIndex < labels.length) {
        document.getElementById("question").textContent = `Click on: ${labels[currentIndex].name}`;
    } else {
        endQuiz();
    }
}

// Add a highlight for correct or incorrect answers
function addHighlight(coords, container, color, label = null) {
    const diagram = document.getElementById("diagram");
    const scaleX = diagram.clientWidth / diagram.naturalWidth;
    const scaleY = diagram.clientHeight / diagram.naturalHeight;

    const x1 = coords[0] * scaleX;
    const y1 = coords[1] * scaleY;
    const x2 = coords[2] * scaleX;
    const y2 = coords[3] * scaleY;

    const highlight = document.createElement("div");
    highlight.classList.add("highlight");
    highlight.style.left = `${x1}px`;
    highlight.style.top = `${y1}px`;
    highlight.style.width = `${x2 - x1}px`;
    highlight.style.height = `${y2 - y1}px`;
    highlight.style.borderColor = color;
    highlight.style.backgroundColor = color === "green" ? "rgba(0, 255, 0, 0.2)" : "rgba(255, 0, 0, 0.2)";

    if (label) {
        highlight.addEventListener("mouseover", () => {
            label.style.display = "block";
            label.style.left = `${x2 + 5}px`; // Position label to the right of the highlight
            label.style.top = `${y1}px`; // Align vertically
        });
        highlight.addEventListener("mouseout", () => {
            label.style.display = "none";
        });
    }

    container.appendChild(highlight);
    return highlight; // Return the highlight for additional controls
}

// End the quiz and display the summary
function endQuiz() {
    const questionElement = document.getElementById("question");
    const feedbackElement = document.getElementById("feedback");
    const diagramContainer = document.getElementById("diagram-container");

    const score = ((correctCount / labels.length) * 100).toFixed(2); // Calculate score percentage

    questionElement.textContent = "Quiz Completed!";
    feedbackElement.innerHTML = `
        <p>Score: ${score}%</p>
        <p>Correct: ${correctCount}</p>
        <p>Incorrect: ${incorrectCount}</p>
        <p>Missed Labels:</p>
        <ul>
            ${missedLabels
                .map(
                    (label) =>
                        `<li class="missed-label" data-label="${label.name}">${label.name}</li>`
                )
                .join("")}
        </ul>
    `;

    // Highlight missed areas in red when hovered and show labels
    const missedLabelElements = document.querySelectorAll(".missed-label");
    missedLabelElements.forEach((element) => {
        const label = labels.find((l) => l.name === element.dataset.label);
        let tempHighlight = null; // Track the temporary highlight
        let tempLabel = null; // Track the temporary label
        element.addEventListener("mouseover", () => {
            tempHighlight = addHighlight(label.coords, diagramContainer, "red");
            tempLabel = document.createElement("div");
            tempLabel.classList.add("label");
            tempLabel.textContent = label.name;
            tempLabel.style.left = `${tempHighlight.style.left}`;
            tempLabel.style.top = `${parseInt(tempHighlight.style.top) + 20}px`; // Below the highlight
            diagramContainer.appendChild(tempLabel);
        });
        element.addEventListener("mouseout", () => {
            if (tempHighlight) tempHighlight.remove(); // Remove the highlight
            if (tempLabel) tempLabel.remove(); // Remove the label
        });
    });
}

// Start the quiz
setQuestion();

function checkAnswer(isCorrect) {
    const feedback = document.getElementById("feedback");
    const diagramContainer = document.getElementById("diagram-container");
    const currentLabel = labels[currentIndex];

    if (isCorrect) {
        feedback.textContent = "Correct!";
        feedback.style.color = "green";
        correctCount++;

        const label = document.createElement("div");
        label.classList.add("label");
        label.textContent = currentLabel.name;
        label.style.display = "none";

        addHighlight(currentLabel.coords, diagramContainer, "green", label);
        diagramContainer.appendChild(label);
    } else {
        feedback.textContent = "Incorrect! Moving to the next label.";
        feedback.style.color = "red";
        incorrectCount++;
        missedLabels.push(currentLabel);
    }

    currentIndex++;
    setQuestion();
}

const diagram = document.getElementById("diagram");
diagram.addEventListener("click", (event) => {
    const scaleX = diagram.naturalWidth / diagram.clientWidth;
    const scaleY = diagram.naturalHeight / diagram.clientHeight;

    const x = Math.round(event.offsetX * scaleX);
    const y = Math.round(event.offsetY * scaleY);

    const coords = labels[currentIndex].coords;

    // Check if the click is within the bounds
    const isCorrect =
        x >= coords[0] && x <= coords[2] && y >= coords[1] && y <= coords[3];

    checkAnswer(isCorrect);
});
