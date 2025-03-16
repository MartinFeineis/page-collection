<script>
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';

let deck = new Reveal({
  plugins: [Markdown],
});
deck.initialize();
</script>
<style></style>
<template>
    <head>
        <link rel="stylesheet" href="/node_modules/reveal.js/dist/reveal.css" />
        <link rel="stylesheet" href="/node_modules/reveal.js/dist/theme/black.css" />
		<meta charset="utf-8">
		<title>reveal.js - Barebones</title>
	</head>
	<body>

		<div class="reveal">
			<div class="slides">

				<section>
					<h2>Barebones Presentation</h2>
					<p>This example contains the bare minimum includes and markup required to run a reveal.js presentation.</p>
				</section>

				<section>
					<h2>No Theme</h2>
					<p>There's no theme included, so it will fall back on browser defaults.</p>
				</section>

			</div>
		</div>

		<script src="../dist/reveal.js"></script>
		<script>
			Reveal.initialize();
		</script>

	</body>
</html>
</template>