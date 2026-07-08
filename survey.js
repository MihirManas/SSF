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
const popularRoles = {
    'Computer Science': [
        { name: 'Data Analyst', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b76ff" stroke-width="2"><path d="M12 20V10M18 20V4M6 20v-4"/></svg>' },
        { name: 'Data Scientist', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff7a00" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><path d="M9 9h6v6H9z"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg>' },
        { name: 'Machine Learning Engineer', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b14cff" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>' },
        { name: 'Backend Developer', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00e676" stroke-width="2"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/></svg>' },
        { name: 'Frontend Developer', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff1493" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M3 9h18M9 21V9"/></svg>' },
        { name: 'Product Manager', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffd700" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>' },
        { name: 'UX Designer', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>' },
        { name: 'Business Analyst', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b76ff" stroke-width="2"><path d="M12 20V10M18 20V4M6 20v-4"/></svg>' }
    ],
    'Electronics': [
        { name: 'Embedded Engineer', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff7a00" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><path d="M9 9h6v6H9z"/></svg>' },
        { name: 'VLSI Engineer', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b14cff" stroke-width="2"><path d="M2 12h20M12 2v20"/></svg>' },
        { name: 'Network Engineer', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00e676" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>' },
        { name: 'Software Engineer', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00e676" stroke-width="2"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/></svg>' }
    ],
    'Mechanical': [
        { name: 'Design Engineer', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff1493" stroke-width="2"><path d="m12 19-7-7 3-3 7 7-3 3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/></svg>' },
        { name: 'Manufacturing Engineer', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffd700" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>' },
        { name: 'Data Analyst', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b76ff" stroke-width="2"><path d="M12 20V10M18 20V4M6 20v-4"/></svg>' },
        { name: 'Supply Chain Analyst', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" stroke-width="2"><path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" y1="12" x2="16" y2="12"/></svg>' }
    ],
    'Civil': [
        { name: 'Structural Engineer', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b76ff" stroke-width="2"><path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"/></svg>' },
        { name: 'Project Manager', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffd700" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>' },
        { name: 'Data Analyst', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b76ff" stroke-width="2"><path d="M12 20V10M18 20V4M6 20v-4"/></svg>' }
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
    renderPopularRoles();
}

function renderPopularRoles() {
    const grid = document.getElementById('popular-roles-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    const roles = popularRoles[surveyData.branch] || popularRoles['Computer Science'];
    roles.forEach(roleData => {
        const btn = document.createElement('button');
        btn.className = 'role-card-btn';
        if (surveyData.roles.includes(roleData.name)) {
            btn.classList.add('selected');
        }
        
        btn.innerHTML = `
            <div class="role-card-icon">${roleData.icon}</div>
            <span>${roleData.name}</span>
        `;
        
        btn.onclick = () => {
            if (surveyData.roles.includes(roleData.name)) {
                removeRole(roleData.name);
            } else {
                addRole(roleData.name);
            }
            renderPopularRoles(); // Re-render to update selected state
        };
        
        grid.appendChild(btn);
    });
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

        const defaultSuggestions = (popularRoles[surveyData.branch] || popularRoles['Computer Science']).map(r => r.name);
        const matched = defaultSuggestions.filter(role => role.toLowerCase().includes(val) && !surveyData.roles.includes(role));
        
        suggestionsBox.style.display = 'block';
        if (matched.length > 0) {
            matched.forEach(role => {
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.innerText = role;
                div.onclick = () => addRole(role);
                suggestionsBox.appendChild(div);
            });
        }
        
        const exactMatch = matched.find(r => r.toLowerCase() === val);
        if (!exactMatch) {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            div.style.borderTop = matched.length > 0 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none';
            div.innerHTML = `<em>Add custom role:</em> <strong>"${this.value}"</strong>`;
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
    
    // Show loading state on the button
    const submitBtn = document.querySelector('.step.active .primary-btn');
    const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';
    if (submitBtn) {
        submitBtn.innerHTML = 'Submitting... <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spinner"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>';
        submitBtn.disabled = true;
    }
    
    console.log("Survey Completed:", surveyData);
    
    const surveyURL = "https://script.google.com/macros/s/AKfycbwkGFMnP14uHRsPIeAdYTCF6CJh-vx97mFIBgyb6cXYWjjD6mnEvnhgfxgTB7Oln5y4jw/exec";
    const formData = new URLSearchParams();
    formData.append("data", JSON.stringify(surveyData));

    fetch(surveyURL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
    }).then(() => {
        // Hide header
        const header = document.querySelector('.survey-header');
        if (header) {
            header.style.display = 'none';
        }
        
        // Show thank you step
        showStep(8);
    }).catch(error => {
        console.error("Error saving survey:", error);
        alert("There was an error submitting your survey. Please try again.");
        if (submitBtn) {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}
