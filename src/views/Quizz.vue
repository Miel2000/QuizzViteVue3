<script setup>
import { quizz } from "../assets/quizz.js";

import { onMounted } from "vue";


onMounted(() => {
	console.log("quizz", quizz)
})

</script>

<template>
	<div class="quizz-container">

		<div class="question-container">

			<p>{{ quizz[0].question }}</p>

		</div>

		<div class="reponses-container">
	
			<p v-for="reponse in quizz[0].reponses" class="reponse">
				{{ reponse }}
			</p>

		</div>

	</div>
</template>


<style scoped>

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