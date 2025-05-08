/* Replace with your SQL commands */
ALTER TABLE bottle DROP CONSTRAINT IF EXISTS fk_mother;
ALTER TABLE bottle
ALTER COLUMN mother_id TYPE VARCHAR(12);
ALTER TABLE bottle
ADD CONSTRAINT fk_mother
FOREIGN KEY (mother_id)
REFERENCES mother_info(mother_mrn)
ON DELETE SET NULL
ON UPDATE CASCADE;