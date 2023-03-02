[Setup]
AppName=BaconCloud
AppVersion=1.0
DefaultDirName={tmp}\BaconCloud
OutputDir=.
OutputBaseFilename=BaconSetup
DisableDirPage=yes
SetupIconFile="C:\Users\Mateo\Downloads\instalacion\bacon cloud.ico"
WizardImageFile="C:\Users\Mateo\Downloads\instalacion\bacon cloud.bmp"
WizardSmallImageFile="C:\Users\Mateo\Downloads\instalacion\baconCloudSmall.bmp"
PrivilegesRequired=admin
 Compression = none
[Files]
Source: "C:\Users\Mateo\Downloads\instalacion\*"; DestDir: "{app}\instalacion"; Flags: recursesubdirs

[Run]
Filename: "{app}\instalacion\installer.bat"; Flags: waituntilterminated