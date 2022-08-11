<template>
    <div>
        <b-table
            bordered
            selectable
            responsive
            select-mode="multi"
            hover
            :items="items"
            :fields="fields"
            head-variant="light"
            label-sort-asc=""
            label-sort-desc=""
            label-sort-clear=""
            rowSelected="true"
            :per-page="perpage"
            :current-page="currentPage"
            @row-selected="onRowSelected"
        >
            <template v-slot:cell(edit)="data">
                <b-button @click="handleEdit(data)" style="background-color: #256d85; font-size: 0.8rem" size="sm">
                    <b-icon icon="pencil" aria-hidden="true"></b-icon
                ></b-button>
            </template>
        </b-table>
        <b-row>
            <b-col class="me-auto"> 總共 {{ rows }} 條紀錄 </b-col>
            <b-col>
                <b-pagination
                    class="justify-content-end"
                    pills
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perpage"
                ></b-pagination>
            </b-col>
        </b-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            fields: [
                {
                    key: 'number',
                    sortable: true,
                    label: ' 工號 ',
                    class: 'text-center',
                },
                {
                    key: 'name',
                    sortable: true,
                    label: ' 姓名 ',
                    class: 'text-center',
                },
                {
                    key: 'edit',
                    label: '操作',
                    class: 'text-center',
                },
            ],
        }
    },
    props: ['items', 'perpage', 'currentPage'],
    methods: {
        onRowSelected(items) {
            console.log(items)
            //     this.rowSelected = items
        },
        handleEdit(data) {
            console.log(data.item)
        },
    },
    computed: {
        rows() {
            return this.items.length
        },
    },
}
</script>
