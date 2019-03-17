var googleUser = {}

Vue.component('navbar-miniwp', {
    props: ['isLogin'],
    data() {
        return {
            userId: ''
        }
    },
    methods: {
        logOut() {
            this.$emit('log-out')
        },
        onSuccess(googleUser) {
            console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
            var id_token = googleUser.getAuthResponse().id_token;
            this.$emit('sign-in-google', id_token)
        },
        renderButton() {
            gapi.signin2.render('my-signin2', {
                'scope': 'profile email',
                'width': 200,
                'height': 40,
                'longtitle': true,
                'theme': 'dark',
                'onsuccess': this.onSuccess,
                'onfailure': this.onFailure
            });
        },
        onFailure(error) {
            console.log(error);
        }
    },
    created() {
        gapi.load('auth2', function () {
            // Retrieve the singleton for the GoogleAuth library and set up the client.
            auth2 = gapi.auth2.init({
                client_id: '101586641533-90bqqbsuo54inquedna737cr7574sm48.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
                // Request scopes in addition to 'profile' and 'email'
                //scope: 'additional_scope'
            });
        });
    },
    mounted() {
        this.renderButton()
    },
    watch: {
        isLogin(val) {
            if (!val) {
                this.renderButton()
            }
        }
    },
    template: `
    <div>
        <div class="container col-sm-12 navbar-main">
            <div class="row">
                <div class="col-sm-2" id="navbar-left">
                </div>
                <div class="d-flex justify-content-end col-sm-10" id="navbar-right">
                    <div v-if="isLogin">
                        <button type="button" @click="$emit('log-out')" v-if="isLogin " class="btn signInButton">
                            SIGN OUT
                        </button>
                    </div>
                    <div v-else>
                            <div id="my-signin2"></div>
                            <br>
                            <button type="button" class="btn signInButton" data-toggle="modal" data-target="#signInModal">
                                SIGN IN
                            </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
})