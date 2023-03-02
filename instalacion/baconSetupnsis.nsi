!define APP_NAME "BaconCloud"
!define APP_VERSION "1.0"
!define APP_FILES "C:\Users\Mateo\Downloads\instalacion"
name "Bacon Cloud"
Icon "C:\Users\Mateo\Downloads\instalacion\bacon cloud.ico"
; Set the install directory to the user's temp folder
InstallDir "$%TEMP%\${APP_NAME}"

Section "MyApp" SEC01
  SetOutPath "$INSTDIR"
  File /r "${APP_FILES}"
  ExecWait "$INSTDIR\instalacion\installer.bat"
SectionEnd