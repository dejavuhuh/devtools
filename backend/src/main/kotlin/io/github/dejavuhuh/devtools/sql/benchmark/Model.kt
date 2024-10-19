package io.github.dejavuhuh.devtools.sql.benchmark

data class BenchmarkRecord(
    val runTime: Int,
    val statementIndex: Int,
    val elapsedMs: Long,
)

data class BenchmarkOptions(
    val runTimes: Int,
    val repeatTimes: Int,
)

enum class Database {
    MySQL,
    PostgreSQL
}

val DATABASE_MAPPINGS = mapOf(
    com.mysql.cj.jdbc.Driver::class.java.name to Database.MySQL,
    org.postgresql.Driver::class.java.name to Database.PostgreSQL,
)
