<template>
    <div>
        <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <!-- Navbar Brand-->
            <router-link to="/home" class="navbar-brand ps-3" href="#">PerpusVue CLI.</router-link>
            <!-- Sidebar Toggle-->
            <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>
          
            <!-- Navbar-->
            <ul class="navbar-nav ms-auto me-4 me-lg-3">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="#!" @click="Logout">Logout</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div class="sb-sidenav-menu">
                        <div class="nav">
                            <router-link class="nav-link" to="/home">
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                Home
                            </router-link>
                            <div class="sb-sidenav-menu-heading">Master Data</div>
                            <router-link class="nav-link collapsed" to="/book">
                                <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                                Book
                            </router-link>
                            <router-link class="nav-link collapsed" to="/grade">
                                <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                                Grade
                            </router-link>
                            <router-link class="nav-link collapsed" to="/student">
                                <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                                Student
                            </router-link>
                            <router-link class="nav-link collapsed" to="/book_borrow">
                                <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                                Borrowing
                            </router-link>
                        </div>
                    </div>
                    <div class="sb-sidenav-footer">
                        <div class="small">Logged in as:</div>
                        {{ this.$store.state.user.name }}
                    </div>
                </nav>
            </div>
            <div id="layoutSidenav_content">
                <router-view></router-view>

                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid px-4">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">Copyright &copy; Your Website 2022</div>
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
    </div>
</template>
<script>
export default {
   methods: {
       Logout: function(){
           this.$store.commit('logout')
           this.$router.push('/login')
       }
   },
}
</script>
