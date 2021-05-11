exports.connectionSQL = function{
    var config = {
        host: '127.0.0.1',
        user: 'root',
        password: 'S52!-gtG14',
        port: 3306,
        database: 'Groupomania'
    };
    var connection = mysql.createConnection(config)

    return connection;
}