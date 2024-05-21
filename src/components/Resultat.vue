<script setup>
import { inject } from 'vue';

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
						<span class="isright">
							{{ store.storedGoodAnswer }}
						</span> 
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
		span {
			letter-spacing: 2px;
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