<script setup>
	import Question from '../components/Question.vue'
	import Reponse from '../components/Reponse.vue'
	import Choix from '../components/Choix.vue'
	import { store } from '../store/store.js'
</script>

<template>
	<div class="quizz-container">

		<!-- Chaque composant recevra une séquence -->

		
		<Question />

		<Choix />

		<Reponse />

	</div>
  
</template>


<style scoped>

.quizz-container {
	/* border: solid 1px black; */
	justify-content: center;
    text-align: center;
    display: flex;
    flex-direction: column;
}

</style>