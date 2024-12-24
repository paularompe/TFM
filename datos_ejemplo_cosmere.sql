
-- Insertar usuarios de ejemplo
INSERT INTO usuarios (nombre, correo, contrasena, libros_favoritos, personajes_favoritos) VALUES
('Kaladin Vendaval', 'kaladin@cosmere.com', 'contrasena123', 'El Camino de los Reyes, Palabras Radiantes', 'Kaladin, Syl'),
('Shallan Davar', 'shallan@cosmere.com', 'contrasena123', 'Juramentada', 'Shallan, Patas'),
('Vin Venture', 'vin@cosmere.com', 'contrasena123', 'Nacidos de la Bruma: El Imperio Final', 'Vin, Kelsier'),
('Sazed', 'sazed@cosmere.com', 'contrasena123', 'Nacidos de la Bruma: Héroes de las Eras', 'Sazed');

-- Insertar foros de ejemplo
INSERT INTO foros (titulo, descripcion, mundo, creador_id) VALUES
('Teorías sobre Odium', 'Hablemos del papel de Odium en el Cosmere.', 'Roshar', 1),
('La Magia Metálica de Scadrial', 'Explora la Alomancia y la Feruquimia aquí.', 'Scadrial', 3);

-- Insertar comentarios en foros
INSERT INTO comentarios (foro_id, usuario_id, contenido) VALUES
(1, 2, 'Creo que Odium podría no ser el villano definitivo. ¿Qué opinan?'),
(1, 3, 'El odio de Odium es aterrador, pero podría haber algo más detrás.');

-- Insertar guías de ejemplo
INSERT INTO guias (titulo, contenido, sistema_magico, autor_id) VALUES
('Cómo usar la Luz Estelar', 'Una guía para principiantes sobre cómo aprovechar la Luz Estelar.', 'Vinculación de Surge', 1),
('Fundamentos de los Nacidos de la Bruma', 'Todo lo que necesitas saber sobre la Alomancia.', 'Alomancia', 3);

-- Insertar comentarios en guías
INSERT INTO comentarios_guias (guia_id, usuario_id, contenido) VALUES
(1, 2, 'Esto es realmente útil para los recién llegados.'),
(2, 4, '¡Gran guía! Aprendí mucho.');

-- Insertar logros de ejemplo
INSERT INTO logros (nombre, descripcion) VALUES
('Explorador del Cosmere', 'Visitó todos los foros sobre los diferentes mundos del Cosmere.'),
('Principiante en Alomancia', 'Aprendió los fundamentos de la Alomancia.');

-- Asignar logros a usuarios
INSERT INTO usuarios_logros (usuario_id, logro_id) VALUES
(1, 1),
(3, 2);

INSERT INTO teorias (titulo, descripcion, etiquetas, imagen, likes)
VALUES (
    'La conexión de Elantris con las Esquirlas',
    'Elantris podría haber sido una ciudad creada como un punto de convergencia para las Esquirlas de Devoción y Dominio. La caída de Elantris podría estar relacionada con el destierro de ambas Esquirlas y la falta de conexión espiritual de los elantrinos.',
    ARRAY['Elantris', 'Devoción', 'Dominio'],
    NULL, -- Si no hay imagen asociada, puedes dejarlo como NULL
    15 -- Cantidad inicial de "Me gusta"
);

INSERT INTO teorias (titulo, descripcion, etiquetas, imagen, likes)
VALUES (
    '¿Ba-Ado-Mishram podría ser un tipo de Esquirla?',
    'La captura de Ba-Ado-Mishram por parte de los Radiantes podría haber alterado la conexión espiritual de los parshendi. Esto sugiere que Ba-Ado-Mishram no es simplemente una alta princesa unmade, sino que tiene un poder que podría estar relacionado con una Esquirla desconocida.',
    ARRAY['Ba-Ado-Mishram', 'Roshar', 'Unmade'],
    NULL, -- Si no hay imagen asociada, puedes dejarlo como NULL
    10 -- Cantidad inicial de "Me gusta"
);

