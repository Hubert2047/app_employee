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
                    <b-col md="6" sm="12" class="mt-4">
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
            <b-container class="mt-4 mb-2 d-flex w-100 d-flex align-items-center justify-content-between" fluid>
                <div class="d-flex align-items-center">
                    <!-- add employee btn -->
                    <div style="margin-right: 10px">
                        <b-button v-b-modal.add-employee-modal size="sm" variant="primary">
                            <b-icon icon="plus" aria-hidden="true"></b-icon>
                        </b-button>
                        <!-- add employee modal -->
                        <b-modal
                            header-bg-variant="secondary"
                            header-text-variant="light"
                            id="add-employee-modal"
                            ref="modal"
                            :hide-header-close="true"
                            title="增作業人員"
                            @show="resetModal"
                            @hidden="resetModal"
                            @ok="handleAddEmployee"
                        >
                            <form ref="form">
                                <b-form-group
                                    style="color: #f94c66"
                                    class="mb-2"
                                    label="*   工號"
                                    invalid-feedback="Name is required"
                                >
                                    <b-form-input id="name-input" v-model="employee.number" required></b-form-input>
                                </b-form-group>
                                <b-form-group
                                    style="color: #f94c66"
                                    label="*  姓名"
                                    invalid-feedback="Name is required"
                                >
                                    <b-form-input id="name-input" v-model="employee.name" required></b-form-input>
                                </b-form-group>
                            </form>
                        </b-modal>
                    </div>
                    <!-- delete btn -->
                    <b-button
                        :disabled="!rowSelectedCount > 0"
                        @click="showDeleteEmployeeModal"
                        size="sm"
                        variant="danger"
                    >
                        <b-icon icon="trash" aria-hidden="true"></b-icon>
                    </b-button>
                    <!-- show delete employee submit modal -->
                    <b-modal
                        :hide-header-close="true"
                        @ok="handleDeleteEmployee"
                        v-model="isShowSubmitDeleteEmployeeModal"
                        >Hello From Modal!</b-modal
                    >
                </div>
                <!-- 時器 -->
                <div class="d-flex align-items-center justify-content-end">
                    <!-- <span v-if="invalidSetIntervalMsg" class="me-2" style="color: red; width: 600px">{{
                                invalidSetIntervalMsg
                            }}</span> -->
                    <b-form-input style="width: 100px" v-model="_createEmployeeTime" size="sm"></b-form-input>
                    <b-button @click="handleAutoCreateEmployee" size="sm" class="ms-2" variant="info">
                        <b-icon v-if="!intervalId" icon="clock" aria-hidden="true"></b-icon>
                        <b-icon v-else animation="spin-reverse-pulse" icon="clock" aria-hidden="true"></b-icon>
                    </b-button>
                </div>
                <!-- show 時器 error -->
                <b-toast :auto-hide-delay="3000" id="my-toast" variant="warning" solid>
                    <template v-slot:toast-title>
                        <div class="d-flex flex-grow-1 align-items-baseline">
                            <b-img blank blank-color="#ff5555" class="mr-2" width="12" height="12"></b-img>
                            <strong class="mr-auto">Notice!</strong>
                        </div>
                    </template>
                    {{ invalidSetIntervalMsg }}
                </b-toast>
            </b-container>
            <!-- table -->
            <Table
                @rowSelected="onRowSelected"
                :items="employeeDisplay"
                :perpage="perpage"
                :currentPage="currentPage"
            />
        </b-container>
        <!-- footer -->
        <Footer />
    </div>
</template>
<script>
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import Table from '../components/Table.vue'
import { createEmployee, handleDeleteEmployee } from '../plugins/apiInstance'
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
            isShowSubmitDeleteEmployeeModal: false,
            employeeData: [
                { number: '2', name: 'John' },
                { number: '3', name: 'John1' },
            ],
            employeeDisplay: [
                { number: '2', name: 'John' },
                { number: '3', name: 'John1' },
            ],
            rowSelected: [],
        }
    },
    computed: {
        rowSelectedCount() {
            return this.rowSelected.length
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
                this.invalidSetIntervalMsg = '需要輸入數字，數字不得為0或負值'
                this.$bvToast.show('my-toast')
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
        onRowSelected(rows) {
            this.rowSelected = rows
        },
        resetModal() {},
        validateEmployee() {
            if (this.employee.name === '' || this.employee.number === '') {
                return false
            }
            return true
        },
        handleAddEmployee() {
            if (!this.validateEmployee) return
            console.log(this.employee.number, this.employee.name)
        },
        handleAutoCreateEmployee() {
            if (this.createEmployeeTime === '') {
                this.invalidSetIntervalMsg = '需要輸入數字，數字不得為0或負值'
                this.$bvToast.show('my-toast')
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
        showDeleteEmployeeModal() {
            if (!this.rowSelectedCount > 0) return
            this.isShowSubmitDeleteEmployeeModal = true
        },
        handleDeleteEmployee() {
            this.rowSelected.forEach((x) => console.log(x.name))
            // console.log(this.rowSelected)
        },
    },
    created() {
        // getEmployee({ headers: {} })
        //     .then((res) => {
        //         this.employeeData = res.data
        //         this.employeeDisplay = res.data
        //         console.log(res.data)
        //     })
        //     .catch((err) => {
        //         this.$router.push('/')
        //     })
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
