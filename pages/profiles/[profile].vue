<template>
<h1>This is the Profile for {{ $route.params.profiles }}</h1>
    <head>
      <meta charset="UTF-8">
      <link rel="icon" href="/favicon.ico">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Resume {{ $route.params.profiles }}</title>
    </head>
    <div>
      <Profile />
      <GitHubStats />
      <SendMsg to:martinfeineis />
      <Jobs />
  </div>
</template>