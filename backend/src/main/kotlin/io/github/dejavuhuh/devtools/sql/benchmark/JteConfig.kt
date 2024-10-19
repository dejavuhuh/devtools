package io.github.dejavuhuh.devtools.sql.benchmark

import gg.jte.CodeResolver
import gg.jte.ContentType
import gg.jte.TemplateEngine
import gg.jte.resolve.DirectoryCodeResolver
import gg.jte.springframework.boot.autoconfigure.JteConfigurationException
import gg.jte.springframework.boot.autoconfigure.JteProperties
import java.nio.file.FileSystems
import java.nio.file.Paths
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class JteConfig {

    @Bean
    fun jteTemplateEngine(jteProperties: JteProperties): TemplateEngine {
        if (jteProperties.isDevelopmentMode && jteProperties.usePreCompiledTemplates()) {
            throw JteConfigurationException("You can't use development mode and precompiledTemplates together")
        }
        if (jteProperties.usePreCompiledTemplates()) {
            // Templates will need to be compiled by the maven/gradle build task
            return TemplateEngine.createPrecompiled(ContentType.Plain)
        }
        if (jteProperties.isDevelopmentMode) {
            // Here, a jte file watcher will recompile the jte templates upon file save (the web browser will auto-refresh)
            // If using IntelliJ, use Ctrl-F9 to trigger an auto-refresh when editing non-jte files.
            val split: Array<String> = jteProperties.templateLocation.split("/".toRegex()).dropLastWhile { it.isEmpty() }.toTypedArray()
            val codeResolver: CodeResolver = DirectoryCodeResolver(FileSystems.getDefault().getPath("", *split))
            return TemplateEngine.create(codeResolver, Paths.get("jte-classes"), ContentType.Plain, javaClass.classLoader)
        }
        throw JteConfigurationException("You need to either set gg.jte.usePrecompiledTemplates or gg.jte.developmentMode to true ")
    }
}
