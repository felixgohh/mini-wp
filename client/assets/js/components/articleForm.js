Vue.component('article-form', {
    data() {
        return {
            articleTitle: '',
            text: '',
            file: ''
        }
    },
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    methods: {
        submitArticle() {
            this.$emit('submit-article', {
                title: this.articleTitle,
                content: this.text,
                file: this.file,
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
            <fieldset>
                <div class="form-group mx-auto">
                    <label for="exampleInputFile"><b>Featured Image</b></label>
                    <br>
                    <input type="file" id="file" class="inputFile" ref="file" v-on:change="handleFileUpload" required/>
                </div>
            </fieldset>
        </div>

        <div class="row">
            <div class="col-sm-5">
                <label for="Article Title"><b>Title</b></label>
                <input type="text" class="form-control" placeholder="Your Title" style="font-weight:bold"
                    v-model="articleTitle">
            </div>
        </div>        

        <br>
        <label><b>Content</b></label>
        <wysiwyg v-model="text" />
        <br>
        <button class="btn submit-article" @click="submitArticle()">SUBMIT</button>
    </div>
    `
})