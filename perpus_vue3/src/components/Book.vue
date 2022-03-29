<template>
    <main>
        <div class="container-fluid px-4">
            <h2 class="mt-4">Book</h2>
            <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item"><router-link to="/home">Home</router-link></li>
                <li class="breadcrumb-item active">Book</li>
            </ol>

            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table me-1"></i>
                    List Book

                    <button @click="Add()" data-bs-toggle="modal" data-bs-target="#book_modal" class="btn btn-primary btn-sm float-end"><i class="fas fa-plus fa-fw"></i> Add Book</button>
                </div>
                <div class="card-body">
                    <table id="book_table" class="table table-responsive table-striped table-hover">
                        <thead>
                            <tr>
                                <th>BOOK ID</th>
                                <th>COVER</th>
                                <th>BOOK NAME</th>
                                <th>AUTHOR</th>
                                <th>DESC</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>BOOK ID</th>
                                <th>COVER</th>
                                <th>BOOK NAME</th>
                                <th>AUTHOR</th>
                                <th>DESC</th>
                                <th>ACTION</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr v-for="(lb, index) in list_book" :key="lb.book_id">
                                <td>{{ index+1 }}</td>
                                <td>
                                    <img v-if="lb.image !== null" :src="$url + '/images/' + lb.image" width="150">
                                    <button v-else class="btn btn-sm btn-warning" @click="Edit(lb)" data-bs-toggle="modal" data-bs-target="#bookcover_modal" ><i class="fas fa-image fa-fw"></i></button>
                                </td>
                                <td>{{ lb.book_name }}</td>
                                <td>{{ lb.author }}</td>
                                <td>{{ lb.desc }}</td>
                                <td>
                                    <button class="btn btn-sm btn-info" @click="Edit(lb)" data-bs-toggle="modal" data-bs-target="#book_modal" ><i class="fas fa-pencil-alt fa-fw"></i></button>&nbsp;
                                    <button class="btn btn-sm btn-danger" @click="Delete(lb.book_id)"><i class="fas fa-trash-alt fa-fw"></i></button>
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="book_modal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-md bg-primary">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Book Data</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="book_name" class="form-label">Book Name</label>
                            <input type="text" class="form-control" id="book_name" v-model="book_name" placeholder="Book Name">
                        </div>

                        <div class="mb-3">
                            <label for="author" class="form-label">Author</label>
                            <input type="text" class="form-control" id="author" v-model="author" placeholder="Author">
                        </div>

                        <div class="mb-3">
                            <label for="desc" class="form-label">Description</label>
                            <textarea class="form-control" id="desc" v-model="desc" rows="3"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" @click="Save()" data-bs-dismiss="modal">Submit</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="bookcover_modal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Book Cover</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <div class="mb-3">
                            <label for="book_cover" class="form-label">Book Cover</label>
                            <input type="file" class="form-control" id="book_cover" @change="uploadCover($event)">
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" @click="Upload(book_id)" data-bs-dismiss="modal">Submit</button>
                    </div>
                </div>
            </div>
        </div>

    </main>
</template>
<script>
export default {
    data : function(){
        return {
            book_id: "",
            book_name: "",
            author: "",
            desc: "",
            book_cover: "",
            action: "",
            list_book: [],
        }
    },
    methods: {
        getData: function(){
            //token
            let token = {
                headers : { "Authorization" : "Bearer " + localStorage.getItem("Authorization")}
            }
            this.axios.get("/Book", token)
            .then( response => {
                if(response.data.status !== 0){
                    this.list_book = response.data;
                } else {
                    this.$store.commit('logout')
                    this.$router.push('/login')
                }
                
            })
        },
        Add: function() {
            this.book_id = ""
            this.book_name = ""
            this.author = ""
            this.desc = ""
            this.action = "insert"
        },
        Edit: function(lb){
            this.book_id = lb.book_id
            this.book_name = lb.book_name
            this.author = lb.author
            this.desc = lb.desc
            this.action = "update"
        },
        uploadCover: function(e){
            this.book_cover = e.target.files[0]
        },
        Upload: function(id){
            let token = {
                headers : { 
                    "Authorization" : "Bearer " + localStorage.getItem("Authorization"), 
                    'Content-Type' : 'multipart/form-data',
                }
            }

            let form  = new FormData()
            form.append("book_cover", this.book_cover)

            this.axios.post('/Book/UploadCover/'+ id, form, token)
            .then( response => {
                this.$swal({
                    title: 'Success!',
                    text: response.data.message,
                    icon: 'success',
                    confirmButtonText: 'OK'
                })

                this.getData()
            })

        },
        Save: function() {
            //mapping header token
            let token = {
                headers : { 
                    "Authorization" : "Bearer " + localStorage.getItem("Authorization")
                }
            }

            //mapping data
            let form  = {
                //backend       //state
                'book_name': this.book_name,
                'author': this.author,
                'desc': this.desc,
                'book_cover' : this.book_cover
            }

            if(this.action === 'insert'){ //POST

                this.axios.post('/Book', form, token)
                .then( response => {
                   this.$swal({
                        title: 'Success!',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                })

            } else { //PUT
                this.axios.put('/Book/' + this.book_id, form, token)
                .then( response => {
                    this.$swal({
                        title: 'Success!',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                })
            }

            this.getData()
        },
        Delete: function(book_id){
            //mapping header token
            let token = {
                headers : { "Authorization" : "Bearer " + localStorage.getItem("Authorization")}
            }

            this.$swal({
                title: 'Hapus Data Buku',
                text: 'Apakah anda yakin menghapus data ini?',
                icon: 'warning',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Ya',
                denyButtonText: `Tidak`,
            }).then((result) => {
                if (result.isConfirmed) {
                     this.axios.delete('/Book/' + book_id, token)
                    .then( response => {

                        this.$swal({
                            title: 'Success!',
                            text: response.data.message,
                            icon: 'success',
                            confirmButtonText: 'OK'
                        })

                        this.getData()
                    })

                    //Swal('Saved!', '', 'success')
                } else if (result.isDenied) {
                    this.$swal({
                        title: 'Batal!',
                        text: 'Data tidak jadi dihapus',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }
            })

        }
    },
    created(){
        this.getData()
    },
}
</script>
