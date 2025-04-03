import Swal from 'sweetalert2'

const successalert = (title) => {
    const alert = Swal.fire({
        icon:"success",
        title: title,
        confirmButtonColor:"#00b050"
      });

      return alert
}

export default successalert