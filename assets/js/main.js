function showForm() {
    let html = `
    <div class="row">
        <div class="col-sm-4">
            <label for="Article Title">Title</label>
            <input type="text" class="form-control" placeholder="Your Title" style="font-weight:bold">
        </div>
    </div>
    <br>
    <div id="froala-editor">
        <p></p>
    </div>
    <br/>
    <div id="preview" class="fr-view">
        <p></p>
    </div>
    <br>
    <button class="btn btn-danger">SUBMIT</button>
    `

    $('#main-right').html(html)
    $('div#froala-editor').froalaEditor()
        .on('froalaEditor.contentChanged', function (e, editor) {
            $('#preview').html(editor.html.get());
        })
}

function showAllArticle() {
    let html = `
    <div class="container col-sm-12">
        <div class="row">
            <div class="col-sm-6">
                <div class="card" id="article-card" style="width: 48rem;">
                    <div class="card-body">
                        <h5 class="card-title">Article Title</h5>
                        <p class="card-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Fugiat saepe doloribus ad voluptate tenetur officiis. 
                        Ad voluptatibus eius quam reiciendis deserunt distinctio illum modi 
                        nostrum autem ipsa quas tempore quo sit, aut, beatae maiores perspiciatis provident laborum, 
                        itaque necessitatibus cum? 
                        Nesciunt quidem libero quisquam dolor, impedit quaerat ipsam maiores error?
                        </p>
                        <a href="#" class="card-link">Update Article</a>
                        <a href="#" class="card-link">Delete Article</a>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="card" id="article-card" style="width: 48rem;">
                    <div class="card-body">
                        <h5 class="card-title">Article Title</h5>
                        <p class="card-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Fugiat saepe doloribus ad voluptate tenetur officiis. 
                        Ad voluptatibus eius quam reiciendis deserunt distinctio illum modi 
                        nostrum autem ipsa quas tempore quo sit, aut, beatae maiores perspiciatis provident laborum, 
                        itaque necessitatibus cum? 
                        Nesciunt quidem libero quisquam dolor, impedit quaerat ipsam maiores error?
                        </p>
                        <a href="#" class="card-link">Update Article</a>
                        <a href="#" class="card-link">Delete Article</a>
                    </div>
                </div>
            </div>
        </div>
    </div><br>
    `

    for (let i = 0; i < 3; i++) {
        html += html
    }
    $('#main-right').empty()
    $('#main-right').html(html)
}