INSERT INTO comentarios (teoria_id, usuario_id, comentario)
VALUES (1, 1, 'Interesante teoría. Esto podría explicar el Shaod y por qué dejó de funcionar.');

INSERT INTO comentarios (teoria_id, usuario_id, comentario)
VALUES (2, 2, 'Siempre he pensado que Ba-Ado-Mishram tiene un rol mucho más importante en la historia de Roshar.');

-- Guía de las Órdenes de los Caballeros Radiantes
INSERT INTO guias (titulo, descripcion, contenido, etiquetas, usuario_id, likes) VALUES
(
    'Órdenes de los Caballeros Radiantes',
    'Explora las 10 Órdenes de los Caballeros Radiantes, su relación con los spren y los juramentos que siguen.',
    'Contenido detallado de cada orden: Paladines del cielo, Tejedores de luz, Corredores del viento, entre otros.',
    ARRAY['Roshar', 'Caballeros Radiantes', 'Juramentos'],
    1,
    5
);

-- Guía para entender el sistema de Alomancia
INSERT INTO guias (titulo, descripcion, contenido, etiquetas, usuario_id, likes) VALUES
(
    'Entendiendo la Alomancia',
    'Descubre cómo funcionan los poderes de la Alomancia y cómo los diferentes metales afectan las habilidades.',
    'Contenido: Explicación de metales como el acero, el hierro, el estaño y sus efectos en los brumosos.',
    ARRAY['Scadrial', 'Alomancia', 'Poderes'],
    2,
    8
);

-- Lugares imprescindibles de Roshar
INSERT INTO guias (titulo, descripcion, contenido, etiquetas, usuario_id, likes) VALUES
(
    'Lugares imprescindibles de Roshar',
    'Una lista de los lugares más destacados en Roshar, incluyendo Urithiru, Narak y las Llanuras Quebradas.',
    'Contenido: Detalles sobre su importancia en la trama y lo que los hace especiales.',
    ARRAY['Roshar', 'Lugares'],
    3,
    4
);

-- Guía para leer el Cosmere en orden cronológico
INSERT INTO guias (titulo, descripcion, contenido, etiquetas, usuario_id, likes) VALUES
(
    'Orden de lectura del Cosmere',
    'Una guía para leer las obras de Brandon Sanderson en un orden que maximice la comprensión del universo.',
    'Contenido: Lista cronológica sugerida: Elantris, Nacidos de la bruma, El Archivo de las Tormentas, entre otros.',
    ARRAY['Cosmere', 'Orden de lectura'],
    4,
    10
);

-- Introducción a la BioCromática y el Aliento
INSERT INTO guias (titulo, descripcion, contenido, etiquetas, usuario_id, likes) VALUES
(
    'La BioCromática y el Aliento',
    'Aprende los conceptos básicos de la BioCromática, cómo funciona el Aliento y sus aplicaciones.',
    'Contenido: Descripción de los tipos de Aliento y cómo se usan en Nalthis para animar objetos inertes.',
    ARRAY['Nalthis', 'BioCromática', 'Aliento'],
    1,
    6
);

-- Teoría sobre el Verdadero Propósito de los Portadores del Vacío
INSERT INTO teorias (titulo, descripcion, etiquetas, imagen, likes)
VALUES (
    'El Verdadero Propósito de los Portadores del Vacío',
    'Exploración de cómo los Portadores del Vacío encajan en el plan general de Odium y qué papel jugarán en futuras batallas en Roshar.',
    ARRAY['Roshar', 'Odium', 'Portadores del Vacío'],
    'portadores-vacio.jpg',
    12
);

