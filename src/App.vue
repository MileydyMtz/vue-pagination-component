<template>
<div>
    <search-box 
        api-url="https://64766fef9233e82dd53a050e.mockapi.io/api/products" 
        search-field="name" 
        @results="handleResults" 
        @search-error="handleError" 
        @loading="handleLoading" 
    />

    <div v-if="isLoading" class="loading-indicator">
        Cargando...
    </div>

    <div v-if="paginatedResults.length">
        <h2>Resultados de la búsqueda:</h2>
        <ul>
            <li v-for="(result, index) in paginatedResults" :key="index">
                {{ result.name }}
            </li>
        </ul>
    </div>

    <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
    </div>

    <pagination 
        v-if="results.length" 
        :total-items="results.length" 
        :items-per-page="itemsPerPage" 
        @page-change="currentPage = $event" 
    />
</div>
</template>

<script>
import SearchBox from './components/SearchBox.vue';
import Pagination from './components/ThePagination.vue';

export default {
    components: {
        SearchBox,
        Pagination
    },
    data() {
        return {
            results: [],
            errorMessage: '',
            isLoading: false,
            currentPage: 1,
            itemsPerPage: 10
        };
    },
    computed: {
        paginatedResults() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.results.slice(start, end);
        }
    },
    methods: {
        handleResults(results) {
            this.results = results;
            if (results.length === 0) {
                this.errorMessage = 'No se encontraron resultados para tu búsqueda.';
            } else {
                this.errorMessage = '';
            }
        },
        handleError(errorMessage) {
            this.errorMessage = errorMessage;
            this.results = [];
        },
        handleLoading(isLoading) {
            this.isLoading = isLoading;
        },
    }
};
</script>

<style scoped>
.loading-indicator {
    font-size: 1.2em;
    padding: 20px;
    text-align: center;
}

.error-message {
    background-color: #f8d7da;
    border-radius: 5px;
    border: 1px solid #f5c6cb;
    color: #721c24;
    margin: 20px;
    padding: 15px;
    text-align: center;
}
</style>
