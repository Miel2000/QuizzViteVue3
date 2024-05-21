<script setup>
import { inject, computed } from 'vue';

const store = inject("STORE");

const actualQuestion = computed(() => store.quizz[store.actualStep].question)
</script>

<template>
	<div class="question-container">
		<Transition name="animquestion">
			<p v-show="store.stepIsInitiated">{{ actualQuestion || "" }}</p>
		</Transition>
	</div>
</template>

<style lang="scss" scoped>

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

// Transitions 

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



</style>
