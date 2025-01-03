<template>
    <div>
        <p><NuxtLink to="/">go Home</NuxtLink></p>
        <div v-if="user">
            <NuxtLink to="/uprofile">Profile</NuxtLink>
        </div>
        <div v-else>
            <NuxtLink to="Login">Login</NuxtLink>
        </div>
    </div>
</template>