Vue.component('update-form', {
    props: ['articleUpdate'],
    data() {
        return {
            articleTitleUpdate: '',
            text: '',
            file:  ''
        }
    },
    mounted() {
        this.articleTitleUpdate = this.articleUpdate.title
        this.text = this.articleUpdate.content
    },
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    methods: {
        updateArticle() {
            this.$emit('update-article', {
                title: this.articleTitleUpdate,
                content: this.text,
                file: this.file,
                id: this.articleUpdate._id
            })
        },
        handleFileUpload(event) {
            // this.file = event.file.files[0]
            console.log("masuk file upload", this.$refs.file.files)
            this.file = this.$refs.file.files[0];
        }
    },
    template: `
    <div class="article-form">
        <div>
            <img :src="articleUpdate.link" />
        </div>
        <div>
            <br>
            <fieldset>
                <div class="form-group mx-auto">
                    <label for="exampleInputFile"><b>Change Article Image</b></label>
                    <br>
                    <input type="file" id="file" class="inputFile" ref="file" v-on:change="handleFileUpload" required/>
                </div>
            </fieldset>
        </div>
        <div class="row">
            <div class="col-sm-4">
                <label for="Article Title"><b>Title</b></label>
                <input type="text" class="form-control" placeholder="Your Title" style="font-weight:bold"
                    v-model="articleTitleUpdate" >
            </div>
        </div>
        <br>
        <label><b>Content</b></label>
        <wysiwyg v-model="text" />        
        <br>
        <button class="btn update-article" @click="updateArticle()">UPDATE</button>
    </div>
    `
})