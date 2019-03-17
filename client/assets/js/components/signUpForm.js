Vue.component('modal-signup', {
    data() {
        return {
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        }
    },
    methods: {
        signUp() {
            this.$emit('sign-up', {
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
                password: this.password
            })
        }
    },
    template: `
    <div class="modal fade" id="signUpModal" tabindex="-1" role="dialog"
                aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content" id="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Sign Up</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="signUp()">
                        <div class="form-group">
                            <label for="exampleInputEmail1">First Name</label>
                            <input v-model="first_name" type="text" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Last Name</label>
                            <input v-model="last_name" type="text" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input v-model="email" type="email" class="form-control"
                                aria-describedby="emailHelp">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input v-model="password" type="password" class="form-control">
                        </div>
                        <button type="submit" class="btn sign-up-button">SIGN UP</button>
                    </form>
                </div>

            </div>
        </div>
    </div>
    `
})