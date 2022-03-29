<template>
    <main>
        <div class="container-fluid px-4">
            <h2 class="mt-4">Students</h2>
            <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item"><router-link to="/home">Home</router-link></li>
                <li class="breadcrumb-item active">Students</li>
            </ol>

            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table me-1"></i>
                    List Students

                    <button @click="Add()" data-bs-toggle="modal" data-bs-target="#student_modal" class="btn btn-primary btn-sm float-end"><i class="fas fa-plus fa-fw"></i> Add student</button>
                </div>
                <div class="card-body">
                    <table id="student_table" class="table table-responsive table-striped table-hover">
                        <thead>
                            <tr>
                                <th>NO</th>
                                <th>NAME</th>
                                <th>DOB</th>
                                <th>GENDER</th>
                                <th>ADDRESS</th>
                                <th>CLASS</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>NO</th>
                                <th>NAME</th>
                                <th>DOB</th>
                                <th>GENDER</th>
                                <th>ADDRESS</th>
                                <th>CLASS</th>
                                <th>ACTION</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr v-for="(ls, index) in list_student" :key="ls.student_id">
                                <td>{{ index+1 }}</td>
                                <td>{{ ls.student_name }}</td>
                                <td>{{ ls.date_of_birth }}</td>
                                <td>
                                    <span class="badge bg-info" v-if="ls.gender === 'L'">Laki-Laki</span>
                                    <span class="badge bg-warning" v-if="ls.gender === 'P'">Perempuan</span>
                                </td>
                                <td>{{ ls.address }}</td>
                                <td><span class="badge bg-dark" >{{ ls.class_name + ' '+ ls.group }}</span></td>
                                <td>
                                    <button class="btn btn-sm btn-info" @click="Edit(ls)" data-bs-toggle="modal" data-bs-target="#student_modal" ><i class="fas fa-pencil-alt fa-fw"></i></button>&nbsp;
                                    <button class="btn btn-sm btn-danger" @click="Delete(ls.student_id)"><i class="fas fa-trash-alt fa-fw"></i></button>
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="student_modal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-md bg-primary">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Student Data</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="student_name" class="form-label">Name</label>
                            <input type="text" class="form-control" id="student_name" v-model="student_name" placeholder="student Name">
                        </div>
                        <div class="mb-3">
                            <label for="dob" class="form-label">DOB</label>
                            <input type="date" class="form-control" id="dob" v-model="dob" placeholder="Date of Birth">
                        </div>

                        <div class="mb-3">
                            <label for="author" class="form-label">Gender</label>
                            <select class="form-control" v-model="gender">
                                <option value="" disabled>-- Choose Gender --</option>
                                <option value="L">Laki-Laki</option>
                                <option value="P">Perempuan</option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label for="desc" class="form-label">Address</label>
                            <textarea class="form-control" id="address" v-model="address" rows="3"></textarea>
                        </div>

                        <div class="mb-3">
                            <label for="author" class="form-label">Class</label>
                            <select class="form-control" v-model="class_id">
                                <option value="" disabled>-- Choose Class --</option>
                                <option v-for="c in list_class" :key="c" v-bind:value="c.class_id">{{ c.class_name }} - {{ c.group }}</option>
                            </select>
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
            student_id: "",
            student_name: "",
            dob: "",
            gender: "",
            address: "",
            action: "",
            class_id: "",
            list_student: [],
            list_class: []
        }
    },
    methods: {
        getData: function(){
            let token = {
                headers : { "Authorization" : "Bearer " + localStorage.getItem("Authorization")}
            }
            this.axios.get("/Students", token)
            .then( response => {
                this.list_student = response.data;
            })
        },
        getClass: function(){
            let token = {
                headers : { "Authorization" : "Bearer " + localStorage.getItem("Authorization")}
            }
            this.axios.get("/Grade", token)
            .then( response => {
                this.list_class = response.data;
            })
        },
        Add: function() {
            this.student_id = ""
            this.student_name = ""
            this.dob = ""
            this.gender = ""
            this.address = ""
            this.class_id = ""
            this.action = "insert"

            this.getClass()
        },
        Edit: function(ls){
            this.student_id = ls.student_id
            this.student_name = ls.student_name
            this.dob = ls.date_of_birth
            this.gender = ls.gender
            this.address = ls.address
            this.class_id = ls.class_id
            this.action = "update"

            this.getClass()
        },
        Save: function() {
            let token = {
                headers : { 
                    "Authorization" : "Bearer " + localStorage.getItem("Authorization")
                }
            }

            let form  = {
                'student_name': this.student_name,
                'date_of_birth': this.dob,
                'gender': this.gender,
                'address': this.address,
                'class_id': this.class_id,
            }

            if(this.action === 'insert'){ //POST

                this.axios.post('/Students', form, token)
                .then( response => {
                   this.$swal({
                        title: 'Success!',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                })

            } else { //PUT
                this.axios.put('/Students/' + this.student_id, form, token)
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
        Delete: function(student_id){
            //mapping header token
            let token = {
                headers : { "Authorization" : "Bearer " + localStorage.getItem("Authorization")}
            }

            this.$swal({
                title: 'Hapus Data Student',
                text: 'Apakah anda yakin menghapus data ini?',
                icon: 'warning',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Ya',
                denyButtonText: `Tidak`,
            }).then((result) => {
                if (result.isConfirmed) {
                     this.axios.delete('/Students/' + student_id, token)
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
