<template>
    <main>
        <div class="container-fluid px-4">
            <h2 class="mt-4">Grade</h2>
            <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item"><router-link to="/home">Home</router-link></li>
                <li class="breadcrumb-item active">Grade</li>
            </ol>

            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table me-1"></i>
                    List Grade

                    <button @click="Add()" data-bs-toggle="modal" data-bs-target="#grade_modal" class="btn btn-primary btn-sm float-end"><i class="fas fa-plus fa-fw"></i> Add Grade</button>
                </div>
                <div class="card-body">
                    <table id="grade_table" class="table table-responsive table-striped table-hover">
                        <thead>
                            <tr>
                                <th>NO</th>
                                <th>CLASS NAME</th>
                                <th>GROUP</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>NO</th>
                                <th>CLASS NAME</th>
                                <th>GROUP</th>
                                <th>ACTION</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr v-for="(grade, index) in grades" :key="index">
                                <td>{{ index+1 }}</td>
                                <td>{{ grade.class_name }}</td>
                                <td>{{ grade.group }}</td>
                                <td>
                                    <button class="btn btn-sm btn-info" @click="Edit(grade)" data-bs-toggle="modal" data-bs-target="#grade_modal" ><i class="fas fa-pencil-alt fa-fw"></i></button>&nbsp;
                                    <button class="btn btn-sm btn-danger" @click="Delete(grade.class_id)"><i class="fas fa-trash-alt fa-fw"></i></button>
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="grade_modal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-md bg-primary">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Grade Data</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="class_name" class="form-label">Class Name</label>
                            <input type="text" class="form-control" id="class_name" v-model="class_name" placeholder="Class Name">
                        </div>

                        <div class="mb-3">
                            <label for="group" class="form-label">Group</label>
                            <input type="text" class="form-control" id="group" v-model="group" placeholder="Group">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" @click="Save()" data-bs-dismiss="modal">Submit</button>
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
            class_id: "",
            class_name: "",
            group: "",
            action: "",
            grades: [],
        }
    },
    methods: {
        getData: function(){
            //token
            let token = {
                headers : { "Authorization" : "Bearer " + localStorage.getItem("Authorization")}
            }
            this.axios.get("/Grade", token)
            .then( response => {
                if(response.data.status !== 0){
                    this.grades = response.data;
                } else {
                    this.$store.commit('logout')
                    this.$router.push('/login')
                }
            })
        },
        Add: function() {
            this.class_id = ""
            this.class_name = ""
            this.group = ""
            this.action = "insert"
        },
        Edit: function(grade){
            this.class_id = grade.class_id
            this.class_name = grade.class_name
            this.group = grade.group
            this.action = "update"
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
                'class_name': this.class_name,
                'group': this.group,
            }

            if(this.action === 'insert'){ //POST

                this.axios.post('/Grade', form, token)
                .then( response => {
                   this.$swal({
                        title: 'Success!',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                })

            } else { //PUT
                this.axios.put('/Grade/' + this.class_id, form, token)
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
        Delete: function(class_id){
            //mapping header token
            let token = {
                headers : { "Authorization" : "Bearer " + localStorage.getItem("Authorization")}
            }

            this.$swal({
                title: 'Hapus Data Grade',
                text: 'Apakah anda yakin menghapus data ini?',
                icon: 'warning',
                showDenyButton: true,
                showCancelbutton: false,
                confirmButtonText: 'Ya',
                denyButtonText: `Tidak`,
            }).then((result) => {
                if (result.isConfirmed) {
                     this.axios.delete('/Grade/' + class_id, token)
                    .then( response => {

                        this.$swal({
                            title: 'Success!',
                            text: response.data.message,
                            icon: 'success',
                            confirmButtonText: 'OK'
                        })

                        this.getData()
                    })
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
