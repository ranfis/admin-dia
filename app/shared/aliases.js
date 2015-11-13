'use strict';

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": true,
  "progressBar": true,
  "positionClass": "toast-bottom-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
};

this.show = {
  success: function(msg, title){
    toastr.success(msg, title);
  },
  error: function(msg,title){
    toastr.error(msg, title);
  },
  confirm: function (msg, title, confirmText, cb) {
    swal({
      title: title || "Por favor confirmar",
      text: msg || "",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
      confirmButtonText: confirmText,
      cancelButtonText: "Cancelar",
      closeOnConfirm: true,
    }, cb);
  }
};
