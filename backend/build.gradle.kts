import gg.jte.ContentType
import kotlin.io.path.Path

plugins {
    kotlin("jvm") version "1.9.25"
    kotlin("plugin.spring") version "1.9.25"
    id("org.springframework.boot") version "3.3.4"
    id("io.spring.dependency-management") version "1.1.6"
    id("gg.jte.gradle") version ("3.1.13")
}

group = "io.github.dejavuhuh"
version = "0.0.1-SNAPSHOT"

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-jdbc")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit5")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
    // MySQL
    implementation("mysql:mysql-connector-java:8.0.33")
    // PostgreSQL
    implementation("org.postgresql:postgresql:42.7.4")

    implementation("gg.jte:jte:3.1.13")
    implementation("gg.jte:jte-kotlin:3.1.13")
    implementation("gg.jte:jte-spring-boot-starter-3:3.1.13")
    implementation("io.github.oshai:kotlin-logging-jvm:7.0.0")
}

kotlin {
    compilerOptions {
        freeCompilerArgs.addAll("-Xjsr305=strict")
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}

jte {
    sourceDirectory.set(Path("src/main/resources/benchmark/kte"))
    contentType.set(ContentType.Plain)
    precompile()
}

tasks.bootJar {
    dependsOn(tasks.precompileJte)
    archiveFileName.set("devtools.jar")
    from("jte-classes") {
        include("**/*.class")
        into("BOOT-INF/classes")
    }
}

tasks.register<Copy>("distribution") {
    dependsOn(tasks.bootJar)
    into("build/distribution")

    from(tasks.bootJar.get().archiveFile) {
        into("lib")
    }

    from("distribution/application.properties") {
        into("conf")
    }

    from("distribution/startup.sh") {
        into("bin")
    }
}
