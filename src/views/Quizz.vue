<script setup>
import { quizz } from "../assets/quizz.js";
import { computed, ref } from "vue";

const actualStep = ref(0);
const isResultatVisible = ref(false);
const isReponseClickedState = ref(false);
const actualBonneReponse = computed(() => quizz[actualStep.value].bonneReponse )
const points = ref(0);

function handleClickNextStep() {
	updateActualStep()
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

	if(actualStep.value < quizz.length - 1) {
		actualStep.value++
	}  else {
		actualStep.value = 0;
		isResultatVisible.value = true;
	}
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

			<p>{{ quizz[actualStep].question }}</p>

		</div>

		<div class="reponses-container">

			<p
				v-for="reponse in quizz[actualStep].reponses"
				class="reponse"
				@click="handleClickReponse(reponse)"

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
			</p>

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

.reponses-container {
	position: relative;
	display: flex;
	justify-content: space-evenly;
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
</style>
