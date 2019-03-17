Vue.component('my-article', {
    props: ['myArticleList'],
    template: `
    <div>
        <div class="container col-sm-12" v-for="article in myArticleList">
            <card-article v-bind:article="article" @update-article="$emit('update-article', $event)" @delete-article="$emit('delete-article', $event)"></card-article>
        </div>
    </div>
    `
})