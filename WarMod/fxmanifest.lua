fx_version 'cerulean'
game 'gta5'

author 'Vamma'
description 'Capture the flag style warmod'
version '1.0.0'

ui_page "ui/index.html"

files {
    "ui/index.html",
    "ui/style.css",
    "ui/ui.js"
}

client_script 'warMod.net.dll'
server_script 'warMod_Server.net.dll'