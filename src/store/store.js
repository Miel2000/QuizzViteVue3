import { reactive } from 'vue';

import questions from '../assets/questions.js';

export const store = reactive({

	questions,
	points:0,
	isRight: false,
	isReponseVisible: false,
	isClickableChoice: true,

})