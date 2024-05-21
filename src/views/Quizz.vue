<script setup>
import { quizz } from "../assets/quizz.js";
import { computed, onMounted, ref, inject } from "vue";
import Resultat from "../components/Resultat.vue";
import Question from "../components/Question.vue";
import Choix from "../components/Choix.vue";


const store = inject("STORE");

const firstStepTimeout = 200;
const betweenTwoStepTimeout = 900;
const switchActualStepTimeout = 1000;
const startNextStepTimeout = 1200;
const clickNextStepBtnTimeout = 500;


const actualBonneReponse = computed(() => quizz[store.actualStep].bonneReponse )

onMounted(() => {
	setTimeout(() => {
		store.stepIsInitiated = true
	}, firstStepTimeout);
})

function clickNextStepBtn() {
	
	store.isClickEnabeled = true;
	
	setTimeout(() => {
		store.stepIsInitiated = false;
		
		updateActualStep()
	}, clickNextStepBtnTimeout);
}

function handleClickReponse(reponse) {
	store.isClickEnabeled = true;
	store.isReponseVisible = true;
	store.stepIsInitiated = true;

	verificationReponse(reponse)

	activeBorderColorChoices(true)

	setTimeout(() => {
		clickNextStepBtn();
	}, betweenTwoStepTimeout);
}

function updateActualStep() {
	activeBorderColorChoices(false);
	setTimeout(() => {
		
		if(store.actualStep < quizz.length - 1) {
			store.actualStep++
		}  else {
			store.actualStep = 0;
		}
	}, switchActualStepTimeout);
	

	setTimeout(() => {
		store.stepIsInitiated = true;
		store.isReponseVisible = false;
		store.isClickEnabeled = false;
	}, startNextStepTimeout);
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

function activeBorderColorChoices(stateColorReponse) {
	store.isReponseClickedState = stateColorReponse;
}

</script>

<template>
	<div class="quizz-container">

		<Question />

		<Choix @handle-click-reponse="handleClickReponse"/>

		<Resultat />

		<div class="score-container">
			Score : {{ store.points }} Pts
		</div>
		<div class="debug-container">
			<button 
				class="btn-nextstep"
				:class="{
					'disabel-click' : store.isClickEnabeled,
					'loading' : store.isClickEnabeled,
				}" 
				@click="clickNextStepBtn">
				{{  store.isClickEnabeled ? "Loading..." : "Question suivante " }}
			</button>
		</div>

	</div>
</template>

<style lang="scss" >

.disabel-click {
	pointer-events: none;
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


.score-container {
	position: absolute;
	bottom: 70px;
	right: 20px;
	border: solid 1px black;
	padding:5px;
}

.debug-container {

	.btn-nextstep {
		cursor: pointer;
		position: absolute;
		top: 110px;
		right: 20px;
		border: solid 1px black;
		padding:5px;
	}
	
	.loading {
		opacity: 0.5;
		// border: red 1px solid;
	}
	
	button {
		width: fit-content;
		margin: 0 auto;
	}
}



@media (max-width: 650px) {
  
 .quizz-container {
	height: -webkit-fill-available;
	background: inherit;
    box-shadow: inherit;
 }

 .choix-container {
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
