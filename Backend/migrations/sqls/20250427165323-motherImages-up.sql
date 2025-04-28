
/* Replace with your SQL commands */
create table motherImages(
    id serial primary key,
    url varchar(255),
    mother_id integer,
    CONSTRAINT fk_mother
        FOREIGN KEY (mother_id)
        REFERENCES users(id) 
        ON DELETE SET NULL 
        ON UPDATE CASCADE 
);