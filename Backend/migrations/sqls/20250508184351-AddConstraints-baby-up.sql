/* Replace with your SQL commands */

ALTER TABLE baby DROP CONSTRAINT IF EXISTS fk_mother;
ALTER TABLE baby
ALTER COLUMN mother_id TYPE VARCHAR(12);
ALTER TABLE baby
ADD CONSTRAINT fk_mother
FOREIGN KEY (mother_id)
REFERENCES mother_info(mother_mrn)
ON DELETE SET NULL
ON UPDATE CASCADE;