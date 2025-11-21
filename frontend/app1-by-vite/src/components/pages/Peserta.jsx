import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import { useNavigate } from "react-router-dom";

export default function Peserta(){
      const [pesertas, setPesertas] = useState([]);
  const [loading, setLoading] = useState(true); // buatuh kejalasan atau butuh loading
  const [nama, setNama] = useState("");
  const [telpn, setTelpn] = useState("");
  const [kelas, setKelas] = useState("");
  const [jurusan, setJurusan] = useState("");
  const navigate = useNavigate();

const fecthData = () => {
    axios
      .get("http://localhost:3000/api/peserta")
      .then((response) => {
        setPesertas(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

    useEffect(() => {
    // alert ('hallo')
    fecthData();
  }, []);

    const handleDelete = (id) => {
    const confirmDelete = window.confirm("Apakah kamu yakin akan menghapus data ini?"); // ✅ konfirmasi dulu

  if (!confirmDelete) {
    return; // kalau user pilih "Cancel", hentikan proses
  }
    axios
      .delete(`http://localhost:3000/api/peserta/${id}`)
      .then((response) => {
        console.log(response.data);
        fecthData();
      })
      .catch((error) => {
        console.log("gagal menghapus data",error);
      })
      .finally(() => {
        
        setLoading(false);
      });
  };

 const handleEdit = (id) =>{
    navigate(`/edit-peserta/${id}`)
  
  }

   const handleSubmit = (e) => {
    // mencegah aksi dari default submit
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/peserta", {
        nama: nama,
        telpn: telpn,
        kelas: kelas,
        jurusan : jurusan,
      })
      .then((response) => {
        setNama("");
        setTelpn("");
        setKelas("");
        setJurusan("");

        console.log(response);
        fecthData();
      })
      .catch((error) => {
        console.error("gagal menambahkan data", error);
      })
      .finally(() => {
        const modalEl = document.getElementById("exampleModal");
        const modalInstance = Modal.getOrCreateInstance(modalEl);
        modalInstance.hide();
        document.body.classList.remove("modal-open");
        const backdrops = document.querySelectorAll(".modal-backdrop");
        backdrops.forEach((bd) => bd.remove());
        setLoading(false);
      });
  };
  if (loading) {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }






    return(
       <>
       <div className="container text-center">
         <div className="card mt-2">
          <h1>ini halaman Data siswa</h1>
          <div className="cardbody">
            <button
              type="button"
              className="btn btn-primary container"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Tambah Data
            </button>
            <hr />
            <br />
            <table className="table table-secondary table-striped">
              <thead>
                <tr>
                  <th scope="col">Nomer</th>
                  <th scope="col">Nama</th>
                  <th scope="col">Telphone</th>
                  <th scope="col">Kelas</th>
                  <th scope="col">Jurusan</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {pesertas.map((pesertas, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{pesertas.nama}</td>
                    <td>{pesertas.telpn}</td>
                    <td>{pesertas.kelas}</td>
                    <td>{pesertas.jurusan}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(pesertas.id)} // sesuaikan id sesuai API
                      >
                        Hapus
                      </button>
                        <br/>
                       <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleEdit(pesertas.id) }
                        // onClick={() => handleDelete(pesertas.id_siswa)} // sesuaikan id sesuai API
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
       </div>
       <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                {/* floating label */}

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="nama"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                  ></input>
                  <label htmlFor="floatingInput">Nama</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="telpn"
                    value={telpn}
                    onChange={(e) => setTelpn(e.target.value)}
                  ></input>
                  <label htmlFor="floatingEmail">Telephone</label>
                </div>
                 <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="kelas"
                    value={kelas}
                    onChange={(e) => setKelas(e.target.value)}
                  ></input>
                  <label htmlFor="floatingEmail">Kelas</label>
                </div>
                 <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="jurusan"
                    value={jurusan}
                    onChange={(e) => setJurusan(e.target.value)}
                  ></input>
                  <label htmlFor="floatingEmail">Jurusan</label>
                </div>
                
                {/* <div className="form-floating mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea"
                    style={{ height: "100px" }}
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                  ></textarea>
                  <label htmlFor="floatingTextarea">Alamat</label>
                </div> */}
                <button className="btn btn-primary col-12"> simpan</button>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
       </>
    )

}