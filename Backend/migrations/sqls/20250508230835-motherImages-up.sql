/* Replace with your SQL commands */
ALTER TABLE motherImages DROP CONSTRAINT IF EXISTS fk_mother;
ALTER TABLE motherImages
ALTER COLUMN mother_id TYPE VARCHAR(12);
ALTER TABLE motherImages
ADD CONSTRAINT fk_mother
FOREIGN KEY (mother_id)
REFERENCES mother_info(mother_mrn)
ON DELETE SET NULL
ON UPDATE CASCADE;

ALTER TABLE motherImages
ADD COLUMN category VARCHAR(50);
