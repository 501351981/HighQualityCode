<template>

</template>

<script>
export default {
    name: "MyTable",
    props: {
        columns: {
            type: Array
        },
        getData:{
            type: Function
        }
    }
};
</script>

<style scoped>

</style>