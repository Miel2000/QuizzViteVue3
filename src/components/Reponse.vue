<script setup>
import { onMounted, ref, inject } from 'vue';
// let isRight = ref(true);
// let isReponseVisible = ref(true);
const store = inject("STORE");

</script>
<template>
	<div class="reponse-container">
		<div v-if="store.isReponseVisible">

			<p v-if="store.isRight" class="reponse isright">
				Bonne Réponse : Vi <strong>✔</strong>
			</p>

			<p v-else class="reponse isfalse">
				Mauvaise Réponse : Vi  <strong>✘</strong>
			</p>

		</div>

	</div>
  
</template>

<style scoped>

.reponse {
	width: 30%;
    margin: 0 auto;
}
.isright {
	background-color:#9be69b;
}
.isfalse {
	background-color:rgba(235, 69, 69, 0.4196078431);
}


</style>