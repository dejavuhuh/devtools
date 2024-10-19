package io.github.dejavuhuh.devtools.sql.benchmark

import com.zaxxer.hikari.HikariDataSource
import gg.jte.TemplateEngine
import gg.jte.output.StringOutput
import io.github.dejavuhuh.devtools.readText
import org.springframework.core.io.ClassPathResource
import org.springframework.jdbc.core.simple.JdbcClient
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

data class BenchmarkRequest(
    val statements: List<String>,
    val options: BenchmarkOptions
)


@RestController
@RequestMapping("/api/sql-benchmark")
class SqlBenchmarkController(
    val dataSource: HikariDataSource,
    val jdbcClient: JdbcClient,
    val templateEngine: TemplateEngine
) {

    @PostMapping
    fun benchmark(@RequestBody request: BenchmarkRequest): List<BenchmarkRecord> {
        val database = DATABASE_MAPPINGS[dataSource.driverClassName] ?: throw IllegalArgumentException("Unsupported database")

        val executeSqlFile = "benchmark/$database/execute.sql"
        val cleanupSqlFile = "benchmark/$database/cleanup.sql"

        val prepareSql = renderPrepareSql(database, request)
        val executeSql = ClassPathResource(executeSqlFile).inputStream.readText()
        val cleanupSql = ClassPathResource(cleanupSqlFile).inputStream.readText()

        try {
            // 1. Prepare
            jdbcClient.sql(prepareSql).update()

            // 2. Execute
            return jdbcClient
                .sql(executeSql)
                .query(BenchmarkRecord::class.java)
                .list()
        } finally {
            // 3. Cleanup
            jdbcClient.sql(cleanupSql).update()
        }
    }

    private fun renderPrepareSql(database: Database, request: BenchmarkRequest): String {
        val params = mapOf(
            "statements" to request.statements,
            "options" to request.options
        )
        val output = StringOutput()

        templateEngine.render("$database.kte", params, output)
        return output.toString()
    }
}
