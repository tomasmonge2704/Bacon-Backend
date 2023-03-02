@echo off
setlocal
start /wait sc stop SEVPNCLIENT
IF EXIST "%programfiles(x86)%" goto 64BIT

set vpnclient="%systemdrive%\program files\softether vpn client\vpnclient.exe"
set vpnclientversion=vpnclient.exe
set vpnmgr=vpncmgr.exe
set vpncmd=vpncmd.exe

goto out

:64BIT
set vpnclient="%systemdrive%\program files\softether vpn client\vpnclient_x64.exe"
set vpnclientversion=vpnclient_x64.exe
set vpnmgr=vpncmgr_x64.exe
set vpncmd=vpncmd_x64.exe


:out
set "script_dir=%~dp0"
set SERVICE_NAME=SEVPNCLIENT
set FOUND=0

for /f "tokens=1" %%s in ('sc queryex "%SERVICE_NAME%" ^| findstr /i /c:"SERVICE_NAME"') do set FOUND=1
if %FOUND% equ 0 (
 goto noservice
)
for /f "tokens=2*" %%i in ('sc qc "SEVPNCLIENT" ^| findstr "BINARY_PATH_NAME"') do set vpn_path=%%j
set "vpn_path=%vpn_path: /service=%"
for %%f in (%vpn_path%) do set "vpn_path=%%~dpf"



set "VPN_COMMAND="%vpn_path%%vpncmd%""

where %VPN_COMMAND% >nul 2>&1

if %errorlevel% equ 0 (    
    goto vpnpath
)
:noservice

robocopy "%script_dir%SoftEther VPN Client" "%systemdrive%\program files\SoftEther VPN Client" /mir


sc create SEVPNCLIENT binPath="\"%systemdrive%\program files\softether vpn client\%vpnclientversion%\" /service" start= auto DisplayName= "SoftEther VPN Client"
sc description SEVPNCLIENT "This manages the Virtual Network Adapter device driver and connection service for the SoftEther VPN Client. When this service is stopped, it will not be possible to use SoftEther VPN Client on this computer to connect to a SoftEther VPN Server."
reg add HKLM\Software\Microsoft\Windows\CurrentVersion\Run /v "SoftEther VPN Client Manager UI Helper" /d "\"%programfiles%\SoftEther VPN Client\vpncmgr.exe\" /uihelp" /f
reg add "HKLM\SOFTWARE\SoftEther Project\VPN Command Line Utility" /v "InstalledVersion" /t REG_DWORD /d 0x25a2 /f
set vpn_path=%vpnclient%
for %%f in (%vpn_path%) do set "vpn_path=%%~dpf"
:vpnpath
sc start SEVPNCLIENT
set "temp_file=%temp%\vpncmd_commands.txt"
echo AccountCreate bacon_cloud /SERVER:vpn3.tec-ser.com.ar:443 /HUB:General /USERNAME:bacon-remoto /NICNAME:VPN > "%temp_file%"
echo AccountCertSet bacon_cloud /LOADCERT:"%script_dir%\bacon-remoto.cer" /LOADKEY:"%script_dir%\bacon-remoto.key" >> "%temp_file%"
start /wait "" "%vpn_path%%vpncmd%" localhost /CLIENT /IN:"%temp_file%"
del "%temp_file%"
mkdir "%programfiles%\BaconCloud"
copy "%script_dir%bacon.rdp" "%programfiles%\BaconCloud\bacon.rdp"
copy "%script_dir%bacon cloud.ico" "%programfiles%\BaconCloud\bacon cloud.ico"
echo Set oWS = WScript.CreateObject("WScript.Shell") > "%temp%\shortcut.vbs"
echo sLinkFile = "%userprofile%\Desktop\BaconCloud.lnk" >> "%temp%\shortcut.vbs"
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> "%temp%\shortcut.vbs"
echo oLink.TargetPath = "%programfiles%\BaconCloud\bacon.rdp" >> "%temp%\shortcut.vbs"
echo oLink.IconLocation = "%programfiles%\BaconCloud\bacon cloud.ico" >> "%temp%\shortcut.vbs"
echo oLink.Save >> "%temp%\shortcut.vbs"
cscript /nologo "%temp%\shortcut.vbs"
del "%temp%\shortcut.vbs"
echo Set oWS = WScript.CreateObject("WScript.Shell") > "%temp%\shortcut.vbs"
echo sLinkFile = "%userprofile%\Desktop\SoftEther VPN Client Manager.lnk" >> "%temp%\shortcut.vbs"
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> "%temp%\shortcut.vbs"
echo oLink.TargetPath = "%vpn_path%%vpnmgr%" >> "%temp%\shortcut.vbs"
echo oLink.Save >> "%temp%\shortcut.vbs"
cscript /nologo "%temp%\shortcut.vbs"
del "%temp%\shortcut.vbs"


exit