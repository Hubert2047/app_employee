<template>
    <div class="mb-5 pb-5">
        <!-- <button @click="test">click me</button> -->
        <!-- header -->
        <Header />
        <!-- content -->
        <b-container class="bg-white p-3">
            <!-- search -->
            <b-container fluid>
                <b-row>
                    <b-col cols="6" class="mt-4">
                        <b-input-group prepend="搜尋" class="mb-2 mr-sm-2 mb-sm-0">
                            <b-form-input
                                v-model="searchWord"
                                id="inline-form-input-username"
                                placeholder="工號、姓名"
                            ></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
            </b-container>
            <!-- action btns -->
            <b-container class="mt-4 mb-2 d-flex" fluid>
                <b-row>
                    <b-col>
                        <div class="d-flex">
                            <!-- add employee btn -->
                            <div class="me-2">
                                <b-button v-b-modal.modal-prevent-closing size="sm" variant="primary">
                                    <b-icon icon="plus" aria-hidden="true"></b-icon>
                                </b-button>

                                <b-modal
                                    header-bg-variant="secondary"
                                    header-text-variant="light"
                                    id="modal-prevent-closing"
                                    ref="modal"
                                    hide-header-close="true"
                                    title="增作業人員"
                                    @show="resetModal"
                                    @hidden="resetModal"
                                    modal-ok="yes"
                                    @ok="handleOk"
                                >
                                    <!-- <form ref="form" @submit.stop.prevent="handleSubmit"> -->

                                    <form ref="form">
                                        <b-form-group
                                            label="工號"
                                            label-for="name-input"
                                            invalid-feedback="Name is required"
                                        >
                                            <b-form-input id="name-input" v-model="employee.id" required></b-form-input>
                                        </b-form-group>
                                        <b-form-group
                                            label="姓名"
                                            label-for="name-input"
                                            invalid-feedback="Name is required"
                                        >
                                            <b-form-input
                                                id="name-input"
                                                v-model="employee.name"
                                                required
                                            ></b-form-input>
                                        </b-form-group>
                                    </form>
                                </b-modal>
                            </div>
                            <!-- edit btn -->
                            <!-- <b-button size="sm" class="mb-2 me-2" variant="secondary">
                                <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
                            </b-button> -->
                            <!-- delete btn -->
                            <b-button @click="deleteEmployee" size="sm" class="mb-2 me-2" variant="danger">
                                <b-icon icon="trash" aria-hidden="true"></b-icon>
                            </b-button>
                        </div>
                    </b-col>
                    <b-col class="ms-auto">
                        <!-- 時器 -->
                        <div class="d-flex align-items-center">
                            <span v-if="invalidSetIntervalMsg" class="me-2" style="color: red; width: 500px">{{
                                invalidSetIntervalMsg
                            }}</span>
                            <b-form-input v-model="_createEmployeeTime" size="sm"></b-form-input>
                            <b-button @click="handleAutoCreateEmployee" size="sm" class="ms-2" variant="info">
                                <b-icon v-if="!intervalId" icon="clock" aria-hidden="true"></b-icon>
                                <b-icon v-else animation="spin-reverse-pulse" icon="clock" aria-hidden="true"></b-icon>
                            </b-button>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
            <!-- table -->
            <Table :items="employeeDisplay" :perpage="perpage" :currentPage="currentPage" />
        </b-container>
        <!-- footer -->
        <Footer />
    </div>
</template>
<script>
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import Table from '../components/Table.vue'
import { createEmployee, deleteEmployee, getEmployee } from '../plugins/apiInstance'
import { compareTwoString, getCurrentDateTime } from '../plugins/func'

export default {
    data() {
        return {
            searchWord: '',
            perpage: 6,
            currentPage: 1,
            invalidSetIntervalMsg: '',
            employee: {
                number: '',
                name: '',
            },
            intervalId: null,
            createEmployeeTime: '',
            counter: 0,
            employeeData: [
                // { number: '2', name: 'John' },
                // { number: '3', name: 'John1' },
            ],
            employeeDisplay: [
                // { number: '2', name: 'John' },
                // { number: '3', name: 'John1' },
            ],
            rowSelected: [],
        }
    },
    computed: {
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
    watch: {
        searchWord(newValue) {
            this.searchEmployee(newValue)
        },
        employeeData(newValue) {
            this.employeeDisplay = [...newValue]
            this.searchWord = ''
        },
    },
    methods: {
        searchEmployee(keyWord) {
            if (keyWord === '') {
                this.employeeDisplay = this.employeeData
                return
            }
            let keyWordLowCase = keyWord.toLowerCase()
            this.employeeDisplay = this.employeeData.filter((employee) => {
                const { name, number } = employee
                return (
                    compareTwoString(keyWordLowCase, number.toLowerCase()) ||
                    compareTwoString(keyWordLowCase, name.toLowerCase())
                )
            })
        },
        resetModal() {},
        handleOk() {
            console.log(this.id, this.name)
        },
        handleAutoCreateEmployee() {
            if (this.createEmployeeTime === '') {
                this.invalidSetIntervalMsg = '需要輸入數字，數字不得為0或負值'
                return
            }
            if (this.intervalId) {
                clearInterval(this.intervalId)
                this.intervalId = null
                return
            }
            this.intervalId = setInterval(() => {
                this.counter++
                let newEmployee = { name: getCurrentDateTime(), number: `${Date.now()}-${this.counter}` }
                createEmployee(newEmployee).then(() => {
                    this.employeeData.push(newEmployee)
                })
                console.log('run')
            }, this._createEmployeeTime)
        },

        deleteEmployee() {
            if (!this.rowSelected.length > 0) return
            console.log(this.rowSelected)
        },
    },
    created() {
        getEmployee({ headers: {} })
            .then((res) => {
                this.employeeData = res.data
                this.employeeDisplay = res.data
                console.log(res.data)
            })
            .catch((err) => {
                this.$router.push('/')
            })
    },
    destroyed() {
        if (this.intervalId) {
            clearInterval(this.intervalId)
        }
    },
    components: {
        Header,
        Footer,
        Table,
    },
}
</script>
<style scoped></style>
