<template>
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
            <b-form-group label="工號" label-for="name-input" invalid-feedback="Name is required">
                <b-form-input id="name-input" v-model="employee.id" required></b-form-input>
            </b-form-group>
            <b-form-group label="姓名" label-for="name-input" invalid-feedback="Name is required">
                <b-form-input id="name-input" v-model="employee.name" required></b-form-input>
            </b-form-group>
        </form>
    </b-modal>
</template>
<script>
export default {}
</script>
