<template>
    <div class="mb-5 pb-5">
        <!-- header -->
        <Header />
        <!-- content -->
        <b-container class="bg-white p-3">
            <!-- search -->
            <b-container fluid>
                <b-row>
                    <b-col cols="6" class="mt-4">
                        <b-input-group prepend="搜尋" class="mb-2 mr-sm-2 mb-sm-0">
                            <b-form-input id="inline-form-input-username" placeholder="工號、姓名"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
            </b-container>
            <!-- action btns -->
            <b-container class="mt-4 mb-2 d-flex" fluid>
                <div class="me-2">
                    <b-button v-b-modal.modal-prevent-closing size="sm" variant="primary">
                        <b-icon icon="plus" aria-hidden="true"></b-icon>
                    </b-button>
                    <b-modal
                        id="modal-prevent-closing"
                        ref="modal"
                        title="增作業人員"
                        @show="resetModal"
                        @hidden="resetModal"
                        @ok="handleOk"
                    >
                        <form ref="form" @submit.stop.prevent="handleSubmit">
                            <b-form-group label="工號" label-for="name-input" invalid-feedback="Name is required">
                                <b-form-input id="name-input" v-model="id" required></b-form-input>
                            </b-form-group>
                            <b-form-group label="姓名" label-for="name-input" invalid-feedback="Name is required">
                                <b-form-input id="name-input" v-model="name" required></b-form-input>
                            </b-form-group>
                        </form>
                    </b-modal>
                </div>

                <b-button size="sm" class="mb-2 me-2" variant="secondary">
                    <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
                </b-button>
                <b-button size="sm" class="mb-2 me-2" variant="danger">
                    <b-icon icon="trash" aria-hidden="true"></b-icon>
                </b-button>
                <!-- 時器 -->
                <div class="ms-auto d-flex align-items-center">
                    <span v-if="invalidSetIntervalMsg" class="me-2" style="color: red; width: 500px">{{
                        invalidSetIntervalMsg
                    }}</span>
                    <b-form-input v-model="_createEmployeeTime" size="sm"></b-form-input>
                    <b-button @click="autoCreateEmployee" size="sm" class="ms-2" variant="info">
                        <b-icon v-if="!intervalId" icon="clock" aria-hidden="true"></b-icon>
                        <b-icon v-else animation="spin-reverse-pulse" icon="clock" aria-hidden="true"></b-icon>
                    </b-button>
                </div>
            </b-container>
            <!-- table -->
            <div>
                <b-table
                    bordered
                    selectable
                    responsive
                    select-mode="multi"
                    hover
                    :items="employee"
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
                        <b-button
                            @click="handleEdit(data)"
                            style="background-color: #256d85; font-size: 0.8rem"
                            size="sm"
                        >
                            <b-icon icon="pencil" aria-hidden="true" variant=""></b-icon
                        ></b-button>
                    </template>
                </b-table>
                <b-row>
                    <!-- <b-col class="me-auto"> 11</b-col> -->
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
        </b-container>
        <!-- footer -->
        <Footer />
    </div>
</template>
<script>
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import { getAccount } from '../plugins/apiInstance'
import { getCurrentDateTime } from '../plugins/func'

export default {
    data() {
        return {
            perpage: 6,
            currentPage: 1,
            invalidSetIntervalMsg: '',
            id: '',
            name: '',
            createEmployeeTime: '',
            intervalId: null,
            counter: 0,
            nameState: '',
            fields: [
                {
                    key: 'id',
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
            employee: [
                { id: 40, name: 'Dickerson' },
                { id: 21, name: 'Larsen' },
                { id: 89, name: 'Geneva' },
                { id: 38, name: 'Jami' },
            ],
        }
    },
    computed: {
        rows() {
            return this.employee.length
        },
        _createEmployeeTime: {
            get() {
                return this.createEmployeeTime
            },
            set(value) {
                if (value > 0) {
                    this.createEmployeeTime = value
                    return
                }
                if (value === '') {
                    this.invalidSetIntervalMsg = ''
                    return
                }
                this.invalidSetIntervalMsg = '需要輸入數字，數字不得為0或負值'
            },
        },
    },
    components: {
        Header,
        Footer,
    },
    methods: {
        onRowSelected(items) {
            console.log('a')
        },
        resetModal() {},
        handleOk() {
            console.log(this.id, this.name)
        },
        autoCreateEmployee() {
            if (this.createEmployeeTime === '') return
            if (this.intervalId) {
                clearInterval(this.intervalId)
                this.intervalId = null
                return
            }
            this.intervalId = setInterval(() => {
                this.counter++
                this.employee.push({ id: `${Date.now()}-${this.counter}`, name: getCurrentDateTime() })
                console.log('run')
            }, this._createEmployeeTime)
        },
        handleEdit(data) {
            console.log(data.item.id, data.item.name)
        },
    },
    mounted() {
        getAccount({ headers: {} })
            .then((res) => {
                // this.employee = res.data
                console.log(res)
            })
            .catch((err) => {})
    },
    async beforeRouteUpdate() {
        console.log('run router')
    },
}
</script>
<style scoped></style>
