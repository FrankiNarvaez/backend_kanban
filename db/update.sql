
--Mover sección a la izquierda

UPDATE section SET index_section = (SELECT index_section FROM section WHERE section_id = 2) WHERE section_id = 4; -- Se cambia el index de la sección 4 al index de la sección 2

UPDATE section SET index_section = index_section+1  WHERE index_section >=(SELECT index_section FROM section WHERE section_id =2) AND section_id != 4 -- Se incrementa el index de las secciones
-- que estén a la derecha de la sección 2 expetuando la sección 4


--Mover sección a la derecha

UPDATE section SET index_section = (SELECT index_section FROM section WHERE section_id = 2) WHERE section_id = 4; -- Se cambia el index_section de la sección 4 al index_section de la sección 2

UPDATE section SET index_section = index_section-1  WHERE index_section <=(SELECT index_section FROM section WHERE section_id =2) AND section_id != 4 -- Se decrementa el index_section de las secciones