'use strict';

angular.module('diaApp').service('ProjectService', new GenericService("project"));

angular.module('diaApp').config(
  new GenericController("ProjectService", "Proyectos", "project", "projects",
    [
      {service: "ParticipantService", list: "participants"},
      {service: "InstitutionService", list: "institutions"},
      {service: "UnitService", list: "units"},
      {service: "CurrencyService", list: "currencies"},
      {service: "FundService", list: "funds"}
    ],
    // After Fetch List
    function ($scope, Helper, Role) {
      $scope.session_role = Role;
      $scope["projects"].forEach(function (project) {
        project.date_application = Helper.getWSYear(project.date_application);
        project.date_start = Helper.getWSYear(project.date_start);
        project.other_institutions = [];
        project.institutions.forEach(function (i) {
          if (i.principal) {
            project.institution = i;
          }
          else {
            project.other_institutions.push(i);
          }
        });
        project.executing_units.forEach(function (u) {
          if (u.executing_unit) {
            project.executing_unit = u;
          }
          if (u.superviser_unit) {
            project.superviser_unit = u;
          }
        });
      });
    },
    // After Fetch
    function ($scope, Helper) {
      $scope["project"].researcher = $scope["project"].researcher.id; // Retrieve the actual select value
      $scope["project"].co_researchers = Helper.getIDs($scope["project"].co_researchers); // Retrieve the actual select value
      $scope["project"].funds = Helper.getIDs($scope["project"].funds); // Retrieve the actual select value
      $scope["project"].currency = $scope["project"].currency.id; // Retrieve the actual select value
      $scope["project"].adviser = $scope["project"].adviser.id; // Retrieve the actual select value
      $scope["project"].application_status = "" + $scope["project"].application_status.id; // Retrieve the actual select value
      $scope["project"].current_status = "" + $scope["project"].current_status.id; // Retrieve the actual select value

      $scope["project"].other_institutions = [];
      $scope["project"].institutions.forEach(function (i) {
        if (i.principal) {
          $scope["project"].institution = i.id;
        }
        else {
          $scope["project"].other_institutions.push(i.id);
        }
      });

      $scope["project"].executing_units.forEach(function (u) {
        if (u.executing_unit) {
          $scope["project"].executing_unit = u.id;
        }
        if (u.superviser_unit) {
          $scope["project"].superviser_unit = u.id;
        }
      });
    },
    // Change Before Submit
    function ($scope, Helper) {
      $scope["project"].date_application = Helper.setWSYear($scope["project"].date_application);
      $scope["project"].date_start = Helper.setWSYear($scope["project"].date_start);

      if ($scope["project"].application_status == 3) {
        $scope["project"].patent = $scope["project"].patent || false;
        $scope["project"].software = $scope["project"].software || false;
        $scope["project"].is_confidential = $scope["project"].is_confidential || false;

        $scope["project"].institutions = [];
        if($scope["project"].other_institutions) {
          $scope["project"].other_institutions.forEach(function (i) {
            $scope["project"].institutions.push({id: i, principal: false});
          });
        }
        $scope["project"].institutions.push({id: $scope["project"].institution, principal: true});

        if ($scope["project"].executing_unit === $scope["project"].superviser_unit) {
          $scope["project"].executing_units = [{
            id: $scope["project"].executing_unit,
            executing_unit: true,
            superviser_unit: true
          }];
        }
        $scope["project"].executing_units = [
          {id: $scope["project"].executing_unit, executing_unit: true, superviser_unit: false},
          {id: $scope["project"].superviser_unit, executing_unit: false, superviser_unit: true}
        ];
      }
      //else {
      //  $scope["project"].institutions = [];
      //  $scope["project"].co_researchers = [];
      //  $scope["project"].funds = [];
      //  $scope["project"].executing_units = [];
      //}
    })
);
