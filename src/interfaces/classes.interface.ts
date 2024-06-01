import { Student } from "./students.interface";
import { Teacher } from "./teachers.interface";

export interface Classes {
    id:               number;
    nombreClase:      string;
    descripcionClase: string;
    estudiantes:      Student[];
    profesor:         Teacher;
}


