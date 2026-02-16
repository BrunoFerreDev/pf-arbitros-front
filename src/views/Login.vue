<script setup>
import LoginCard from '../components/LoginCard.vue'
</script>

<template>
    <div
        class=" min-h-screen flex items-center justify-center p-4 font-display relative">

        <div class="fixed inset-0 z-0">
            <div class="absolute inset-0 bg-black/60 z-10"></div>
            <div class="w-full h-full bg-cover bg-center"
                style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDCQQ1hoCqDqJm2lBvLCAz4kmTCjkWh1zZSBAPc1OTRAN6YgvF4m86Abz1l2PCTOS4NEczZxEYit2gzjJSb32gGOxeJaZ-Q_oYipCQAFvIikjs4cxwCjWOSjG7en1oJFZjMj7wX0a5RCjw8OSMLAFPknTUk8nrivVYHKtIAkt0XlL8yUwVEpqOA9Aj8JkeuBkz8QwMonv_PnKzvG460UQ8pj3HdYxTu4NukVE6PL-p9ndzVN09KSJL6riGGG0k_L9162Tq-sb_YyQ8');">
            </div>
        </div>

        <LoginCard />

    </div>
</template>