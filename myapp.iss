[Setup]
AppName=MyApp
AppVersion=1.0
DefaultDirName={pf}\MyApp
DefaultGroupName=MyApp
UninstallDisplayIcon={app}\MyApp.exe
OutputDir=./
OutputBaseFilename=Bacon
Compression=lzma2
SolidCompression=yes

[Files]
Source: "./instalacion\*"; DestDir: "{app}"; Flags: recursesubdirs

