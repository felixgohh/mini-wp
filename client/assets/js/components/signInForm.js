Vue.component('modal-signin', {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        signIn() {
            this.$emit('sign-in', {
                email: this.email,
                password: this.password
            })
        }, 
        hideSignIn() {
            $('#signInModal').modal('toggle')
        }
    },
    template: `
    <div class="modal fade" id="signInModal" tabindex="-1" role="dialog" aria-labelledby="signInModalTitle"
                aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content" id="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Sign In</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="signIn()">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input v-model="email" type="email" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input v-model="password" type="password" class="form-control">
                        </div>
                        <button type="submit" class="btn sign-in-button">SIGN IN</button>
                    </form>
                </div>
                <div class="modal-footer">
                    <br>
                    <div>
                        &nbsp; OR &nbsp;
                        <button type="button" data-dismiss class="btn sign-up-button" data-toggle="modal"
                            data-target="#signUpModal" @click="hideSignIn">
                            SIGN UP
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
})