<template>
    <div>
        <b-button @click="toast('b-toaster-top-right')" class="mb-2">b-toaster-top-right</b-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            counter: 0,
        }
    },
    methods: {
        toast(toaster, append = false) {
            this.counter++
            this.$bvToast.toast(`Toast ${this.counter} body content`, {
                title: `Toaster ${toaster}`,
                toaster: toaster,
                appendToast: append,
            })
        },
    },
}
</script>
