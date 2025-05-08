/* Replace with your SQL commands */
CREATE TABLE mother_info (
    mother_mrn VARCHAR(12) PRIMARY KEY,
    mother_name_en VARCHAR(255),
    mother_name_ar VARCHAR(255),
    mother_age INT,
    gravida INT,
    para INT,
    abortion INT,
    date_of_delivery DATE,
    type_of_delivery VARCHAR(100),
    user_id integer,
    CONSTRAINT fk_user_id
        FOREIGN KEY (user_id)
        REFERENCES users(id) 
        ON DELETE SET NULL 
        ON UPDATE CASCADE 
);
