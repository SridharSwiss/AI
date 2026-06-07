plugins {
    id("com.android.application")
}

android {
    namespace = "ch.sridharai.hub"
    compileSdk = 34

    defaultConfig {
        applicationId = "ch.sridharai.hub"
        minSdk = 21
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0"
    }

    signingConfigs {
        create("release") {
            storeFile = file("../aihub-upload.jks")
            storePassword = System.getenv("KEYSTORE_PASS") ?: "aihub2026secure"
            keyAlias = "aihub-upload"
            keyPassword = System.getenv("KEY_PASS") ?: "aihub2026secure"
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
