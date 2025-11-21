import {Link} from "react-router-dom"

export default function Navbar(){
    return(
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
     <div className="navbar-nav">
        <Link className="nav-link active" aria-current="page" to="/" >Beranda </Link>
        <Link className="nav-link" to="/peserta">peserta </Link>
        
        <Link className="nav-link disabled" aria-disabled="true" >Disabled </Link>
      </div>
    </div>
  </div>
</nav>
    )
}