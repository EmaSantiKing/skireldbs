import { exec } from "child_process";
import path from "path";
import fs from "fs";

const backupDir = path.resolve("./backups");
if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir);

const mysqldumpPath = `"C:\\xampp\\mysql\\bin\\mysqldump.exe"`;

export const realizarBackup = async (req, res) => {
  const date = new Date().toISOString().replace(/[:.]/g, "-");
  const fileName = `backup-${date}.sql`;
  const backupFile = path.join(backupDir, fileName);

  const dbHost = "localhost";
  const dbUser = "root"; 
  const dbName = "skirelds"; 

  const command = `${mysqldumpPath} -h ${dbHost} -u ${dbUser} ${dbName} > "${backupFile}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("Error al generar backup:", stderr || error);
      return res.status(500).json({ error: "Error al realizar backup" });
    }

    res.json({ message: "Backup realizado", file: backupFile });
  });
};
