# TFG de Mario Antonio Polo Daza
TFG 17846 - Desarrollo en Android de un sistema de respuesta inmediata con clickers para uso educativo

Autor: Mario Antonio Polo Daza

El servidor se puede visitar en https://tfg17846.herokuapp.com/#/mainMenu

## AYUDA BBDD - Manejo de tablas
Esta sección nos ayudará a la hora de manejar las tablas, en las cuales no existe interfaz gráfica para su edición.

#### ¿Cómo hacer login a la base de datos?
Abrir un terminal y escribir:
```sh
> mysql --local-infile -u mariopolo2805 -p -h tfg.c2j7nutmc0hf.eu-central-1.rds.amazonaws.com tfg
```

#### ¿Cuántas tablas existen? ¿Cuáles son y qué representan?
Existen 7 tablas:
 - Users (Representa tanto alumnos como profesores)
 - Tuition (Representa la matriculación de alumnos en grupos)
 - Group (Representa el enlace entre una asignatura y un profesor)
 - Subject (Representa una asignatura)
 - Section (Representa la subdivisión por temas de una asignatura)
 - Question (Representa una pregunta asociada a un tema)
 - Answer (Representa la respuesta a una pregunta por parte de un alumno)

![Diagrama ER](/tfg17846.png)

#### ¿Cómo realizar una ingesta masiva de datos?
Se proporcionan CSV de ejemplo en la carpeta */database* para ver el formato que se espera. Una vez completado el CSV, nos tendremos que conectar a la base de datos y ejecutar el siguiente comando:

```sh
LOAD DATA LOCAL INFILE '/absolutePath/file.csv' INTO TABLE table FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
```

Por ejemplo:

```sh
LOAD DATA LOCAL INFILE '/Users/mariopolo2805/Desktop/user.csv' INTO TABLE User FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
```

#### ¿Cómo matricular a un alumno en una asignatura nueva?
Siguiendo estos pasos (también se puede llevar a cabo de manera masiva con el anterior método descrito):
 - Lo primero será registrar al alumno en la base de datos
 - Seguidamente tendremos que registrar la asignatura
 - A continuación creamos los grupos asociados a esa asignatura
 - Generamos la matrícula de dicho alumna en la asignatura
 - Finalmente damos de alta tantos temas como necesitemos

A partir de aquí la UI soporta todo tipo de operaciones de consulta sobre estas entidades, además de edición total sobre Preguntas.

-------------------------------------------

*NOTA: Se asume que el resto de operaciones (consultar, eliminar, editar) se pueden llevar a cabo con mínimos conocimientos de SQL, por lo que no se detallan*