appMain.controller('MembersController', ['$scope', 'CrudOps',
        function ($scope, CrudOps) {
            $scope.HeadTitle = 'Members Registry';
            

            //Base URL
            var baseUrl = 'api/Members';

            $scope.btnNewRec = 'Add';
            $scope.btnUpdateRec = 'Edit';

            $scope.memberId = 0;
            //Save 
            $scope.saveUpdate = function (model) {
                $scope.progressMessage = "";
                $('img.saveprogress').show();

                var member = {
                    FirstName: $scope.firstName,
                    LastName: $scope.lastName,
                    Id: $scope.memberId
                }

                switch ($scope.btnText) {
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
                        var apiRoute = baseUrl + '/RemoveMember/' + member.Id;
                        var deltMember = CrudOps.delete(apiRoute);
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

            $scope.NewRecord = function () {
                $scope.btnNewRec = "Save";
            }

            $scope.Clear = function () {
                $scope.memberId = 0;
                $scope.firstName = "";
                $scope.lastName = "";
                $scope.btnText = "Add";
                $scope.progressMessage = "";
                $('img.saveprogress').hide();
            }

            $scope.GetMembers = function () {
                $scope.btnAttrib = 'success';
                $scope.btnText = 'Add';
                $scope.inputStatus = true;

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

            $scope.GetMembers(); // initiate Members list

            $scope.GetMember = function (model, url, caller) {
                var member;
                switch (caller) {
                    case 'Update':
                        $scope.inputStatus = false;
                        break;

                    case 'Delete':
                        $scope.inputStatus = true;
                        break;
                }

                member = CrudOps.getById(url, model.Id);
                member.then(function (response) {
                    $scope.memberId = response.data.Id;
                    $scope.firstName = response.data.FirstName;
                    $scope.lastName = response.data.LastName;

                    $scope.btnText = caller;
                }, function (error) {
                    console.log('Error: ' + error);
                });
            }

            $scope.SelectMember = function (model) {
                debugger
                $scope.Clear();
                $scope.btnAttrib = 'info';
                var apiRoute = baseUrl + '/GetMemberById/';
                $scope.GetMember(model, apiRoute, "Update");
            }

            $scope.SelectDelete = function (model) {
                debugger
                $scope.Clear();
                $scope.btnAttrib = 'danger';
                var apiRoute = baseUrl + '/GetMemberById/';
                $scope.GetMember(model, apiRoute, "Delete");
            }

        }
]);
