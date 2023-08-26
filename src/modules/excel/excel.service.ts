
import xlsx from 'xlsx';

export class ExcelService {

    static processXLSXFile(filePath: string) {
        try {

            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            const data = {};

            xlsx.utils.sheet_to_json(worksheet).forEach((row) => {
                const organizacion = row['organizacion'];
                const usuario = row['usuario'];
                const rol = row['rol'];

                if (!data[organizacion]) {
                    data[organizacion] = [];
                }

                const userIndex = data[organizacion].findIndex((entry:any) => entry.username === usuario);

                if (userIndex !== -1) {
                    data[organizacion][userIndex].roles.push(rol);
                } else {
                    data[organizacion].push({ username: usuario, roles: [rol] });
                }
            });

            const result = Object.keys(data).map((org) => ({ organization: org, users: data[org] }));
            return result;

        } catch (error) {
            throw new Error('Error process file');
        }
    }

}