-- Teoría sobre la Conexión entre los Brumosos y los Radiares
INSERT INTO teorias (titulo, descripcion, etiquetas, imagen, likes)
VALUES (
    'Conexión entre los Brumosos y los Radiares',
    'Una comparación detallada entre los sistemas mágicos de Scadrial y Roshar, y cómo podrían estar relacionados a través de la Investidura.',
    ARRAY['Scadrial', 'Roshar', 'Sistemas mágicos'],
    'brumosos-y-radiares.jpg',
    18
);

-- Teoría sobre el Pasado de Hoid y su Motivación
INSERT INTO teorias (titulo, descripcion, etiquetas, imagen, likes)
VALUES (
    'El Misterioso Pasado de Hoid',
    'Una hipótesis sobre los eventos que llevaron a Hoid a convertirse en una figura tan influyente y su motivación para interferir en el Cosmere.',
    ARRAY['Hoid', 'Cosmere', 'Pasado'],
    'pasado-hoid.jpg',
    25
);

-- Teoría sobre el Enlace entre el Aliento y el Dor
INSERT INTO teorias (titulo, descripcion, etiquetas, imagen, likes)
VALUES (
    'El Enlace entre el Aliento y el Dor',
    'Un análisis que explora si el Aliento de Nalthis y el Dor de Sel podrían compartir una conexión fundamental debido a su naturaleza mágica.',
    ARRAY['Nalthis', 'Sel', 'Investidura'],
    'aliento-y-dor.jpg',
    15
);

-- Teoría sobre la Influencia de Cultivation en Roshar
INSERT INTO teorias (titulo, descripcion, etiquetas, imagen, likes)
VALUES (
    'La Influencia de Cultivation en los Eventos de Roshar',
    'Un examen de cómo las acciones de Cultivation han moldeado los eventos recientes en Roshar y su posible plan a largo plazo.',
    ARRAY['Cultivation', 'Roshar', 'Planes'],
    'influencia-cultivation.jpg',
    20
);

-- Comentarios para la teoría "El Verdadero Propósito de los Portadores del Vacío"
INSERT INTO comentarios (teoria_id, usuario_id, comentario)
VALUES 
(7, 2, 'Interesante enfoque sobre los Portadores del Vacío. ¿Crees que Odium tiene aliados en otros planetas del Cosmere?'),
(7, 3, 'Me encanta esta teoría. Siempre me pregunté si tenían un propósito mayor.');

-- Comentarios para la teoría "Conexión entre los Brumosos y los Radiares"
INSERT INTO comentarios (teoria_id, usuario_id, comentario)
VALUES 
(8, 1, 'La idea de una conexión entre Investiduras es fascinante. Tal vez los Spren y los metales comparten un origen común.'),
(8, 4, 'Creo que los sistemas mágicos están diseñados para ser complementarios. Excelente análisis.');

-- Comentarios para la teoría "El Misterioso Pasado de Hoid"
INSERT INTO comentarios (teoria_id, usuario_id, comentario)
VALUES 
(9, 4, 'Siempre he sospechado que Hoid sabe más de lo que cuenta. ¡Buen trabajo especulando sobre su historia!'),
(9, 2, '¿Podría ser que Hoid estuviera relacionado con algún Shard antes de la fragmentación? Me encantaría leer más.');

-- Comentarios para la teoría "El Enlace entre el Aliento y el Dor"
INSERT INTO comentarios (teoria_id, usuario_id, comentario)
VALUES 
(10, 3, 'Esta teoría tiene mucho sentido. El Dor y el Aliento parecen ser variantes interesantes de Investidura.'),
(10, 4, 'Nunca había pensado en esa conexión, pero ahora parece obvio. ¡Gran trabajo!');

-- Comentarios para la teoría "La Influencia de Cultivation en los Eventos de Roshar"
INSERT INTO comentarios (teoria_id, usuario_id, comentario)
VALUES 
(11, 1, 'Cultivation siempre ha sido un personaje enigmático. ¿Será que planea algo más allá de Roshar?'),
(11, 2, 'Tu análisis sobre Cultivation tiene mucho sentido. ¡Muy buen trabajo!');

