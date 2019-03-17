Vue.component('card-article', {
    props: ['article'],
    methods: {
        updateArticle(article){
            this.$emit('update-article', article)
        },
        deleteArticle(id){
            this.$emit('delete-article', id)
        }
    },
    template: `
    <div>
        <div class="card" id="article-card" >
            <img class="card-img-top" :src="article.link" alt="Card image cap">
            <div class="card-body">
                <h2 class="card-title">
                    {{article.title}}
                </h2>
                <div v-html="article.content">
                </div>
                <br>
                <p class="card-text" id="createdAt">
                    {{article.created_at.slice(0,10)}}
                </p>
                <p class="card-text" id="author">
                    {{article.user_id.first_name}} {{article.user_id.last_name}}
                </p>
                <button class="card-link btn" @click="updateArticle(article)">Update
                    Article</button>
                <button class="card-link btn" @click="deleteArticle(article._id)">Delete
                    Article</button>
            </div>
        </div>
        <br>
    </div>
    
    `
})