<script setup>
import { quizz } from "../assets/quizz.js";
import { computed, onMounted, ref } from "vue";

import gsap from 'gsap';

const actualStep = ref(0);
const show = ref(false);
const isResultatVisible = ref(false);
const isReponseClickedState = ref(false);

const stateQuestionVisibility = ref(false);
const stateReponseVisibility = ref(true);

const actualBonneReponse = computed(() => quizz[actualStep.value].bonneReponse )
const points = ref(0);

// besoin d'un variable qui dit "c'est le début"
const stepInitiation = ref(false);




onMounted(() => {
	setTimeout(() => {
		stepInitiation.value = true
	}, 1000);
})

function handleClickNextStep() {
	updateActualStep()
	stepInitiation.value = false;
}

function handleClickReponse(reponse) {
	verificationReponse(reponse)
	colorReponses(true)
	setTimeout(() => {
		handleClickNextStep();
	}, 1000);
}

function updateActualStep() {
	colorReponses(false);
	
	stepInitiation.value = false;

	setTimeout(() => {

		if(actualStep.value < quizz.length - 1) {
			actualStep.value++
		}  else {
			actualStep.value = 0;
			isResultatVisible.value = true;
		}

		stepInitiation.value = true;

	}, 1000);
}

function verificationReponse(reponse) {
	if(reponse === actualBonneReponse.value) {
		console.log("Bien ouéj poto");
		points.value++
	} else {
		console.log('Raté');
	}
}

function colorReponses(stateColorReponse) {
	isReponseClickedState.value = stateColorReponse;
}


</script>

<template>
	<div  v-if="!isResultatVisible" class="quizz-container">

		<div class="question-container">
			<Transition name="animquestion">
				<p v-show="stepInitiation">{{ quizz[actualStep].question }}</p>
			</Transition>

		</div>

		<div class="reponses-container" v-if="stateReponseVisibility">
	
			<div
				v-for="reponse, index in quizz[actualStep].reponses"
				class="reponse"
				@click="handleClickReponse(reponse)"
				:key="reponse"
			>
				{{ reponse }}
				<span 
					class="bg-reponse"
					:class="{ 
					'bonne-reponse' : reponse === quizz[actualStep].bonneReponse,
					'mauvaise-reponse' : reponse !== quizz[actualStep].bonneReponse,
					'active' : isReponseClickedState,
				}"

				></span>
			</div>
		</div>

		<button @click="handleClickNextStep">
			next step
		</button>

	</div>

	<div v-if="isResultatVisible" class="resultat-container">
		<h1>RESULTAT</h1>
	</div>
</template>

<style lang="scss" scoped>


ul {
	margin: 0;
	padding: 0;
	display: flex;
    justify-content: space-evenly;
    width: 100%;
	li {
		list-style:none;
	} 
}

.reponses-container {
    display: flex;
	justify-content: space-evenly;
	align-items: center;
    height: 200px;
}
.reponse {
	position: relative;

}
.bg-reponse {
    position: absolute;
    display: flex;
    z-index: -5;
    left: 50%;
    height: 0%;
    bottom: 0;
    background-color: red;
    transform: translateX(-50%);
    width: calc(100% + 10px);
	&.active {
		transition: height 0.25s;
		height: 100%;
	}
}

.bonne-reponse {
	background-color: green;

}
.mauvaise-reponse {
	background-color:red;
}


.quizz-container {
	justify-content: center;
    text-align: center;
    display: flex;
    flex-direction: column;
}

button {
	width: fit-content;
	margin: 0 auto;
}

// Transitions 
// QUESTION 
.animquestion-enter-active,
.animquestion-leave-active {
  transition: opacity 0.5s ease;
}

.animquestion-enter-from,
.animquestion-leave-to {
  opacity: 0;
}

</style>
