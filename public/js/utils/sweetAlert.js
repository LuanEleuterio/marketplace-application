const sweetAlert = {
    show: async (title = "", msg = "", icon = "", timer = 1500) =>{ 
        Swal.fire({
            title: title,
            text: msg,
            icon: icon,
            timer: timer
        })
    },

    showAddCarrinho: async (title = "", icon = "") =>{ 
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
          
        Toast.fire({
            icon: icon,
            title: title
        })
    }
}

export default sweetAlert