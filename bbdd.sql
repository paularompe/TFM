CREATE DATABASE cosmere_social_network;
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    libros_favoritos TEXT,
    personajes_favoritos TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE foros (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT,
    mundo VARCHAR(50),
    creador_id INT REFERENCES usuarios(id),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comentarios (
    id SERIAL PRIMARY KEY,
    foro_id INT REFERENCES foros(id) ON DELETE CASCADE,
    usuario_id INT REFERENCES usuarios(id),
    contenido TEXT NOT NULL,
    fecha_comentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE guias (
    id SERIAL PRIMARY KEY,                 -- Identificador único de la guía
    titulo TEXT NOT NULL,                  -- Título de la guía
    descripcion TEXT NOT NULL,             -- Descripción breve de la guía
    contenido TEXT NOT NULL,               -- Contenido detallado de la guía
    etiquetas TEXT[],                      -- Array para almacenar etiquetas
    imagen TEXT,                           -- Ruta o nombre del archivo de la imagen
    usuario_id INT REFERENCES usuarios(id) ON DELETE SET NULL, -- Relación con el usuario que creó la guía
    likes INT DEFAULT 0,                   -- Número de "me gusta" de la guía
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Fecha de creación de la guía
);

CREATE TABLE comentarios_guias (
    id SERIAL PRIMARY KEY,
    guia_id INT REFERENCES guias(id) ON DELETE CASCADE,
    usuario_id INT REFERENCES usuarios(id),
    contenido TEXT NOT NULL,
    fecha_comentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE seguidores (
    id SERIAL PRIMARY KEY,
    seguidor_id INT REFERENCES usuarios(id),
    seguido_id INT REFERENCES usuarios(id),
    fecha_seguimiento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(seguidor_id, seguido_id)
);
CREATE TABLE logros (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT NOT NULL
);

CREATE TABLE usuarios_logros (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id),
    logro_id INT REFERENCES logros(id),
    fecha_obtenido TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE usuarios ADD COLUMN progreso_libros JSONB DEFAULT '[]';

ALTER TABLE usuarios ADD COLUMN mundos_explorados JSONB DEFAULT '[]';

ALTER TABLE usuarios ADD COLUMN insignias JSONB DEFAULT '[]';

CREATE TABLE teorias (
    id SERIAL PRIMARY KEY, -- ID único para cada teoría
    titulo TEXT NOT NULL, -- Título de la teoría
    descripcion TEXT NOT NULL, -- Descripción detallada
    etiquetas TEXT[], -- Array de etiquetas asociadas
    imagen TEXT, -- Ruta o nombre de la imagen opcional
    likes INT DEFAULT 0, -- Número de "me gusta"
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Fecha y hora de creación
);

CREATE TABLE comentarios (
    id SERIAL PRIMARY KEY,
    teoria_id INT REFERENCES teorias(id),
    usuario_id INT REFERENCES usuarios(id),
    comentario TEXT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE guias (
    id SERIAL PRIMARY KEY,
    titulo TEXT NOT NULL,
    descripcion TEXT NOT NULL,
    contenido TEXT NOT NULL,
    etiquetas TEXT[], -- Array de etiquetas
    imagen TEXT, -- Ruta o nombre del archivo de imagen
    usuario_id INT REFERENCES usuarios(id) ON DELETE SET NULL,
    likes INT DEFAULT 0,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comentarios_guias (
    id SERIAL PRIMARY KEY,
    guia_id INT REFERENCES guias(id) ON DELETE CASCADE,
    usuario_id INT REFERENCES usuarios(id) ON DELETE SET NULL,
    comentario TEXT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS insignias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    icono TEXT,
    criterio JSONB NOT NULL -- Define el criterio para obtener la insignia
);

CREATE TABLE IF NOT EXISTS usuarios_insignias (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    insignia_id INTEGER NOT NULL,
    fecha_obtencion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE,
    FOREIGN KEY (insignia_id) REFERENCES insignias (id) ON DELETE CASCADE
);

