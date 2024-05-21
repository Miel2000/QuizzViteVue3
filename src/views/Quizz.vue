<script setup>
import { quizz } from "../assets/quizz.js";
import { computed, onMounted, ref, inject } from "vue";
import Resultat from "../components/Resultat.vue";
import Question from "../components/Question.vue";
import Choix from "../components/Choix.vue";


const store = inject("STORE");


const isResultatVisible = ref(false);



const actualBonneReponse = computed(() => quizz[store.actualStep].bonneReponse )

onMounted(() => {
	setTimeout(() => {
		store.stepIsInitiated = true
	}, 1000);
})

function handleClickNextStep() {
	updateActualStep()
	store.stepIsInitiated = false;
}

function handleClickReponse(reponse) {
	store.isClickEnabeled = true;
	store.isReponseVisible = true;
	verificationReponse(reponse)
	colorChoixWhenClicked(true)
	setTimeout(() => {
		handleClickNextStep();
		store.isClickEnabeled = false;
	}, 1000);
}

function updateActualStep() {
	colorChoixWhenClicked(false);
	
	store.stepIsInitiated = false;

	setTimeout(() => {

		if(store.actualStep < quizz.length - 1) {
			store.actualStep++

		}  else {
			store.actualStep = 0;
		}

		store.stepIsInitiated = true;
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

function colorChoixWhenClicked(stateColorReponse) {
	store.isReponseClickedState = stateColorReponse;
}



</script>

<template>
	<div class="quizz-container">


			
		<Question />

		<Choix @handle-click-reponse="handleClickReponse"/>
	
		<Resultat />

		<div class="score-container">
			Résultat : {{ store.points }}
		</div>

		<button class="btn-nextstep" @click="handleClickNextStep">
			Question suivante
		</button>

	</div>
</template>

<style lang="scss" scoped>




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
