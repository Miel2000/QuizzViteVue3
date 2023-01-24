<script setup>

import { onMounted, ref, inject } from 'vue';
//  CE COMPOSANT REçOIT LES QUESTIONS D'UNE SEQUENCE

const backgroundSpan = ref('');
const isClickableChoice = ref(false);

const store = inject("STORE");

function validateChoice(reponse) {

	console.log(reponse);
	displaySpanBg();
	stockResult(reponse);
	empecherClickChoix();
	displayResponse();
}

function displaySpanBg() {
	backgroundSpan.value = "active"
}

function stockResult(result) {
	if(result.goodAnswer === "true") {
		store.points += 5;
		store.isRight = true;
	}

	console.log(store.points)
}

function empecherClickChoix() {
	isClickableChoice.value = true;
}

function displayResponse() {
	store.isReponseVisible = true;
}

</script>

<template>
	<h1>{{store.points}}</h1>
	<div  class="choix-container">
		<p v-for="rep in store.questions.quizzlol.sequence1.choix"
			class="choix"
			@click="validateChoice(rep)"
			:class="{ 'disable-click' : isClickableChoice }"
			:key="rep.id"
			:data-right="rep.goodAnswer"
		> 
			{{rep.text}}
			
			<span  class="validation-bg" :class="[rep.goodAnswer, backgroundSpan]" ></span>
		</p>
	</div>

</template>


<style lang="scss" scoped>

	@import '../style.scss';

	.choix-container {
		height: fit-content;
		align-items: center;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
	}

	.disable-click {
		pointer-events: none;
	}

	.validation-bg  {
		position: absolute;
		width: 100%;
		background-color: rgb(162 231 63 / 30%);
		height: 0%;
		bottom:0;
		transition: height 0.70s 0.25s;

		&.true {
			background-color: rgb(162 231 63 / 30%);
		}

		&.false {
			background-color: #eb45456b;
		}

		&.active {
			height: 100%;
		}
	}



	.choix {
		position: relative;
		width: 20%;
		height: 100px;
		flex-direction: column;
		display: flex;
		cursor: pointer;
		justify-content: center;
		margin: 2em auto;
		transition: box-shadow 0.25s ease-out;
		box-shadow:   -15px 0 0 0 rgb(63, 142, 231),
						15px 0 0 0 rgb(63, 142, 231),
						0 -15px 0 0 rgb(63, 142, 231),
						0 15px 0 0 rgb(63, 142, 231);

		&:hover {
			box-shadow:   -5px 0 0 0 rgba(98, 214, 82, 0.438),
						5px 0 0 0 rgba(98, 214, 82, 0.438),
						0 -5px 0 0 rgba(98, 214, 82, 0.438),
						0 5px 0 0 rgba(98, 214, 82, 0.438);
		}

	
	}


	@media (max-width: $mobile) {
		.choix-container {
			// background-color: red;
			flex-direction: column;
		}
		
	}

</style>