const { writeFile } = require("../fs");
const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../passport");
const { getUserRelacionado } = require("../mongoDB/utils");


router.get("/:username/users/:userId", isAuthenticated, (req, res) => {
    // Establecer un tiempo de espera de 5 minutos
    req.setTimeout(5 * 60 * 1000);
        getUserRelacionado(req).then(async function (user) {
            var options = {
                root: './'
            };
            const rdp = `
                screen mode id:i:2
        use multimon:i:0
        desktopwidth:i:1920
        desktopheight:i:1080
        session bpp:i:32
        winposstr:s:0,1,33,0,1920,1040
        compression:i:1
        keyboardhook:i:2
        audiocapturemode:i:0
        videoplaybackmode:i:1
        connection type:i:7
        networkautodetect:i:1
        bandwidthautodetect:i:1
        displayconnectionbar:i:1
        enableworkspacereconnect:i:0
        disable wallpaper:i:0
        allow font smoothing:i:0
        allow desktop composition:i:0
        disable full window drag:i:1
        disable menu anims:i:1
        disable themes:i:0
        disable cursor setting:i:0
        bitmapcachepersistenable:i:1
        full address:s:${user.ip}
        audiomode:i:0
        redirectprinters:i:1
        redirectcomports:i:0
        redirectsmartcards:i:0
        redirectclipboard:i:1
        redirectposdevices:i:0
        autoreconnection enabled:i:1
        authentication level:i:2
        prompt for credentials:i:0
        negotiate security layer:i:1
        remoteapplicationmode:i:0
        alternate shell:s:
        shell working directory:s:
        gatewayhostname:s:
        gatewayusagemethod:i:4
        gatewaycredentialssource:i:4
        gatewayprofileusagemethod:i:0
        promptcredentialonce:i:0
        gatewaybrokeringtype:i:0
        use redirection server name:i:0
        rdgiskdcproxy:i:0
        kdcproxyname:s:
        drivestoredirect:s:C:\;
        username:s:administrador
                `;
            //modifica los archivos CERT KEY y RDP 
            writeFile("./instalacion/bacon-remoto.cer", user.cert);
            writeFile("./instalacion/bacon-remoto.key", user.key);
            writeFile("./instalacion/bacon.rdp", rdp);
            //compila todo en un archivo .exe
            try {
                await require("innosetup-compiler")("./myapp.iss", {
                    gui: false,
                    verbose: false,
                    signtoolname: 'signtool'
                });
            } catch(error) {
                console.log(error);
            }
            //envia el archivo
            var fileName = 'MyAppSetup.exe';
            res.set('Content-Disposition', `attachment; filename=${fileName}`);
            res.sendFile(fileName, options, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Sent:', fileName);
                }
            });
          });

});



module.exports = router;
