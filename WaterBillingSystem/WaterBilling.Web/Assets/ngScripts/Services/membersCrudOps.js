appMain.service('CrudOps', function ($http) {
    var urlGet = '';
    this.post = function (apiRoute, Model) {
        var request = $http({
            method: 'post', //watch if there difference between '' and ""
            url: apiRoute,
            data: Model
        });
        return request;
    }

    this.put = function (apiRoute, Model) {
        var request = $http({
            method: 'put', //watch if there difference between '' and ""
            url: apiRoute,
            data: Model
        });
        return request;
    }

    this.delete = function (apiRoute) {
        var request = $http({
            method: "delete",
            url: apiRoute
        });
        return request;
    }

    this.getAll = function (apiRoute) {
        urlGet = apiRoute;
        return $http.get(urlGet);
    }

    this.getById = function (apiRoute, Id) {
        urlGet = apiRoute + '/' + Id;
        return $http.get(urlGet);
    }
});