UPDATE guias
SET contenido = '
Los Caballeros Radiantes son una antigua organización en **Roshar**, surgida para defender al mundo de los enemigos de la humanidad. Cada orden tiene un conjunto único de habilidades, ideales y afinidades mágicas vinculadas a los **esquirlazos** y las habilidades de los spren. A continuación, se detalla cada una de las órdenes:
#### 1. **Corredores del Viento** (*Windrunners*)
- **Atributos asociados:** Protección y liderazgo.
- **Habilidades:** Manipulan la gravedad, permitiendo que ellos y otros vuelen o se adhieran a superficies.
- **Spren asociado:** Honorspren.
- **Ideales:** Los Corredores del Viento buscan proteger a los más débiles, aunque eso implique sacrificios personales.
#### 2. **Tejedores de Luz** (*Lightweavers*)
- **Atributos asociados:** Creatividad y honestidad.
- **Habilidades:** Crean ilusiones complejas usando luz y sonidos, combinando habilidades artísticas con magia.
- **Spren asociado:** Cryptics.
- **Ideales:** En lugar de juramentos rígidos, los Tejedores de Luz se centran en aceptar la verdad sobre ellos mismos.
#### 3. **Paladines del Cielo** (*Skybreakers*)
- **Atributos asociados:** Justicia y confianza.
- **Habilidades:** Manipulan la gravedad y dividen materia utilizando altosprens.
- **Spren asociado:** Highspren.
- **Ideales:** Valoran la ley y el orden por encima de todo, buscando justicia imparcial.
#### 4. **Forjadores de Vínculos** (*Bondsmiths*)
- **Atributos asociados:** Piedad y liderazgo.
- **Habilidades:** Capaces de influir y reforzar conexiones espirituales entre individuos y objetos.
- **Spren asociado:** Tres spren únicos: Stormfather, Nightwatcher y Sibling.
- **Ideales:** Son los unificadores del mundo, trabajando para sanar divisiones.
#### 5. **Portadores de Hielo** (*Stonewards*)
- **Atributos asociados:** Valor y perseverancia.
- **Habilidades:** Excelentes en batalla, resisten grandes cargas y fortalecen su entorno.
- **Spren asociado:** Peakspren.
- **Ideales:** Creen en la resistencia y el sacrificio personal para superar cualquier desafío.
#### 6. **Edades Lúcidas** (*Truthwatchers*)
- **Atributos asociados:** Aprendizaje y honestidad.
- **Habilidades:** Perciben verdades ocultas y tienen habilidades de curación.
- **Spren asociado:** Mistspren.
- **Ideales:** Buscan iluminar la verdad y compartir el conocimiento para el beneficio de todos.
#### 7. **Heraldo de las Sombras** (*Dustbringers*)
- **Atributos asociados:** Autocontrol y valentía.
- **Habilidades:** Destruyen y manipulan materiales con precisión explosiva.
- **Spren asociado:** Ashspren.
- **Ideales:** Luchan por controlar su propio poder destructivo y usarlo con responsabilidad.
#### 8. **Tejedores de Vínculos** (*Elsecallers*)
- **Atributos asociados:** Sabiduría y confianza.
- **Habilidades:** Viajan entre mundos y manipulan almas de objetos mediante la transformación.
- **Spren asociado:** Inkspren.
- **Ideales:** Estudian la realidad para alcanzar la verdad más elevada.
#### 9. **Tejedores de Sombras** (*Willshapers*)
- **Atributos asociados:** Independencia y resolución.
- **Habilidades:** Transforman materiales físicos y proyectan voluntad en sus acciones.
- **Spren asociado:** Lightspren.
- **Ideales:** Valoran la libertad y la individualidad.
#### 10. **Vigilantes del Crepúsculo** (*Releasers*)
- **Atributos asociados:** Prudencia y justicia.
- **Habilidades:** Manipulan energía y poseen habilidades destructivas con un alto costo.
- **Spren asociado:** Ashspren.
- **Ideales:** Aceptan su papel como destructores para construir un futuro mejor.
#### Conclusión
Los **Caballeros Radiantes** representan lo mejor de la humanidad y su potencial. Cada orden se enfrenta a desafíos únicos, tanto externos como internos, reflejando los ideales que deben alcanzar para desbloquear todo su poder. Su historia y legado continúan inspirando a los habitantes de Roshar, incluso en los tiempos más oscuros.
'
WHERE titulo = 'Órdenes de los Caballeros Radiantes';

