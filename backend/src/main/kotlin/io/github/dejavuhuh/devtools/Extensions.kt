package io.github.dejavuhuh.devtools

import java.io.InputStream
import java.nio.charset.Charset

fun InputStream.readText(charset: Charset = Charsets.UTF_8): String {
    return this.bufferedReader(charset).use { it.readText() }
}
