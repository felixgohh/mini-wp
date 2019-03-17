const baseURL = `http://localhost:3001`

// MY ARTICLE FEATURE IS NOT USEABLE

const app = new Vue({
    el: "#app",
    data: {
        articleTitle: '',
        articleContent: '',
        articleList: '',
        updateArticleId: '',
        articleUpdate: '',
        myArticleList: '',
        seenForm: false,
        seenArticle: false,
        seenUpdateForm: false,
        seenMyArticle: false,
        isLogin: false,
        seenHomepage: true
    },
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    methods: {
        showForm() {
            if (!this.seenForm) {
                this.seenMyArticle = false
                this.seenArticle = false
                this.seenUpdateForm = false
                this.seenForm = true
                this.seenHomepage = false
            }

        },
        showArticles() {
            if (!this.seenArticle) {
                this.seenArticle = true
                this.seenForm = false
                this.seenMyArticle = false
                this.seenUpdateForm = false
                this.seenHomepage = false
            }

            axios
                .get(`${baseURL}/articles`, {
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })
                .then(({ data }) => {
                    this.articleList = data
                })
                .catch(err => {
                    Swal.fire({
                        position: 'top',
                        type: 'warning',
                        title: 'Please sign in to your account to start sharing the good vibes',
                        showConfirmButton: false,
                        timer: 1800
                    })
                    console.log(err.response);
                })
        },
        submitArticle(payload) {

            let formData = new FormData()
            formData.append('image', payload.file)
            formData.append('title', payload.title)
            formData.append('content', payload.content)
            formData.append('userId', this.userId)

            axios
                .post(`${baseURL}/articles`, formData, {
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })
                .then(({ data }) => {
                    this.showArticles()
                })
                .catch(err => {
                    Swal.fire({
                        position: 'top',
                        type: 'warning',
                        title: 'Please sign in to your account to start sharing the good vibes',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    console.log(err.response);

                })
        },
        showUpdateForm(article) {
            this.articleUpdate = article
            this.updateArticleId = article._id
            this.seenUpdateForm = true
            this.seenForm = false
            this.seenArticle = false
            this.seenMyArticle = false
            this.seenHomepage = false

        },
        updateArticle(payload) {
            let formData = new FormData()
            if (payload.file == '') {
                formData.append('title', payload.title)
                formData.append('content', payload.content)
            } else {
                formData.append('image', payload.file)
                formData.append('title', payload.title)
                formData.append('content', payload.content)
            }

            axios
                .put(`${baseURL}/articles/${this.updateArticleId}`, formData, {
                    headers: {
                        access_token: localStorage.getItem('access_token'),
                        authorized: this.userId,
                        articleId: this.updateArticleId
                    }
                })
                .then(response => {
                    this.showMyArticles()

                })
                .catch(err => {
                    Swal.fire({
                        position: 'top',
                        type: 'warning',
                        title: 'Sorry, you are not allowed to update any articles that not belongs to you :)',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    console.log(err.response);

                })
        },
        deleteArticle(id) {
            axios
                .delete(`${baseURL}/articles/${id}`, {
                    headers: {
                        access_token: localStorage.getItem('access_token'),
                        authorized: this.userId,
                        articleId: id
                    }
                })
                .then(response => {
                    this.showArticles()

                })
                .catch(err => {
                    Swal.fire({
                        position: 'top',
                        type: 'warning',
                        title: 'Sorry, you are not allowed to delete any articles that not belongs to you :)',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    console.log(err);

                })
        },
        signIn(payload) {
            axios
                .post(`${baseURL}/users/signin`, {
                    email: payload.email,
                    password: payload.password
                })
                .then(({ data }) => {
                    localStorage.setItem('access_token', data.token)
                    $('#signInModal').modal('toggle')

                    this.userId = data.userId
                    this.showArticles()
                    this.isLogin = true

                    Swal.fire({
                        position: 'top',
                        type: 'success',
                        title: 'Successfully Logged In',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
                .catch(err => {
                    console.log(err);

                })
        },
        signInGoogle(payload) {
            axios
                .post(`${baseURL}/users/google`, {
                    id_token: payload
                })
                .then(({ data }) => {
                    console.log(data);

                    this.isLogin = true
                    this.userId = data.userId
                    localStorage.setItem('access_token', data.token)
                    this.showArticles()
                    Swal.fire({
                        position: 'top',
                        type: 'success',
                        title: 'Successfully Logged In',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
                .catch(err => {
                    console.log(err.response);
                })
        },
        signUp(payload) {
            axios
                .post(`${baseURL}/users/signup`, {
                    first_name: payload.first_name,
                    last_name: payload.last_name,
                    email: payload.email,
                    password: payload.password
                })
                .then(({ data }) => {
                    $('#signUpModal').modal('toggle')
                    $('#signInModal').modal('toggle')
                })
                .catch(err => {
                    console.log(err.response);

                })
        },
        submitImage(payload) {
            let formData = new FormData()
            formData.append('image', payload.file)
            formData.append('name', payload.name)

            axios
                .post(`${baseURL}/articles/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        access_token: localStorage.getItem('access_token')
                    }
                })
                .then(({ data }) => {
                    // console.log("Hasil Post:", data)

                })
                .catch(err => {
                    Swal.fire({
                        position: 'top',
                        type: 'warning',
                        title: 'Please sign in to your account to start sharing the good vibes',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    console.log(err.response)
                })
        },
        logOut() {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
            });
            localStorage.removeItem('access_token')
            Swal.fire({
                position: 'top',
                type: 'success',
                title: 'See Youu',
                showConfirmButton: false,
                timer: 1500
            })
            setTimeout(function(){ location.reload()}, 1000);
            
            this.isLogin = false
        },
        showMyArticles() {
            if (!this.seenMyArticle) {
                this.seenMyArticle = true
                this.seenForm = false
                this.seenUpdateForm = false
                this.seenArticle = false
            }

            axios
                .get(`${baseURL}/articles?search=${this.userId}`, {
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })
                .then(({ data }) => {
                    this.myArticleList = data
                })
                .catch(err => {
                    Swal.fire({
                        position: 'top',
                        type: 'warning',
                        title: 'Please sign in to your account to start sharing the good vibes',
                        showConfirmButton: false,
                        timer: 1800
                    })
                    console.log(err.response);

                })
        }
    }
})