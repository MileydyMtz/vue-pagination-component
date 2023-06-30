<template>
<div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1" aria-label="Prev">Prev</button>
    <span>Página {{ currentPage }} de {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages" aria-label="Next">Next</button>
</div>
</template>

<script>
export default {
    name: 'ThePagination',

    props: {
        totalItems: {
            type: Number,
            required: true
        },
        itemsPerPage: {
            type: Number,
            default: 10
        }
    },
    data() {
        return {
            currentPage: 1
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.totalItems / this.itemsPerPage);
        }
    },
    methods: {
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.$emit('page-change', this.currentPage);
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.$emit('page-change', this.currentPage);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
$button-color: rgb(222, 224, 224);
$letter-color: #222;
.pagination {
    align-items: center;
    color: $letter-color;
    display: flex;
    justify-content: space-between;

    button {
        background-color: $button-color;
        border-color: $button-color;
        border-radius: 5px;
        cursor: pointer;
    }
}
</style>
