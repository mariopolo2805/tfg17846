define([], function(){
    'use strict';

    function LoginCtrl(){
        var vm = this;

        vm.name = "LOGIN";

        console.log("Mirar la pagina de Firefox");

        // QUERY
        // mysql.query('SELECT * FROM User', function(err, rows, fields) {
        //     if (!err)
        //         console.log('The solution is: ', rows);
        //     else
        //         console.log('Error while performing Query.');
        // });
        // mysql.end();
        // QUERY

    }

    return {
        LoginCtrl: LoginCtrl
    }
});