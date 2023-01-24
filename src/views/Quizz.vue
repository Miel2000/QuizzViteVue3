<script setup>
import { quizz } from "../assets/quizz.js";
import { onMounted, ref } from "vue";


onMounted(() => {
	console.log("quizz", quizz)
})

const actualStep = ref(0);
const isResultatVisible = ref(false)

function nextStep() {
	actualStep.value++

	if(actualStep.value >= quizz.length) {
		isResultatVisible.value = true
	}
}

</script>

<template>
	<div  v-if="!isResultatVisible" class="quizz-container">

		<div class="question-container">

			<p>{{ quizz[actualStep].question }}</p>

		</div>

		<div class="reponses-container">
	
			<p v-for="reponse in quizz[actualStep].reponses" class="reponse">
				{{ reponse }}
			</p>

		</div>

		<button @click="nextStep">
			next step
		</button>

	</div>

	<div v-if="isResultatVisible" class="resultat-container">
		<h1>RESULTAT</h1>
	</div>
</template>


<style lang="scss" scoped>

.quizz-container {
	justify-content: center;
    text-align: center;
    display: flex;
    flex-direction: column;
}

.reponses-container {
	display: flex;
	justify-content: space-evenly;
}
button {
	width: fit-content;
	margin: 0 auto;
}
</style>