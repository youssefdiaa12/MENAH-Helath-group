/* Replace with your SQL commands */

create table bottle(
    id serial primary key,
    order integer,
    date_of_expression date,
    date_of_delivery date,
    volume NUMERIC(10, 2) NOT NULL,
    mother_id integer,
    CONSTRAINT fk_mother
        FOREIGN KEY (mother_id)
        REFERENCES users(id) 
        ON DELETE SET NULL 
        ON UPDATE CASCADE 
);