UPDATE guias
SET contenido = '
La **Alomancia** es un sistema de magia único en el mundo de **Scadrial**, donde ciertos individuos, conocidos como brumosos o nacidos de la bruma, pueden quemar metales en su interior para obtener habilidades extraordinarias. Estos metales actúan como catalizadores mágicos, desbloqueando poderes específicos.
#### Metales básicos:
1. **Acero**: Permite empujar metales hacia afuera, útil para moverse rápidamente por el aire o lanzar proyectiles.
2. **Hierro**: Permite tirar de metales hacia el usuario, usado para atraer objetos metálicos.
3. **Estaño**: Mejora los sentidos físicos, proporcionando una percepción más aguda del entorno.
4. **Peltre**: Aumenta la fuerza física, la resistencia y la durabilidad, útil en combates y condiciones extremas.
#### Metales de mentalismo:
5. **Zinc**: Permite inflamar las emociones de las personas cercanas, útil para manipular multitudes.
6. **Latón**: Permite calmar emociones, facilitando el control en situaciones tensas.
#### Metales de mejora temporal:
7. **Cobre**: Oculta el uso de alomancia, ideal para esconder la magia de los brumosos.
8. **Bronce**: Detecta el uso de magia alomántica en las cercanías.
#### Aleaciones avanzadas:
9. **Duraluminio**: Mejora la potencia del metal que se quema simultáneamente, pero consume rápidamente las reservas.
10. **Aluminio**: Anula todas las reservas internas de metales, dejándolos inútiles temporalmente.
#### Metales poco conocidos:
11. **Cadmio**: Permite manipular el flujo del tiempo en un área, ralentizando el entorno.
12. **Bendalloy**: Acelera el flujo del tiempo dentro de una burbuja localizada.
Cada metal tiene una contraparte o aleación que modifica o complementa sus propiedades. La **Alomancia** es fundamental para entender las intrigas, guerras y conflictos en el universo de Nacidos de la Bruma.
'
WHERE titulo = 'Entendiendo la Alomancia';


