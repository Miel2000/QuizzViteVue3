<script setup>
import { quizz } from "../assets/quizz.js";
import { computed, onMounted, ref, inject } from "vue";

import gsap from 'gsap';

const store = inject("STORE");

const actualStep = ref(0);
const show = ref(false);
const isResultatVisible = ref(false);
const isReponseClickedState = ref(false);

const stateQuestionVisibility = ref(false);
const stateReponseVisibility = ref(true);

const actualBonneReponse = computed(() => quizz[actualStep.value].bonneReponse )
const points = ref(0);

const stepIsInitiated = ref(false);

onMounted(() => {
	setTimeout(() => {
		stepIsInitiated.value = true
	}, 1000);
})

function handleClickNextStep() {
	updateActualStep()
	stepIsInitiated.value = false;
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
	
	stepIsInitiated.value = false;

	setTimeout(() => {

		if(actualStep.value < quizz.length - 1) {
			actualStep.value++
		}  else {
			actualStep.value = 0;
			isResultatVisible.value = true;
		}

		stepIsInitiated.value = true;

	}, 1000);
}

function verificationReponse(reponse) {
	if(reponse === actualBonneReponse.value) {
		console.log("Bien ouéj poto");
		store.points += 5
	} else {
		console.log('Raté');
	}
}

function colorReponses(stateColorReponse) {
	isReponseClickedState.value = stateColorReponse;
}

function onEnter(el, done) {
	console.log('onEnter: ', el, done)
  gsap.fromTo(el, 
	{ opacity: 0,transform:'translateY(20px)', onComplete: done},
	{ opacity: 1,transform:'translateY(0px)', duration: 1 });
}
function onLeave(el, done) {
	console.log('onLeave: ', el, done)
  gsap.to(el, 
	{ opacity: 0,transform:'translateY(20px)', onComplete: done, duration: 1});
}


</script>

<template>
	<div class="quizz-container">

		<div class="question-container">
			<Transition name="animquestion">
				<p v-show="stepIsInitiated">{{ quizz[actualStep].question }}</p>
			</Transition>
		</div>

		<div class="reponses-container">
			<TransitionGroup
			name="list"
			tag="span"
			@enter="onEnter"
			@leave="onLeave"
			>
				
					<p	v-if="stepIsInitiated"
						v-for="reponse, index in quizz[actualStep].reponses"
						class="reponse"
						@click="handleClickReponse(reponse)"
						:key="reponse"
					> {{ reponse }} 
						<span
							class="bg-reponse"
							:class="{ 
							'bonne-reponse' : reponse === quizz[actualStep].bonneReponse,
							'mauvaise-reponse' : reponse !== quizz[actualStep].bonneReponse,
							'active' : isReponseClickedState,
						}"
						></span>
					</p>
				

			</TransitionGroup>
		</div>

		<div class="resultat-container">
			Résultat : {{ store.points }}
		</div>

		<button class="btn-nextstep" @click="handleClickNextStep">
			Question suivante
		</button>

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

.question-container {
	text-align: center;
	border: 1px solid blue;
	height: 50px;
}

.reponses-container {
	height: 200px;

	span {
		border: 1px solid blue;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
	}
}

// .reponse {
// 	position: relative;
// }

// .bg-reponse {
// 	position: absolute;
// 	display: flex;
// 	z-index: -5;
// 	left: 50%;
// 	height: 0%;
// 	bottom: 0;
// 	background-color: red;
// 	transform: translateX(-50%);
// 	width: calc(100% + 10px);
// 	&.active {
// 		// transition: height 0.25s;
// 		height: 100%;
// 	}
// }

// .bonne-reponse {
// 	background-color: green;

// }
// .mauvaise-reponse {
// 	background-color:red;
// }

.resultat-container {
	position: absolute;
	top: 70px;
	right: 20px;
	border: solid 1px black;
	padding:5px;
}
.btn-nextstep {
	position: absolute;
	top: 110px;
	right: 20px;
	border: solid 1px black;
	padding:5px;
}
.quizz-container {
	margin: 0 auto;
}

button {
	width: fit-content;
	margin: 0 auto;
}

// Transitions 
// QUESTION 

.animquestion-enter-from {
	transform:translateY(-20px);
	opacity:0;
}

.animquestion-enter-to {
	opacity:1;
	transform:translateY(0px);
}

.animquestion-enter-active, .animquestion-leave-active {
	transition: transform 0.35s ease-out, opacity 0.50s;
}

.animquestion-leave-from {
	opacity: 1;
	transform:translateY(0px);
}
.animquestion-leave-to {
	transform:translateY(20px);
	opacity: 0;
}






// .list-enter-active,
// .list-leave-active {
// 	transition: opacity 1.75s ease;
// }

// .list-enter-from,
// .list-leave-to {
// 	opacity: 0;
// }

// REPONSE

</style>
