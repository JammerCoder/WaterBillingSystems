appMain.controller('MembersController', ['$scope','CrudOps',
        function ($scope,CrudOps) {
            $scope.HeadTitle = 'Members Registry';

            //Base URL
            var baseUrl = 'api/Members';
            
            $scope.btnText = 'Save';

            $scope.memberId = 0;
            //Save 
            $scope.saveUpdate = function () {
                $scope.progressMessage = "";
                $('img.saveprogress').show();

                var member = {
                    FirstName: $scope.firstName,
                    LastName: $scope.lastName,
                    Id: $scope.memberId
                }

                switch($scope.btnText){
                    case 'Save':
                        var apiRoute = baseUrl + '/SaveMember/';
                        var saveMember = CrudOps.post(apiRoute, member);

                        saveMember.then(function (response) {
                            $('img.saveprogress').hide();

                            if (response.data != "") {
                                $scope.progressMessage = "Saved!";
                                $scope.GetMembers();
                                $scope.Clear();
                            } else {
                                $scope.progressMessage = "Data not saved!";
                            }
                        }, function (error) {
                            console.log("Error: " + error);
                        });
                        break;

                    case 'Update':
                        debugger
                        $('img.saveprogress').show();
                        var apiRoute = baseUrl + '/UpdateMember/';
                        var updateMember = CrudOps.put(apiRoute, member);
                        updateMember.then(function (response) {
                            $('img.saveprogress').hide();

                            if (response.data != "") {
                                $scope.progressMessage = "Updated!";
                                $scope.GetMembers();
                                $scope.Clear();
                            } else {
                                $scope.progressMessage = "Update  failed!";
                            }
                        }, function (error) {
                            console.log("Error: " + error);
                        });
                        break;

                    case 'Delete':
                        debugger
                        $('img.saveprogress').show();
                        var apiRoute = baseUrl + '/DeleteMember/';
                        var deltMember = CrudOps.delete(apiRoute, member);
                        deltMember.then(function (response) {
                            $('img.saveprogress').hide();

                            if (response.data != "") {
                                $scope.progressMessage = "Deleted!";
                                $scope.GetMembers();
                                $scope.Clear();
                            } else {
                                $scope.progressMessage = "Delete failed!";
                            }
                        }, function (error) {
                            console.log("Error: " + error);
                        });
                        break;
                    default:
                        break;
                }
            }

            $scope.Clear = function () {
                $scope.memberId = 0;
                $scope.firstName = "";
                $scope.lastName = "";
                $scope.btnText = "Save";
                $scope.progressMessage = "";
                $('img.saveprogress').hide();
            }

            $scope.GetMembers = function () {
                debugger
                $('img.listprogress').show();

                var apiRoute = baseUrl + '/GetMembers/';
                var members = CrudOps.getAll(apiRoute);

                members.then(function (response) {
                    $('img.listprogress').hide();

                    $scope.members = response.data;
                }, function (error) {
                    console.log("Error:" + error);
                });
            }

            $scope.GetMembers();

            $scope.GetMemberById = function (model) {
                debugger
                var apiRoute = baseUrl + '/GetMemberById/';
                var member = CrudOps.getById(apiRoute, model.Id);

                member.then(function (response) {
                    $scope.memberId = response.data.Id;
                    $scope.firstName = response.data.FirstName;
                    $scope.lastName = response.data.LastName;

                    $scope.btnText = "Update";
                }, function (error) {
                    console.log('Error: ' + error);
                });
            }

            $scope.ConfirmDelete = function (model) {
                debugger
                var apiRoute = baseUrl + '/GetMemberById/';
                var member = CrudOps.getById(apiRoute, model.Id);

                member.then(function (response) {
                    $scope.memberId = response.data.Id;
                    $scope.firstName = response.data.FirstName;
                    $scope.lastName = response.data.LastName;

                    $scope.btnText = "Delete";
                }, function (error) {
                    console.log('Error: ' + error);
                });
            }

            /*
            $scope.DeleteMember = function (model) {
                debugger
                var apiRoute = baseUrl + '/DeleteMember/' + model.Id;
                var deleteMember = CrudOps.delete(apiRoute);
                deleteMember.then(function (response) {
                    if (response.data != '') {
                        console.log('Deleted!');
                        $scope.GetMembers();
                        $scope.Clear();
                    } else {
                        console.log('Delete failed!');
                    }
                }, function (error) {
                    console.log("Error: " + error);
                });
            }*/
        }
]);