UPDATE guias
SET contenido = '
El mundo de **Roshar** es un lugar vasto y lleno de maravillas. Su geografía única y su conexión con los sistemas mágicos lo convierten en un escenario fascinante para los eventos narrados en **El Archivo de las Tormentas**.
#### **1. Urithiru:**
- **Descripción:** Conocida como la ciudadela de los Caballeros Radiantes, Urithiru es un lugar místico ubicado en las montañas de las Llanuras Quebradas.
- **Importancia:** Es el centro de operaciones de los Radiantes renacidos y un símbolo de unidad.
- **Características:** Sus enormes torres, habitaciones infinitas y sistemas avanzados de transporte lo convierten en un misterio arquitectónico.
#### **2. Las Llanuras Quebradas:**
- **Descripción:** Una vasta región formada por enormes mesetas separadas por profundas grietas.
- **Importancia:** El campo de batalla donde se desarrollan los enfrentamientos entre humanos y parshendi.
- **Características:** Las Llanuras están llenas de gemas cultivables y son un lugar clave para obtener gemas tormentosas.
#### **3. Kholinar:**
- **Descripción:** La capital de Alethkar, gobernada por la casa Kholin.
- **Importancia:** Un centro político y cultural que refleja las tensiones internas del reino.
- **Características:** Su Gran Salón y los Templos del Culto a las Tormentas destacan por su belleza arquitectónica.
#### **4. Narak:**
- **Descripción:** Una antigua ciudad parshendi descubierta durante los eventos del primer libro.
- **Importancia:** Sirve como uno de los primeros puntos de contacto entre humanos y parshendi.
- **Características:** Sus ruinas están llenas de secretos sobre la historia de Roshar.
#### **5. Shattered Plains (Plataformas Quebradas):**
- **Descripción:** Un terreno árido con tormentas y grietas profundas.
- **Importancia:** Principal escenario de la guerra entre los alethi y los parshendi.
- **Características:** Se utilizan puentes móviles para atravesar las grietas.
#### **6. El Oathgate (Portal de Juramentos):**
- **Descripción:** Un sistema de teletransportación mágico que conecta Urithiru con otras partes de Roshar.
- **Importancia:** Un medio crucial para movilizar tropas y explorar regiones remotas.
- **Características:** Activado por los Caballeros Radiantes, simboliza la tecnología mágica avanzada de los Radiantes originales.
#### **7. Shadesmar:**
- **Descripción:** El Reino Cognitivo, una dimensión paralela que refleja el mundo físico.
- **Importancia:** Permite el transporte y la conexión con los spren y las esquirlas.
- **Características:** Su geografía única está formada por mares de cuentas negras y enormes estructuras de spren.
'
WHERE titulo = 'Lugares imprescindibles de Roshar';

UPDATE guias
SET contenido = '
El **Cosmere**, creado por Brandon Sanderson, es un universo interconectado donde cada libro aporta nuevas capas a su rica historia. A continuación, se presenta una guía para leer las obras de Sanderson en un orden que maximice la comprensión de la narrativa global.
#### **1. Elantris:**
- **Descripción:** Este libro se sitúa en Sel y es la puerta de entrada al Cosmere.
- **Importancia:** Introduce conceptos fundamentales como las Aones y el Dor.
- **Recomendación:** Leer primero para entender los fundamentos mágicos y políticos de Sel.
#### **2. Nacidos de la Bruma (Era 1):**
- **Libros:**
  - **El Imperio Final**
  - **El Pozo de la Ascensión**
  - **El Héroe de las Eras**
- **Descripción:** Una trilogía ambientada en Scadrial, donde el sistema mágico de la Alomancia juega un papel central.
- **Importancia:** Presenta a Kelsier y otros personajes clave en el Cosmere.
- **Recomendación:** Leer después de *Elantris* para explorar sistemas mágicos más complejos.
#### **3. El Aliento de los Dioses (Warbreaker):**
- **Descripción:** Ambientado en Nalthis, este libro se centra en la BioCromática y el uso del Aliento.
- **Importancia:** Presenta a Vasher y Nightblood, personajes relevantes en otras historias del Cosmere.
- **Recomendación:** Leer antes de *El Archivo de las Tormentas* para una mejor comprensión de ciertos elementos.
#### **4. El Archivo de las Tormentas (hasta el momento):**
- **Libros:**
  - **El Camino de los Reyes**
  - **Palabras Radiantes**
  - **Juramentada**
  - **El Ritmo de la Guerra**
- **Descripción:** Una saga épica situada en Roshar, que se centra en los Caballeros Radiantes y sus juramentos.
- **Importancia:** Profundiza en la conexión entre las Esquirlas y el Cosmere.
- **Recomendación:** Leer después de los libros anteriores para entender las conexiones interplanetarias.
#### **5. Nacidos de la Bruma (Era 2):**
- **Libros:**
  - **Aleación de Ley**
  - **Sombras de Identidad**
  - **Brazales de Duelo**
  - **El Metal Perdido**
