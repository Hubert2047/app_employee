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
                <b-button @click="onEdit(data)" style="background-color: #256d85; font-size: 0.8rem" size="sm">
                    <b-icon icon="pencil" aria-hidden="true"></b-icon
                ></b-button>
            </template>
        </b-table>

        <b-modal
            header-bg-variant="secondary"
            header-text-variant="light"
            id="editModal"
            ref="modal"
            :hide-header-close="true"
            title="編輯作業人員"
            @ok="handleSubmitEditEmployee"
        >
            <!-- <form ref="form" @submit.stop.prevent="handleSubmit"> -->

            <form ref="form">
                <b-form-group style="color: #f94c66" class="mb-2" label="＊ 工號" invalid-feedback="Name is required">
                    <b-form-input id="name-input" v-model="employee.number" required></b-form-input>
                </b-form-group>
                <b-form-group style="color: #f94c66" label="＊ 姓名" invalid-feedback="Name is required">
                    <b-form-input id="name-input" v-model="employee.name" required></b-form-input>
                </b-form-group>
            </form>
        </b-modal>

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
            employee: {
                name: '',
                number: '',
            },
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
            this.$emit('rowSelected', items)
        },
        onEdit(data) {
            this.employee = data.item
            this.$bvModal.show('editModal')
        },
        handleSubmitEditEmployee() {
            console.log(this.employee)
        },
    },
    computed: {
        rows() {
            return this.items.length
        },
    },
}
</script>
