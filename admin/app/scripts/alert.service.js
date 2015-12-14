'use strict';

angular.module('diaApp').service('Alert', function ($uibModal) {

  this.isModalOpen = false;

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

  this.success = function(msg, title){
    toastr.success(msg, title);
  };

  this.error = function(msg,title){
    toastr.error(msg, title);
  };

  this.confirm = function (msg, title, confirmText, cb) {
    swal({
      title: title || "Por favor confirmar",
      text: msg || "",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
      confirmButtonText: confirmText,
      cancelButtonText: "Cancelar",
      closeOnConfirm: true
    }, cb);
  };

  this.openModal = function(options){
    this.isModalOpen = $uibModal.open(options);
  };

  this.closeModal = function(){
    if(this.isModalOpen){
      this.isModalOpen.close();
      this.isModalOpen = false;
    }
  };
});