- **Descripción:** Una secuela de la Era 1, con un tono más moderno y detectivesco.
- **Importancia:** Explora la evolución de Scadrial y nuevas dinámicas mágicas.
- **Recomendación:** Leer tras *El Archivo de las Tormentas* para apreciar mejor los guiños al Cosmere.
#### **6. Arena Blanca (White Sand):**
- **Descripción:** Una novela gráfica ambientada en Taldain, que explora un sistema mágico basado en la manipulación de arena.
- **Importancia:** Amplía la comprensión de Taldain, aunque su conexión directa con el Cosmere es más sutil.
- **Recomendación:** Leer al final o intercalarla entre otros libros según preferencia.
#### **7. Otras obras destacadas:**
- **Yumi y el pintor de pesadillas**
- **Trenza del Mar Esmeralda**
- **Tesoros ocultos:** Relatos y novelas cortas del Cosmere que amplían historias específicas.
'
WHERE titulo = 'Orden de lectura del Cosmere';

UPDATE guias
SET contenido = '
**La BioCromática** es un sistema mágico central en el mundo de **Nalthis**, uno de los planetas del Cosmere. Este sistema se basa en el uso del **Aliento**, una forma de energía mágica que todos los habitantes de Nalthis poseen al nacer. El Aliento no solo influye en la vida y las emociones, sino que también puede utilizarse para realizar actos mágicos sorprendentes, como dar vida a objetos inertes. A continuación, se detalla cómo funciona este sistema y sus implicaciones.
#### **1. ¿Qué es el Aliento?**
- **Definición:** El Aliento es una parte esencial del alma de cada persona en Nalthis. Es invisible pero detectado a través de su impacto en el mundo mágico.
- **Transferencia:** Una persona puede transferir su Aliento a otra, aumentando la cantidad de magia que esta puede ejercer.
- **Escala de poder:** Mientras más Alientos posea una persona, más habilidades podrá desbloquear.
#### **2. Niveles de BioCromática:**
Cada cantidad de Alientos acumulados desbloquea un nivel superior de percepción y poder:
- **Primer Hito (50 Alientos):** La percepción de colores se intensifica. Los usuarios comienzan a notar diferencias mínimas en tonos y matices.
- **Despertador Verdadero (cerca de 1,000 Alientos):** Los Despertadores tienen un control avanzado sobre la BioCromática, pudiendo animar objetos con comandos complejos.
#### **3. Tipos de Aliento y su uso:**
- **Aliento Base:** Es el que todas las personas poseen al nacer.
- **Aliento Transferido:** Permite a los usuarios acumular poder mágico de otros.
- **Aliento Consagrado:** Utilizado para Despertar objetos, imbuéndolos con energía mágica temporal.
#### **4. Despertar:**
El **Despertar** es el acto de infundir objetos inanimados con Aliento para que realicen tareas específicas.
- **Comandos Verbales:** Los Despertadores usan frases específicas para dirigir la magia.
- **Requisitos:** Los objetos deben tener colores vivos para ser efectivos en el Despertar.
- **Ejemplo:** Un trozo de tela puede animarse para atar a un enemigo.
#### **5. Objetos destacados de la BioCromática:**
- **Nightblood:** Una espada viviente creada mediante un Despertar avanzado. Posee una consciencia limitada y un poder destructivo inmenso.
- **Ropas animadas:** Los Despertadores suelen dar vida a tejidos para usarlos en combates o tareas domésticas.
#### **6. Impacto cultural y ético:**
El Aliento tiene un profundo significado cultural en Nalthis. Mientras que algunos lo ven como una herramienta mágica, otros consideran que su transferencia plantea dilemas éticos.
- **Economía del Aliento:** Las personas en situaciones de pobreza a menudo venden su único Aliento, sacrificando su percepción mágica y emocional.
- **Religión:** Las creencias en torno al Aliento están ligadas a la idea de la divinidad y la reencarnación.
'
WHERE titulo = 'La BioCromática y el Aliento';
