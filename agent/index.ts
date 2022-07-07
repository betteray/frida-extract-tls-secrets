import { log } from "./logger";

function startTLSKeyLogger(SSL_CTX_new: NativePointer, SSL_CTX_set_keylog_callback: NativePointer) {
    const SSL_CTX_set_keylog_callback_function = new NativeFunction(
        SSL_CTX_set_keylog_callback,
        "void",
        ["pointer", "pointer"]
    );

    const key_log_callback = new NativeCallback((ssl: NativePointer, line: NativePointer) => {
        let key_log_line = line.readUtf8String();
        log("ssl: " + ssl + ", line: " + key_log_line);

    }, "void", ["pointer", "pointer"]);

    Interceptor.attach(SSL_CTX_new, {
        onEnter(args) {
            log("onEnter SSL_CTX_new");
        },
        onLeave(retVal) {
            log("onLeave SSL_CTX_new: " + retVal);
            SSL_CTX_set_keylog_callback_function(retVal, key_log_callback);
        }
    });
}

const m = Process.findModuleByName("libssl.so");

const SSL_CTX_new = m!.findExportByName("SSL_CTX_new");
const SSL_CTX_set_keylog_callback = m!.findExportByName("SSL_CTX_set_keylog_callback");

log("Module.onLoad SSL_CTX_new: " + SSL_CTX_new);
log("Module.onLoad SSL_CTX_set_keylog_callback: " + SSL_CTX_set_keylog_callback);

startTLSKeyLogger(SSL_CTX_new!, SSL_CTX_set_keylog_callback!);