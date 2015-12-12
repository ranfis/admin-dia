'use strict';

angular.module('diaApp').service('ProjectService', new GenericService("project"));

angular.module('diaApp').config(
  new GenericController("ProjectService","Proyectos","project","projects",
    [
      {service:"ParticipantService",list:"participants"},
      {service:"InstitutionService",list:"institutions"},
      {service:"UnitService",list:"units"},
      {service:"CurrencyService",list:"currencies"},
      {service:"FundService",list:"funds"}
    ],
    // After Fetch List
    function($scope,Helper){
      $scope["projects"].forEach(function(project){
        project.date_application = Helper.getWSYear(project.date_application);
        project.date_start = Helper.getWSYear(project.date_start);
      });
    },
    // After Fetch
    function ($scope,Helper) {
      console.info($scope);
      $scope["project"].counterpart = $scope["project"].counterpart; // Retrieve the actual select value
      //$scope["project"].researcher = $scope["project"].researcher.id; // Retrieve tReally??, he actual select value
      $scope["project"].researcher = 5; // Retrieve the actual select value
      $scope["project"].co_researchers = Helper.getIDs($scope["project"].co_researchers); // Retrieve the actual select value
      $scope["project"].funds = Helper.getIDs($scope["project"].funds); // Retrieve the actual select value
      $scope["project"].currency = $scope["project"].currency.id; // Retrieve the actual select value
      $scope["project"].adviser = $scope["project"].adviser.id; // Retrieve the actual select value
      $scope["project"].application_status = ""+$scope["project"].application_status.id; // Retrieve the actual select value
      $scope["project"].current_status = ""+  $scope["project"].current_status.id; // Retrieve the actual select value
      //$scope["project"].institution = $scope["project"].institution.id; // Retrieve the actual select value
      //$scope["project"].other_institutions = Helper.getIDs($scope["project"].co_researchers); // Retrieve the actual select value

    },
    // Change Before Submit
    function($scope, Helper){
      $scope["project"].patent = $scope["project"].patent || false;
      $scope["project"].software = $scope["project"].software || false;
      $scope["project"].date_application = Helper.setWSYear($scope["project"].date_application);
      $scope["project"].date_start = Helper.setWSYear($scope["project"].date_start);
      $scope["project"].institutions = [];
      $scope["project"].other_institutions.forEach(function(i){
        $scope["project"].institutions.push({id:i,principal:false});
      });
      $scope["project"].institutions.push({id:$scope["project"].institution,principal:false});

      $scope["project"].executing_units = [
        {id:$scope["project"].executing_unit,executing_unit:true,superviser_unit:false},
        {id:$scope["project"].superviser_unit,executing_unit:false,superviser_unit:true},
      ]
    })
);
