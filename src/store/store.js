import { reactive } from 'vue';

import {quizz} from '../assets/quizz.js';

export const store = reactive({
	quizz,
	points: 0,
	actualStep: 0,
	isRight: true,
	isReponseVisible: false,
	isClickableChoice: false,
	storedGoodAnswer: "",
	stepIsInitiated: false,
	isReponseClickedState: false,
	isClickEnabeled: false,
});