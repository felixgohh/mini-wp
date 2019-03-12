const baseURL = `http://localhost:3000/articles`

// MY ARTICLE FEATURE IS NOT USEABLE

const app = new Vue({
    el: "#main-content",
    data: {
        articleTitle: '',
        articleContent: '',
        articleList: '',
        updateArticleId: '',
        articleTitleUpdate: '',
        articleContentUpdate: '',
        seenForm: false,
        seenArticle: false,
        seenUpdateForm: false
    },
    methods: {
        showForm: function () {
            if (!this.seenForm) {
                this.seenArticle = false
                this.seenUpdateForm = false
                this.seenForm = true
            }

        },
        showArticles: function () {
            if (!this.seenArticle) {
                this.seenArticle = true
                this.seenForm = false
                this.seenUpdateForm = false
            }
            axios
                .get(baseURL)
                .then(response => {
                    this.articleList = response.data
                })
                .catch(err => {
                    console.log(err);
                })
        },
        submitArticle() {
            let objCreate = {
                title: this.articleTitle,
                content: this.articleContent
            }

            axios
                .post(baseURL, objCreate)
                .then(response => {
                    this.showArticles()
                    this.articleTitle = ''
                    this.articleContent = ''
                })
                .catch(err => {
                    console.log(err);

                })
        },
        showUpdateForm(id) {
            axios
                .get(`${baseURL}/${id}`)
                .then(response => {
                    this.articleTitleUpdate = response.data.title
                    this.articleContentUpdate = response.data.content
                    this.updateArticleId = response.data._id

                    this.seenUpdateForm = true
                    this.seenForm = false
                    this.seenArticle = false

                })
                .catch(err => {
                    console.log(err);

                })
        },
        updateArticle() {
            let objUpdate = {
                title: this.articleTitleUpdate,
                content: this.articleContentUpdate
            }
            axios
                .put(`${baseURL}/${this.updateArticleId}`, objUpdate)
                .then(response => {
                    console.log(response.data);
                    this.showArticles()

                })
                .catch(err => {
                    console.log(err);

                })
        },
        deleteArticle(id) {
            axios
                .delete(`${baseURL}/${id}`)
                .then(response => {
                    console.log(response.data);
                    this.showArticles()

                })
                .catch(err => {
                    console.log(err);

                })
        }
    }
})