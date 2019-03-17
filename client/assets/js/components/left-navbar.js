Vue.component('left-navbar', {
    methods: {
        showForm() {
            this.$emit('show-form')
        },
        showArticles() {
            this.$emit('show-articles')
        },
        showMyArticles() {
            this.$emit('show-my-articles')
        }
    },
    template: `
    <div class="col-sm-2" id="main-left">
            <center>
                <img src="https://i.imgur.com/VoPSIxM.png" alt="MiniWP Logo"
                    height="240px" width="200px" class="logo" /><br>
            </center>
            <br><br><br>
            <a href="#" @click="showForm">add article</a><br><br>
            <a href="#" @click="showMyArticles">my articles</a><br><br>
            <a href="#" @click="showArticles">show all articles</a>
    </div>
    `
})