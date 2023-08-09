# Documentación del componente ThePagination
## Descripción:
Este componente proporciona una funcionalidad de paginación básica que permite a los usuarios navegar por un conjunto de datos dividido en varias páginas. Adopta un diseño simple y limpio con botones de paginación y un span de texto que muestra la página actual y el total de páginas. 

## Tecnologías usadas
A continuación, se enlistan las tecnologías y librerías utilizadas en el desarrollo de este componente:
* Vue 3
* Preprocesador SCSS
* Vue Test Utils
* Vitest
* Prettier
* ESLint
   
## Características del componente
### Props
El componente ThePagination tiene dos propiedades:
* **totalItems**: (Requerido) Esta propiedad es un número que representa la cantidad total de elementos en el conjunto de datos que se está paginando.
* **itemsPerPage**: Esta propiedad es un número que representa cuántos elementos se deben mostrar por página. El valor predeterminado es 10 si no se proporciona una prop.

### Data
Este componente define una variable de datos:
* **currentPage**: Mantiene un seguimiento de la página actual en la que se encuentra el usuario. Por defecto, se inicia en la página 1.

### Propiedad Computada
Este componente hace un cálculo:
* **totalPages**: Determina el número total de páginas dividiendo la cantidad total de elementos (*totalItems*) por la cantidad de elementos por página (*itemsPerPage*). Se redondea hacia arriba para garantizar que todos los elementos se puedan ver en las páginas disponibles.

### Métodos
Este componente tiene los siguientes métodos: 
* **nextPage**: Este método incrementa *currentPage* en uno, hasta el número máximo de páginas, y emite un evento  *page-change* con el número de página actualizado. 
* **prevPage**: Este método disminuye *currentPage* en uno, hasta 1, y emite un evento  *page-change* con el número de página actualizado. 

### Eventos 
Este componente emite el siguiente evento: 
* **page-change**: Este evento se emite cada vez que se cambia de página. El nuevo número de página se pasa como un argumento al manejador del evento. 

### Estilos
* Los estilos están definidos en la sección de <style> y usan la extensión .scss.
* Los estilos están "scoped", lo que significa que solo se aplicarán a este componente y no afectarán a otros componentes de la aplicación donde se reutilice.
* Los colores para los botones y las letras son personalizables a través de las variables de color *$button-color* y *$letter-color*, respectivamente.

## Uso del componente
Para utilizar este componente, primero se debe descargar el archivo *ThePagination.vue* que se encuentra dentro de *src/components* y agregarlo al proyecto donde se reutilizara.
Este componente se puede utilizar principalmente para proporcionar paginación en tablas de datos o listas de elementos, y emite un evento personalizado cuando se cambia de página, permitiendo así a los componentes padres reaccionar a estos cambios.
Para usar este componente se deben pasar mediante la etiqueta de **Paginatión** las propiedades *totalItems* (el total de los resultados de la búsqueda) y *itemsPerPage* (la cantidad de resultados a mostrar por página). También se escucha el evento *page-change* para actualizar la página actual (*currentPage*) cuando se cambia de página.

```vue 
<Pagination
    :totalItems="100"
    :itemsPerPage="10"
    @page-change="currentPage = $event"
/>

```

### Ejemplo
A continuación, se presenta un ejemplo de uso del componente de *ThePagination*.

En este ejemplo el componente de paginación está diseñado para trabajar en conjunción con otro componente, *SearchBox*, que emite los resultados de la búsqueda y otros eventos. App.vue recibe estos eventos, y en base a ellos, actualiza los datos que luego se pasan a *ThePagination*. Por ejemplo, cuando SearchBox emite los resultados de una búsqueda, App.vue actualiza la matriz *results* con estos datos. 
Dado que *ThePagination* depende de *results* para calcular el total de elementos (*totalItems*), este cambio en *results* afectará el comportamiento de *ThePagination*.
De esta manera la etiqueta del componente de paginación quedaría de la siguiente forma:

```vue
<Pagination 
    v-if="results.length" 
    :totalItems="results.length" 
    :itemsPerPage="itemsPerPage" 
    @page-change="currentPage = $event" 
/>

```

Se escucha el evento *page-change* que se emite desde *ThePagination*. Cuando se emite este evento (cuando se cambia de página), se actualiza *currentPage* con el nuevo número de página:

```
@page-change="currentPage = $event"
```

Las variables de datos de *currentPage* e *itemsPerPage* se definen en la data del componente padre, junto a las variables de datos del componente de búsqueda:

```js
    data() {
        return {
            results: [],
            errorMessage: '',
            isLoading: false,
            currentPage: 1,
            itemsPerPage: 10
        };
    },
```

También se utiliza la propiedad computada *paginatedResults* para calcular qué resultados de la búsqueda se deben mostrar en la página actual. Se calcula el inicio y el final del segmento de los resultados totales que se deben mostrar, y se devuelve este segmento:

```js
computed: {
    paginatedResults() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.results.slice(start, end);
    }
},

```

Después de calcular el segmento de resultados que se debe mostrar, este se utiliza en la plantilla de Vue para renderizar la lista de resultados. Si la longitud de *paginatedResults* es mayor a 0 (lo que significa que hay resultados para mostrar), se genera una lista con estos resultados. Cada resultado se muestra en su propio elemento de lista, utilizando *v-for* para iterar sobre los *paginatedResults*:

```vue
<div v-if="paginatedResults.length">
        <h2>Resultados de la búsqueda:</h2>
        <ul>
            <li v-for="(result, index) in paginatedResults" :key="index">
                {{ result.name }}
            </li>
        </ul>
</div>
```


## Demostración
En el ejemplo anterior se utilizó el componente de paginación que se integró con un componente de búsqueda (SearchBox). Este arreglo permitió dividir los resultados de búsqueda en varias páginas y se visualiza de la siguiente manera:

**Ejemplo visual de cómo se ve el componente de paginación en acción junto con el componente de búsqueda**

![paged results](https://github.com/MileydyMtz/vue-pagination-component/assets/85470047/528c44a9-ce31-4e57-bed4-d79a0f8bf48c)


## Pruebas
Se utiliza la biblioteca Vitest para correr las pruebas y @vue/test-utils para montar el componente. 

A continuación, se muestran las pruebas implementadas:

* **renders properly**: Esta prueba verifica si el componente se está renderizando correctamente. En el contexto de esta prueba, se verifica si el texto mostrado en el componente es "Página 1 de 10", lo que es esperado considerando que se está proporcionando totalItems igual a 100 e itemsPerPage igual a 10.
* **goes to the next page**: Esta prueba verifica si el componente está cambiando correctamente a la siguiente página. Después de hacer clic en el botón "Siguiente", se espera que el texto mostrado en el componente cambie a "Página 2 de 10".
* **goes to the previous page**: Esta prueba verifica si el componente está cambiando correctamente a la página anterior. Después de avanzar a la página 2 y luego hacer clic en el botón "Anterior", se espera que el texto mostrado en el componente vuelva a ser "Página 1 de 10".
* **does not go to the previous page if on the first page**: Esta prueba verifica que el componente no permita navegar a una página anterior si ya está en la primera página. Después de intentar hacer clic en el botón "Anterior" en la primera página, se espera que el texto mostrado en el componente siga siendo "Página 1 de 10".
* **does not go to the next page if on the last page**: Esta prueba verifica que el componente no permita navegar a una página siguiente si ya está en la última página. Después de intentar hacer clic en el botón "Siguiente" en la última página, se espera que el texto mostrado en el componente siga siendo "Página 1 de 1".
