@file:Suppress("ktlint")
package gg.jte.generated.precompiled
import io.github.dejavuhuh.devtools.sql.benchmark.BenchmarkOptions
import gg.jte.support.ForSupport
@Suppress("UNCHECKED_CAST", "UNUSED_PARAMETER")
class JtePostgreSQLGenerated {
companion object {
	@JvmField val JTE_NAME = "PostgreSQL.kte"
	@JvmField val JTE_LINE_INFO = intArrayOf(0,0,0,1,3,3,3,3,3,12,12,12,13,13,19,19,24,24,29,29,30,30,34,34,34,3,4,4,4,4,4)
	@JvmStatic fun render(jteOutput:gg.jte.TemplateOutput, jteHtmlInterceptor:gg.jte.html.HtmlInterceptor?, options:BenchmarkOptions, statements:List<String>) {
		jteOutput.writeContent("\nCREATE OR REPLACE FUNCTION benchmark() RETURNS TABLE (\n    run_time INT,\n    statement_index INT,\n    elapsed_ms BIGINT\n) AS \$\$\nDECLARE\n    run_times CONSTANT INT := ")
		jteOutput.writeUserContent(options.runTimes)
		jteOutput.writeContent(";\n    repeat_times CONSTANT INT := ")
		jteOutput.writeUserContent(options.repeatTimes)
		jteOutput.writeContent(";\n    v_ts TIMESTAMP;\n    rec RECORD;\nBEGIN\n    FOR r IN 1..run_times\n    LOOP\n        ")
		for (entry in ForSupport.of(statements)) {
			jteOutput.writeContent("\n        v_ts := clock_timestamp();\n\n        FOR i IN 1..repeat_times\n        LOOP\n            FOR rec IN (")
			jteOutput.writeUserContent(entry.get())
			jteOutput.writeContent(")\n            LOOP NULL;\n            END LOOP;\n        END LOOP;\n\n        RETURN QUERY SELECT r, ")
			jteOutput.writeUserContent(entry.index)
			jteOutput.writeContent(", ROUND((EXTRACT(EPOCH FROM (clock_timestamp() - v_ts)) * 1000)::numeric, 0)::bigint;\n        ")
		}
		jteOutput.writeContent("\n    END LOOP;\nEND\n\$\$ LANGUAGE plpgsql\n")
	}
	@JvmStatic fun renderMap(jteOutput:gg.jte.TemplateOutput, jteHtmlInterceptor:gg.jte.html.HtmlInterceptor?, params:Map<String, Any?>) {
		val options = params["options"] as BenchmarkOptions
		val statements = params["statements"] as List<String>
		render(jteOutput, jteHtmlInterceptor, options, statements);
	}
}
}
