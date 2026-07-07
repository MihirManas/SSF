const TOTAL_STEPS = 7;
let currentStep = 1;

const surveyData = {
    branch: '',
    roles: [],
    confidence: null,
    companiesApplied: 0,
    problems: [],
    exactProblem: ''
};

// Roles suggestions based on branch
const roleSuggestions = {
    'Computer Science': [
        'Software Engineer', 'Frontend Developer', 'Backend Developer', 
        'Full Stack Developer', 'Data Scientist', 'AI/ML Engineer', 
        'DevOps Engineer', 'Product Manager'
    ],
    'Electronics': [
        'Embedded Systems Engineer', 'VLSI Design Engineer', 'Network Engineer',
        'Hardware Engineer', 'IoT Engineer', 'Software Engineer', 'Systems Engineer'
    ],
    'Mechanical': [
        'Design Engineer', 'Manufacturing Engineer', 'Thermal Engineer',
        'Automotive Engineer', 'Robotics Engineer', 'Supply Chain Analyst'
    ],
    'Civil': [
        'Structural Engineer', 'Site Engineer', 'Project Manager',
        'Urban Planner', 'Geotechnical Engineer', 'Transportation Engineer'
    ]
};

// Navigation
function updateProgress() {
    const progressText = document.getElementById('current-step-num');
    const progressBar = document.getElementById('progress-bar');
    
    if (progressText && progressBar) {
        progressText.innerText = currentStep;
        progressBar.style.width = `${(currentStep / TOTAL_STEPS) * 100}%`;
    }
}

function showStep(stepNum) {
    document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));
    document.getElementById(`step-${stepNum}`).classList.add('active');
    currentStep = stepNum;
    
    if (stepNum <= TOTAL_STEPS) {
        updateProgress();
    }
}

function nextStep(stepNum) {
    showStep(stepNum);
}

function prevStep(stepNum) {
    showStep(stepNum);
}

// Step 2: Branch Selection
function selectBranch(branchName, nextStepNum) {
    surveyData.branch = branchName;
    nextStep(nextStepNum);
    
    // Reset roles when branch changes
    surveyData.roles = [];
    updateSelectedRolesUI();
}

// Step 3: Target Roles
const roleInput = document.getElementById('role-input');
const suggestionsBox = document.getElementById('role-suggestions');
const selectedRolesBox = document.getElementById('selected-roles');
const btnNext3 = document.getElementById('btn-next-3');

if (roleInput) {
    roleInput.addEventListener('input', function() {
        const val = this.value.toLowerCase();
        suggestionsBox.innerHTML = '';
        
        if (!val) {
            suggestionsBox.style.display = 'none';
            return;
        }

        const defaultSuggestions = roleSuggestions[surveyData.branch] || roleSuggestions['Computer Science'];
        const matched = defaultSuggestions.filter(role => role.toLowerCase().includes(val) && !surveyData.roles.includes(role));
        
        if (matched.length > 0) {
            suggestionsBox.style.display = 'block';
            matched.forEach(role => {
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.innerText = role;
                div.onclick = () => addRole(role);
                suggestionsBox.appendChild(div);
            });
        } else {
            // Option to add custom
            suggestionsBox.style.display = 'block';
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            div.innerText = `Add "${this.value}"`;
            div.onclick = () => addRole(this.value);
            suggestionsBox.appendChild(div);
        }
    });

    // Close suggestions on outside click
    document.addEventListener('click', (e) => {
        if (e.target !== roleInput && e.target !== suggestionsBox) {
            suggestionsBox.style.display = 'none';
        }
    });
    
    // Add on enter
    roleInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.value.trim() !== '') {
            addRole(this.value.trim());
        }
    });
}

function addRole(role) {
    if (!surveyData.roles.includes(role)) {
        surveyData.roles.push(role);
        updateSelectedRolesUI();
    }
    if (roleInput) {
        roleInput.value = '';
        suggestionsBox.style.display = 'none';
    }
}

function removeRole(role) {
    surveyData.roles = surveyData.roles.filter(r => r !== role);
    updateSelectedRolesUI();
}

function updateSelectedRolesUI() {
    if (!selectedRolesBox) return;
    
    selectedRolesBox.innerHTML = '';
    surveyData.roles.forEach(role => {
        const span = document.createElement('span');
        span.className = 'role-tag';
        span.innerHTML = `${role} <span class="remove-tag" onclick="removeRole('${role}')">&times;</span>`;
        selectedRolesBox.appendChild(span);
    });
    
    if (btnNext3) {
        btnNext3.disabled = surveyData.roles.length === 0;
    }
}

// Step 4: Confidence
function selectConfidence(level, nextStepNum) {
    surveyData.confidence = level;
    
    // visual feedback
    const btns = document.querySelectorAll('.emoji-btn');
    btns.forEach(btn => btn.style.borderColor = 'rgba(255, 255, 255, 0.08)');
    
    // Select the clicked one visually before moving on
    event.currentTarget.style.borderColor = '#3b76ff';
    
    setTimeout(() => {
        nextStep(nextStepNum);
    }, 300);
}

// Step 5: Companies Slider
const slider = document.getElementById('companies-slider');
const bubble = document.getElementById('slider-bubble');

if (slider && bubble) {
    slider.addEventListener('input', updateSliderUI);
    // Initialize
    updateSliderUI();
}

function updateSliderUI() {
    const val = slider.value;
    surveyData.companiesApplied = parseInt(val);
    
    bubble.innerText = val == 500 ? '500+' : val;
    
    // Calculate position
    const min = slider.min ? slider.min : 0;
    const max = slider.max ? slider.max : 500;
    const newVal = Number(((val - min) * 100) / (max - min));
    
    // Adjust slightly so bubble centers over thumb
    bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
    
    // Update track color
    slider.style.background = `linear-gradient(to right, var(--primary-blue) 0%, var(--primary-blue) ${newVal}%, var(--card-bg) ${newVal}%, var(--card-bg) 100%)`;
}

// Step 6: Biggest Problems
function toggleProblem(btnElement) {
    const problem = btnElement.innerText;
    
    if (surveyData.problems.includes(problem)) {
        surveyData.problems = surveyData.problems.filter(p => p !== problem);
        btnElement.classList.remove('selected');
    } else {
        surveyData.problems.push(problem);
        btnElement.classList.add('selected');
    }
    
    const btnNext6 = document.getElementById('btn-next-6');
    if (btnNext6) {
        btnNext6.disabled = surveyData.problems.length === 0;
    }
}

// Step 7: Submit
function submitSurvey() {
    const exactProb = document.getElementById('exact-problem');
    if (exactProb) {
        surveyData.exactProblem = exactProb.value;
    }
    
    console.log("Survey Completed:", surveyData);
    
    // Hide header
    const header = document.querySelector('.survey-header');
    if (header) {
        header.style.display = 'none';
    }
    
    // Show thank you step
    showStep(8);
}
