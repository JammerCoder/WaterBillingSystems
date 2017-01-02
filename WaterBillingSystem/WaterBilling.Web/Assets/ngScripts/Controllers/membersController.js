appMain.controller('MembersController', ['$scope','CrudOps',
        function ($scope,CrudOps) {
            $scope.HeadTitle = 'Members Registry';

            //Base URL
            var baseUrl = 'api/Members';
            
            $scope.btnText = 'Save'; //Change this text value to Edit, Delete..... after I understand everything here....

            $scope.memberId = 0;
            $scope.saveUpdate = function () {
                var member = {
                    FirstName: $scope.firstName,
                    LastName: $scope.lastName
                }
                if ($scope.btnText == 'Save') {
                    var apiRoute = baseUrl + '/SaveMember/';
                    var saveMember = CrudOps.post(apiRoute, member);

                    saveMember.then(function (response) {
                        if (reponse.data != "") {
                            alert("Saved successfully!");
                            scope.Clear();
                        } else {
                            alert("Save failed!");
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
        }
]);
