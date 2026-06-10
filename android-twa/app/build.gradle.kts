import java.util.Properties

plugins {
    id("com.android.application")
}

// Read signing credentials from local.properties (gitignored) or CI environment variables.
// Never hardcode passwords here — this file is tracked by git.
val localProps = Properties()
val localPropsFile = rootProject.file("local.properties")
if (localPropsFile.exists()) localProps.load(localPropsFile.inputStream())

fun prop(key: String): String? = System.getenv(key) ?: localProps.getProperty(key)

android {
    namespace = "com.aihub.sridhar.app"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.aihub.sridhar.app"
        minSdk = 23
        targetSdk = 34
        versionCode = 2
        versionName = "1.0.1"
    }

    signingConfigs {
        create("release") {
            storeFile = file("../aihub-upload.jks")
            storePassword = prop("KEYSTORE_PASS") ?: error("KEYSTORE_PASS not set. Add it to local.properties or as an env var.")
            keyAlias = "aihub-upload"
            keyPassword = prop("KEY_PASS") ?: error("KEY_PASS not set. Add it to local.properties or as an env var.")
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            signingConfig = signingConfigs.getByName("release")
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
}

dependencies {
    // Trusted Web Activity support library
    implementation("com.google.androidbrowserhelper:androidbrowserhelper:2.5.0")
}
