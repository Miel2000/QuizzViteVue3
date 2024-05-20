<script setup>
import { onMounted, ref, inject } from 'vue';
// let isRight = ref(true);
// let isReponseVisible = ref(true);
const store = inject("STORE");

</script>
<template>
	<div class="answer-state-container">
		<Transition name="answer">
			<div v-if="store.isReponseVisible">
				
					<p v-if="store.isRight" class="answer isright">
						Bonne réponse +5 pts! ({{ store.points }}pts)
					</p>

					<p v-else class="answer isfalse">
						Raté, la bonne réponse été :
						<strong class="isright">
							{{ store.storedGoodAnswer }}
						</strong> 
					</p>
				</div>
		</Transition>

	</div>
  
</template>

<style scoped>

.answer-state-container {
	width: 100%;
    display: flex;
    justify-content: center;
	transform: translateY(-35px);
	.isright {
		color:#20a520fd;
		
	}
	.isfalse {
		color: #c42020c0;
		strong {
			font-size: 21px;
		}
	}
}




.answer-enter-from {
	transform:translateY(-20px);
	opacity:0;
}

.answer-enter-to {
	opacity:1;
	transform:translateY(0px);
}

.answer-enter-active, .answer-leave-active {
	transition: transform 0.35s ease-out, opacity 0.45s;
}

.answer-leave-from {
	opacity: 1;
	transform:translateY(0px);
}
.answer-leave-to {
	transform:translateY(20px);
	opacity: 0;
}


</style>