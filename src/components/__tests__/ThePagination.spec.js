import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Pagination from '../ThePagination.vue'

describe('Pagination', () => {
    it('renders properly', () => {
        const wrapper = mount(Pagination, { props: { totalItems: 100, itemsPerPage: 10 } })
        expect(wrapper.text()).toContain('Página 1 de 10')
    })

    it('goes to the next page', async () => {
        const wrapper = mount(Pagination, { props: { totalItems: 100, itemsPerPage: 10 } })
        await wrapper.find('button[aria-label="Next"]').trigger('click')
        expect(wrapper.text()).toContain('Página 2 de 10')
    })

    it('goes to the previous page', async () => {
        const wrapper = mount(Pagination, { props: { totalItems: 100, itemsPerPage: 10 } })
        await wrapper.find('button[aria-label="Next"]').trigger('click')
        await wrapper.find('button[aria-label="Prev"]').trigger('click')
        expect(wrapper.text()).toContain('Página 1 de 10')
    })

    it('does not go to the previous page if on the first page', async () => {
        const wrapper = mount(Pagination, { props: { totalItems: 100, itemsPerPage: 10 } })
        await wrapper.find('button[aria-label="Prev"]').trigger('click')
        expect(wrapper.text()).toContain('Página 1 de 10')
    })

    it('does not go to the next page if on the last page', async () => {
            const wrapper = mount(Pagination, { props: { totalItems: 10, itemsPerPage: 10 } })
            await wrapper.find('button[aria-label="Next"]').trigger('click')
            expect(wrapper.text()).toContain('Página 1 de 1')
    })
})
