<script setup>

import { inject } from 'vue';
import gsap from 'gsap';

const store = inject("STORE");

 
function onEnter(el, done) {
	console.log(el)
	gsap.set(el, { opacity: 0, filter: 'blur(10px)' });
	gsap.to(el,
		{ 
			opacity: 1,
			filter:'blur(0px)',
			delay:  el.dataset.index   * 0.25,
			duration: 0.55,
			onComplete: () => {
				done();
			}
		});
}

function onLeave(el, done) {
	gsap.to(el,
		{
			opacity: 0,
			filter:'blur(10px)',
			delay: 0.60,
			duration: .60,
			onComplete: () => {
				done();
			},
		});
}


</script>

<template>
	<div class="choix-container">
		
			<TransitionGroup
				name="list"
				tag="span"
				@enter="onEnter"
				@leave="onLeave"
			>
				<p	
					v-if="store.stepIsInitiated"
					v-for="reponse, index in store.quizz[store.actualStep].reponses"
					class="reponse"
					:data-index="index"
					@click="$emit('handleClickReponse', reponse)"
					:key="reponse"
					:class="{
						'bonne-reponse' : reponse === store.quizz[store.actualStep].bonneReponse,
						'mauvaise-reponse' : reponse !== store.quizz[store.actualStep].bonneReponse,
						'actived' : store.isReponseClickedState,
						'disabel-click' : store.isClickEnabeled,
					}"
				> {{ reponse }} 
				</p>
			</TransitionGroup>
		</div> 
		
</template>


<style lang="scss" scoped>

@import '../style.scss';


.choix-container {
	height: 180px;
	display: flex;
	justify-content: center;
	flex-direction: column;
	overflow: hidden;


	span {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		margin: 0 auto;
		width: 90%;
	}
}

.reponse {
	min-width: 20%;
	text-align: center;
	font-family: 'Sofia Sans Condensed', sans-serif;
	font-weight: 400;
	font-size: 16px;
	border-radius: 50px;
	transform: translateY(-20px);
	opacity: 1;
	padding: 10px;
	border: 0.5px solid #ffffff52;
    cursor: pointer;
	background: linear-gradient(170deg, #cacaca42  35%, #f0f0f0);
    box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
	
	&:hover {
		transition: border 0.5s;
		border: 0.5px solid #0cb9ba;
	}

	&:actived {
		box-shadow: 20px 20px 60px #808080b8, -20px -20px 60px #ffffff;
	}
}

.bonne-reponse {
	transition:color 0.25s;
	&::after {
			content:"✓";
			opacity: 0;
			transition: bottom  .5s, opacity 1s;
			position: absolute;
			bottom: -25px;
			left:50%;
			font-weight: bold;
			transform:translateX(-50%);
			
		}
	&.actived {
		color: #20a520fd;
		border: 0.5px solid #20a520fd;
		&::after {
			content:"✓";
			opacity: 1;
			position: absolute;
			left:50%;
			font-weight: bold;
			animation: valideIconAfterAnim 1.8s forwards;
			
			transform:translateX(-50%);
		}
	}

}
.mauvaise-reponse {
	transition: color 0.25s;
	&:after {
		content:"✕";
		opacity:0;
		transition: opacity 1s, bottom 0.55s;
		position: absolute;
		bottom: -30px;
		left:50%;
		transform:translate(-50%);
	}
	&.actived {
		color:  #c42020c0;
		border: 0.5px solid #c42020c0;
		&::after {
			content:"✕";
			opacity:1;
			position: absolute;
			bottom: -25px;
			left:50%;
			transform:translate(-50%);
		}
	}
}



@keyframes valideIconAfterAnim {
	0% {
		bottom: -20px;
	}

	35%{
		bottom: -25px;
	}
	55%{
		bottom: -25px;
	}

	100% {
		bottom: -45px;
	}
}




	@media (max-width: $mobile) {
		.choix-container {
			// background-color: red;
			flex-direction: column;
		}
		
	}

</style>