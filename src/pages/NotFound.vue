<template>
	<div class="body">
		<div id="container" @mouseover="moveBackground">
			<div class="content">
				<h2>404</h2>
				<h4>¡Parece que te perdiste!</h4>
				<p>¡Ups! Parece que has encontrado nuestra página 404. No te preocupes, a todos nos ha pasado alguna vez. Intenta volver a la página anterior e inténtalo nuevamente. ¡Buena suerte!</p>
				<q-btn color="info" icon="settings_backup_restore" label="regresar" @click="goBack">
					<q-tooltip>Haz click para regresar a la página anterior.</q-tooltip>
				</q-btn>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { useRouter } from 'vue-router'

	const $router = useRouter()

	const goBack = () => {
		$router.back()
	}

	const moveBackground = (event) => {
		let container = document.getElementById('container')

		var x = - event.clientX / 5,
			y = - event.clientY / 5;

		container.style.backgroundPositionX = x + 'px';
		container.style.backgroundPositionY = y + 'px';
	}
</script>

<style scoped>
	.body {
		background: linear-gradient(45deg, #c4302b, #f3ba2f);
		min-width: 100%;
		min-height: 100vh;
	}

	#container {
		position: absolute;
		top: 10%;
		left: 10%;
		right: 10%;
		bottom: 10%;
		border-radius: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		background: url('../assets/images/backgrounds/p404.png'), rgba(21, 23, 41, 0.7);
		box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
		transition: 0.3s;
		padding-bottom: 40px;
	}

	#container .content {
		max-width: 600px;
		text-align: center;
	}

	#container .content h2 {
		font-size: 18vw;
		color: #FFFFFF;
		line-height: 1em;
	}

	#container .content h4 {
		position: relative;
		font-size: 1.5em;
		margin-bottom: 20px;
		color: #111111;
		background: #FFFFFF;
		padding: 10px 20px;
		display: inline-block;
	}

	#container .content p {
		color: #FFFFFF;
		font-size: 1.2em;
	}
</style>