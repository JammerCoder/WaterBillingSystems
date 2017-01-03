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
                    LastName: $scope.lastName
                }
                if ($scope.btnText == 'Save') {
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
                }
                else {
                    debugger
                    $('img.saveprogress').show();
                    var apiRoute = baseUrl + '/UpdateMember/';
                    var updateMember = CrudOps.put(apiRoute, member);
                    updateMember.then(function (response) {
                        $('img.saveprogress').hide();

                        if (response.date != "") {
                            $scope.progressMessage = "Updated!";
                            $scope.GetMembers();
                            $scope.Clear();
                        } else {
                            $scope.progressMessage = "Update  failed!";
                        }
                    }, function (error) {
                        console.log("Error: " + error);
                    });
                }
            }

            $scope.Clear = function () {
                $scope.Id = 0;
                $scope.firstName = "";
                $scope.lastName = "";
            }

            $scope.GetMembers = function () {
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
                    $scope.Id = response.data.Id;
                    $scope.firstName = response.data.FirstName;
                    $scope.lastName = response.data.LastName;

                    $scope.btnText = "Update";
                }, function (error) {
                    console.log('Error: ' + error);
                });
            }
        }
]);
