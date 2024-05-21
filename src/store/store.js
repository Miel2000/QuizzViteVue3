import { reactive } from 'vue';

import {quizz} from '../assets/quizz.js';

export const store = reactive({
	quizz,
	points: 0,
	actualStep: 0,
	isRight: true,
	isReponseVisible: true,
	isClickableChoice: true,
	storedGoodAnswer: "",
	stepIsInitiated: true,
	isReponseClickedState: false,
	isClickEnabeled: false,
});