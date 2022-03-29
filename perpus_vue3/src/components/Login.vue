<template>
    <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-5">
                                <div class="card shadow-lg border-0 rounded-lg mt-5">
                                    <div class="card-header"><h3 class="text-center font-weight-light my-4">Login</h3></div>
                                    <div class="card-body">
                                        <p>{{ message }}</p>
                                        <br>
                                        <form>
                                            <div class="form-floating mb-3">
                                                <input class="form-control" v-model="email" id="inputEmail" type="email" placeholder="name@example.com" />
                                                <label for="inputEmail">Email address</label>
                                            </div>
                                            <div class="form-floating mb-3">
                                                <input class="form-control" v-model="kataSandi" id="inputPassword" type="password" placeholder="Password" />
                                                <label for="inputPassword">Password</label>
                                            </div>
                                            <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <a class="btn btn-primary" href="#" @click="Login">Login</a>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div id="layoutAuthentication_footer">
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid px-4">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">Copyright &copy; Your Website 2021</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
</template>
<script>
export default {
    //state 
    data : function(){
        return {
            email: "",
            kataSandi: "",
            message: "",
        }
    },
    methods: {
        Login: function(){
            //
            this.message = "Mohon tunggu...";
            //mapping data post
            let data_login = {
                //sesuai API    //sesuai state
                "email":        this.email,
                "password":     this.kataSandi
            }

            //post data
            this.axios.post('/Login', data_login)
            .then( response => {
                //kondisi status login
                this.message = response.data.message;
                if(response.data.status === 1){
                    this.$store.commit("setToken", response.data.token)
                    this.$store.commit("setUser", response.data.data[0])

                    this.$router.push('/home')
                }

            })

        }
    }
}
</script>