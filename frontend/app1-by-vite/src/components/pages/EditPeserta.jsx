import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPeserta() {
  const { id } = useParams();
  const navigate = useNavigate();

     const [pesertas, setPesertas] = useState([]);
  const [loading, setLoading] = useState(true); // buatuh kejalasan atau butuh loading
  const [nama, setNama] = useState("");
  const [telpn, setTelpn] = useState("");
  const [kelas, setKelas] = useState("");
  const [jurusan, setJurusan] = useState("");
  
  const fecthDataByid = () => {
     axios
      .get(`http://localhost:3000/api/peserta/${id}`)
      .then((response) => {
        // setStudents(response.data);
        // console.log(response.data);
      const myData = response.data;

       
        
        setNama(myData['nama']);
        setTelpn(myData['telpn']);
        setKelas(myData['kelas']);
        setJurusan(myData['jurusan']);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  

  useEffect(() => {
  fecthDataByid();
}, []);

  const handleUpdate = (e) => {
  e.preventDefault();

  axios.put(`http://localhost:3000/api/peserta/${id}`, {
      nama,
      telpn,
      kelas,
      jurusan,
  })
  .then(() => {
    // const message = response.data.message;

    alert("data berhasil di update");

    setTimeout(() => {
      navigate("/peserta");
    }, 200);
  })
  .catch((error) => {
    console.log(error);
    alert("Gagal update data");
  })
  .finally(() => {
    setLoading(false);
  });
};


  return (
    <div className="container">
      <div className="card mt-3 p-3">
        <h3>Edit Peserta</h3>

        <form onSubmit={handleUpdate}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
            <label>Nama</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control"
              value={telpn}
              onChange={(e) => setTelpn(e.target.value)}
            />
            <label>Telepon</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
            />
            <label>Kelas</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              value={jurusan}
              onChange={(e) => setJurusan(e.target.value)}
            />
            <label>Jurusan</label>
          </div>

          <button className="btn btn-primary col-12">Simpan</button>
        </form>
      </div>
    </div>
  );
}
