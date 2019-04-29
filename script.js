// TODO(you): Write the JavaScript necessary to complete the homework.

// You can access the RESULTS_MAP from "constants.js" in this file since
// "constants.js" has been included before "script.js" in index.html.

function is_All_Checked() {
	if(status_list[0] !== undefined && status_list[1] !== undefined && status_list[2] !== undefined) {
		if(status_list[1] === status_list[2]){
			return status_list[1];
		}
			return status_list[0];

	}
	return null;
}

function Set_Checked(status) {
	const qID = '[data-question-id="'+status.dataset.questionId+'"]';
	const qbox = document.querySelectorAll(qID);
	for(const question_x of qbox) {
		question_x.children[1].src = UNCHECK_IMG;
		question_x.classList.remove('checked');
		question_x.classList.add('unchecked');
	}
	status.classList.replace('unchecked', 'checked');
	status.children[1].src = CHECK_IMG;
	if(status.dataset.questionId==='one'){
		status_list[0]=status.dataset.choiceId;
	}
	else if(status.dataset.questionId==='two'){
		status_list[1]=status.dataset.choiceId;
	}
	else if(status.dataset.questionId==='three'){
		status_list[2]=status.dataset.choiceId;
	}
}

function restartQuiz(){
	const a = document.querySelector('article');
	a.lastChild.children[2].removeEventListener('click', restartQuiz);
	for(let i=0; i<3; i++) {
		a.lastChild.removeChild(a.lastChild.children[0]);
		delete status_list[i];
	}
	a.removeChild(a.lastChild);
	for(const box of picture_list){
		box.children[1].src = UNCHECK_IMG;
		box.classList.remove('unchecked');
		box.classList.remove('checked');
		box.addEventListener('click', change_checked);
	}
	document.getElementById('author').scrollIntoView();
}

function displayResult(result){
	const articleContainer = document.querySelector('article');
	const rSection = document.createElement('section');
	rSection.classList.add('result');
	articleContainer.appendChild(rSection);
	const resultContainer = document.querySelector('.result');

	const header = document.createElement('h1');
		header.textContent = 'You got: ' + RESULTS_MAP[result].title;

	const content = document.createElement('p');
		content.textContent = RESULTS_MAP[result].contents;

	const resultButton = document.createElement('button');
	resultButton.textContent = 'Restart quiz';
	resultButton.addEventListener('click', restartQuiz);

	resultContainer.appendChild(header);
	resultContainer.appendChild(content);
	resultContainer.appendChild(resultButton);
}

function change_checked(event) {
	Set_Checked(event.currentTarget);

	const result = is_All_Checked();
	if(result) {
		for(const box of picture_list) {
			box.removeEventListener('click', change_checked);
		}
		displayResult(result);
	}
}

const UNCHECK_IMG = 'images/unchecked.png';
const CHECK_IMG = 'images/checked.png';

const status_list={};

const picture_list = document.querySelectorAll('.choice-grid div');
for(const box of picture_list){
	box.addEventListener('click', change_checked);
}
