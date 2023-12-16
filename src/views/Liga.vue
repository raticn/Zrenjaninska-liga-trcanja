<script>

export default {
    data() {
        return {
            admin: false,
        }
    }
}
</script>

<template>
    <div>liga
        <p v-if="this.admin">admin</p>
    </div>
</template>