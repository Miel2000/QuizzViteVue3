<script setup>
import { quizz } from "../assets/quizz.js";
import { computed, onMounted, ref, inject } from "vue";
import Reponse from "../components/Reponse.vue";

import gsap from 'gsap';

const store = inject("STORE");

const actualStep = ref(0);
const isResultatVisible = ref(false);
const isReponseClickedState = ref(false);
const stepIsInitiated = ref(false);
const isClickEnabeled = ref(false);

const actualBonneReponse = computed(() => quizz[actualStep.value].bonneReponse )

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
	isClickEnabeled.value = true;
	store.isReponseVisible = true;
	verificationReponse(reponse)
	colorReponses(true)
	setTimeout(() => {
		handleClickNextStep();
		isClickEnabeled.value = false;
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
		store.isReponseVisible = false;

	}, 1000);
}

function verificationReponse(reponse) {
	store.storedGoodAnswer = actualBonneReponse.value;
	if(reponse === actualBonneReponse.value) {
		console.log("Bien ouéj poto");
		store.isRight = true;
		store.points += 5
	} else {
		store.isRight = false;
		console.log('Raté');
	}
}

function colorReponses(stateColorReponse) {
	isReponseClickedState.value = stateColorReponse;
}

function onEnter(el, done) {
	setTimeout(() => {
		gsap.to(el,
			{ 
				opacity: 1,
				filter:'blur(0px)',
				delay:  el.dataset.index   * 0.25,
				duration: 0.75,
				onComplete: done
			});
	}, 950);
}

function onLeave(el, done) {
	gsap.to(el,
		{
			opacity: 0,
			filter:'blur(10px)',
			delay:0.60,
			onComplete: done,
			duration: .55,
		});
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
					:data-index="index"
					@click="handleClickReponse(reponse)"
					:key="reponse"
					:class="{
						'bonne-reponse' : reponse === quizz[actualStep].bonneReponse,
						'mauvaise-reponse' : reponse !== quizz[actualStep].bonneReponse,
						'active' : isReponseClickedState,
						'disabel-click': isClickEnabeled
					}"
				> {{ reponse }} 
				</p>
			</TransitionGroup>
		</div>
		<Reponse />

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


.quizz-container {
	margin: 10% auto;
	height: 300px;
	width: 100%;
	max-width: 700px;
	border-radius: 50px;
	background: linear-gradient(145deg, #fdfce4, #cff6fb94);
	box-shadow:  20px 20px 60px #bebebe,
				-20px -20px 60px #ffffff;
}

.question-container {
    text-align: center;
    overflow: hidden;
    display: flex;
    height: 100px;
    justify-content: center;
    flex-direction: column;

	p {
		font-family: 'Sofia Sans Condensed', sans-serif;
		&::selection {
			color:red;
			background-color:transparent;
		}
	}
}

.reponses-container {
	height: 180px;
	display: flex;
	justify-content: center;
	flex-direction: column;
	overflow: hidden;
	span {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		margin: 0 auto;
		width: 90%;
	}
}

.reponse {
	min-width: 20%;
	text-align: center;
	font-family: 'Sofia Sans Condensed', sans-serif;
	font-weight: 400;
	font-size: 16px;
	border-radius: 50px;
	transform: translateY(-20px);
	opacity: 0;
	padding: 10px;
	border: 0.5px solid #ffffff52;
    cursor: pointer;
	background: linear-gradient(170deg, #cacaca42  35%, #f0f0f0);
    box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
	
	&:hover {
		transition: border 0.5s;
		border: 0.5px solid #0cb9ba;
	}

	&:active {
		box-shadow: 20px 20px 60px #808080b8, -20px -20px 60px #ffffff;
	}
}

@keyframes valideIconAfterAnim {
	0% {
		bottom: -20px;
	}

	35%{
		bottom: -25px;
	}
	55%{
		bottom: -25px;
	}

	100% {
		bottom: -45px;
	}
}



.bonne-reponse {
	transition:color 0.25s;
	&::after {
			content:"✓";
			opacity: 0;
			transition: bottom  .5s, opacity 1s;
			position: absolute;
			bottom: -25px;
			left:50%;
			font-weight: bold;
			transform:translateX(-50%);
			
		}
	&.active {
		color: #20a520fd;
		border: 0.5px solid #20a520fd;
		&::after {
			content:"✓";
			opacity: 1;
			position: absolute;
			left:50%;
			font-weight: bold;
			animation: valideIconAfterAnim 1.8s forwards;
			
			transform:translateX(-50%);
		}
	}

}
.mauvaise-reponse {
	transition: color 0.25s;
	&:after {
		content:"✕";
		opacity:0;
		transition: opacity 1s, bottom 0.55s;
		position: absolute;
		bottom: -15px;
		left:50%;
		transform:translate(-50%);
	}
	&.active {
		color:  #c42020c0;
		border: 0.5px solid #c42020c0;
		&::after {
			content:"✕";
			opacity:1;
			position: absolute;
			bottom: -25px;
			left:50%;
			transform:translate(-50%);
		}
	}
}

.resultat-container {
	position: absolute;
	bottom: 70px;
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

button {
	width: fit-content;
	margin: 0 auto;
}

.disabel-click {
	pointer-events: none;
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
	transition: transform 0.35s ease-out, opacity 0.45s;
}

.animquestion-leave-from {
	opacity: 1;
	transform:translateY(0px);
}
.animquestion-leave-to {
	transform:translateY(20px);
	opacity: 0;
}



@media (max-width: 650px) {
  
 .quizz-container {
	height: -webkit-fill-available;
	background: inherit;
    box-shadow: inherit;
 }

 .reponses-container {
	height: 255px;
    margin: 5vh 2vh;
    justify-content: center;
    flex-direction: column;
    overflow: inherit;
	display: inherit;
	span {
		
		flex-direction: column;
	}

	.reponse {
		margin: 25px 0;
	}
 }
  
}
</style>
