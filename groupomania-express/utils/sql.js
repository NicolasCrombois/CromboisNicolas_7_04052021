exports.preparer = function(mysql, requete_sql, inserts) {
    requete_sql = mysql.format(requete_sql, inserts)
        .replace(/`/g, "'")
        .replace(/'\.'/g, ".")
        .replace(/'/g, "\\'");
    return requete_sql;
}